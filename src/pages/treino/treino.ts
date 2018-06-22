import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Treino } from '../../models/treino';

import { firebaseDatabase } from '../../app/app.firebase.config';
import { CadastroTreinoPage } from '../cadastro-treino/cadastro-treino';
/**
 * Generated class for the TreinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'treino'
})
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {
  treino = {} as Treino;
  url_api:string = 'treinos/';
  cat: string;
  opeditar:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController) {
    
  }

  ionViewWillEnter(){
    this.treino.nome = this.navParams.get("nome");
    this.treino.descricao = this.navParams.get("descricao");
    this.treino.likes = this.navParams.get("likes");
    this.treino.explicacao = this.navParams.get("explicacao");
    this.treino.categorias = this.navParams.get("categorias");
    this.treino.key = this.navParams.get("key");
    if(this.navParams.get("opcao") == 'ver'){
      this.opeditar = false;
    }
    let cat = this.treino.categorias.substr(0, (this.treino.categorias.length - 2));
    this.treino.categorias = cat;
  }

  deletar(){
    firebaseDatabase.ref(this.url_api+this.treino.key).remove().then(() => {
					let toast = this.toastCtrl.create({
						message: 'Treino deletado!',
						duration: 1000,
						position: 'top'
					});
					toast.onDidDismiss(() => {
						this.navCtrl.pop();
					});
					toast.present();
    });
  }

  editar(){
    this.navCtrl.push(CadastroTreinoPage,{
      nome:this.treino.nome,
      descricao:this.treino.descricao,
      likes:this.treino.likes,
      categorias:this.treino.categorias,
      explicacao:this.treino.explicacao,
      key:this.treino.key,
      operacao:'update'
    });
  }
}
