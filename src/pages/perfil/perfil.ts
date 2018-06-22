import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { firebaseDatabase } from '../../app/app.firebase.config';
import { User } from '../../models/user';
import { Treino } from '../../models/treino';
import { TreinoPage } from '../treino/treino';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user = {} as User;
  imc:number;
  url_api:string = 'treinos/';
  treinos: Array<Treino> = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter(){
    this.treinos = [];
    this.user = this.navParams.data;
    
    var treinosDB = firebaseDatabase.ref(this.url_api);
    treinosDB.orderByChild("criador").equalTo(this.user.uid).on('child_added',data => {
      var treino = {} as Treino;
      console.log(data.val());
      treino.nome = data.val().nome_treino;
      treino.descricao = data.val().descricao;
      treino.categorias = data.val().categorias;
      treino.likes = data.val().likes;
      treino.explicacao = data.val().explicacao;
      treino.key = data.val().key;
      this.treinos.push(treino);
    });
  }

  verTreino(obj:Treino){
    this.navCtrl.push(TreinoPage,{
      nome:obj.nome,
      descricao:obj.descricao,
      likes:obj.likes,
      categorias:obj.categorias,
      explicacao:obj.explicacao,
      key:obj.key
    });
  }
}
