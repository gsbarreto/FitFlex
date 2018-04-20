import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private afAuth:AngularFireAuth, private toastCtrl: ToastController) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toastCtrl.create({
          message: `Bem vindo ${data.email}!`,
          duration: 3000
        }).present();
      }else{
        this.toastCtrl.create({
          message: `Não encontramos informações de login!`,
          duration: 3000
        }).present();
      }
    });
    
  }
}
