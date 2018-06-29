import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Treino } from '../../models/treino';
import { firebaseDatabase } from '../../app/app.firebase.config';
import { TreinoPage } from '../treino/treino';

/**
 * Generated class for the BuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {
  treinos: Array<Treino> = [];
  url_api: string = 'treinos/';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inicializaTreinos();
  }

  ionViewWillEnter(){
    this.treinos = [];
    this.inicializaTreinos();
  }

  inicializaTreinos(){
    this.treinos = [];
    var treinosDB = firebaseDatabase.ref(this.url_api);
    treinosDB.orderByChild('likes').limitToLast(5).on('child_added', data => {
      var treino = {} as Treino;
      console.log(data.val());
      treino.nome = data.val().nome_treino;
      treino.descricao = data.val().descricao;
      treino.categorias = data.val().categorias;
      treino.likes = data.val().likes;
      treino.explicacao = data.val().explicacao;
      treino.key = data.val().key;
      treino.criador = data.val().criador;
      this.treinos.push(treino);
    });
  }

  getItems(ev: any){
    this.treinos = [];
    this.inicializaTreinos();

    const val = ev.target.value;

    if(val && val.trim() != ''){
       this.treinos = this.treinos.filter((item) => {
         return(item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
       });
    }
  }

  verTreino(obj:Treino){
    this.navCtrl.push(TreinoPage,{
      nome:obj.nome,
      descricao:obj.descricao,
      likes:obj.likes,
      categorias:obj.categorias,
      explicacao:obj.explicacao,
      key:obj.key,
      opcao:'ver'
    });
  }

}
