import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroTreinoPage } from '../cadastro-treino/cadastro-treino';
import { Treino } from '../../models/treino';
import { firebaseDatabase } from '../../app/app.firebase.config';
import { User } from '../../models/user';
import { TreinoPage } from '../treino/treino';

/**
 * Generated class for the PopularesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-populares',
  templateUrl: 'populares.html',
})
export class PopularesPage {
  treinos: Array<Treino> = [];
  treinos_invertido: Array<Treino> = [];
  criadores: Array<User> = [];
  url_api: string = 'treinos/';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewWillEnter() {
    this.treinos = [];
    this.treinos_invertido = [];
    this.criadores = [];
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
    this.inverteTreinos();
  }

  inverteTreinos() {
    for (var i = (this.treinos.length - 1); i >= 0; i--) {
      this.treinos_invertido.push(this.treinos[i]);
      var userDB = firebaseDatabase.ref('users/'+this.treinos[i].criador);
      userDB.once('value', data => {
        var user = {} as User;
        console.log(data.val());
        user.firstName = data.val().firstName;
        user.lastName = data.val().lastName;
        user.profissao = data.val().profissao;
        this.criadores.push(user);
      });
    }
    console.log(this.criadores);
  }

  criarTreino() {
    this.navCtrl.push(CadastroTreinoPage);
  }

  like(treino:Treino){
    firebaseDatabase.ref(this.url_api+treino.key).update({likes:(treino.likes+1)});
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
