import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Treino } from '../../models/treino';

import { firebaseDatabase } from '../../app/app.firebase.config'

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { TreinoPage } from '../treino/treino';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the CadastroTreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro-treino',
  templateUrl: 'cadastro-treino.html',
})
export class CadastroTreinoPage {
  treino = {} as Treino;
  user = {} as User;
  costas: boolean;
  peito: boolean;
  triceps: boolean;
  pernas: boolean;
  abdomen: boolean;
  resultado: string;
  url_api: string = "treinos/";
  uid: string;
  update:boolean = false;
  botao:string = "Criar";

  constructor(private afauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.afauth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
      }
    });

    if(this.navParams.get("operacao") == 'update'){
      this.botao = "Editar";
      this.update = true;
      this.treino.nome = this.navParams.get("nome");
      this.treino.descricao = this.navParams.get("descricao");
      this.treino.likes = this.navParams.get("likes");
      this.treino.explicacao = this.navParams.get("explicacao");
      this.treino.categorias = this.navParams.get("categorias");
      this.treino.key = this.navParams.get("key");
      let cat = this.treino.categorias.substr(0, (this.treino.categorias.length - 2));
      this.treino.categorias = cat;
    }
  }

  verificaPressionados() {
    this.resultado = "";
    if (this.costas == true) {
      this.resultado = this.resultado + "Costas, ";
    }
    if (this.peito == true) {
      this.resultado = this.resultado + "Peito, ";
    }
    if (this.triceps == true) {
      this.resultado = this.resultado + "Triceps, ";
    }
    if (this.pernas == true) {
      this.resultado = this.resultado + "Pernas, ";
    }
    if (this.abdomen == true) {
      this.resultado = this.resultado + "Abdomen, ";
    }
  }

  criaTreino(): null {
    if(this.update){
      firebaseDatabase.ref(this.url_api+this.treino.key).remove();
    }

    if (this.treino.nome == null) {
      this.toastCtrl.create({
        message: 'Por favor preencher campo nome!',
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
    if (this.treino.descricao == null) {
      this.toastCtrl.create({
        message: 'Por favor preencher campo descrição!',
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }
    if (this.treino.explicacao == null) {
      this.toastCtrl.create({
        message: 'Por favor preencher campo descrição!',
        duration: 2000,
        position: 'top'
      }).present();
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });
    loading.present();
    this.verificaPressionados();
    let body = {
      nome_treino: this.treino.nome,
      descricao: this.treino.descricao,
      likes: 0,
      categorias: this.resultado,
      explicacao: this.treino.explicacao,
      criador: this.uid,
      key: ''
    }
    var promise = firebaseDatabase.ref(this.url_api).push(body);

    firebaseDatabase.ref(this.url_api+promise.key).update({key:promise.key});

    loading.dismiss();
    let toast;

    if(this.update){
      toast = this.toastCtrl.create({
        message: 'Treino editado!',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        this.navCtrl.popToRoot();
      });
    }else{
      toast = this.toastCtrl.create({
        message: 'Treino criado!',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        this.navCtrl.pop();
      });
    }
    

    toast.present();
  }
}
