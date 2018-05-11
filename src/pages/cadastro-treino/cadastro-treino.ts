import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Treino } from '../../models/treino';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroTreinoPage');
  }

}
