import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroTreinoPage } from '../cadastro-treino/cadastro-treino';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopularesPage');
  }

  criarTreino(){
    this.navCtrl.push(CadastroTreinoPage);
  }

}
