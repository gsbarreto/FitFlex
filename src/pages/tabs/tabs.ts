import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';


import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { firebaseDatabase } from '../../app/app.firebase.config';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  user = {} as User; 
  url_api = 'users/';


  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = PerfilPage;

  constructor(private afAuth:AngularFireAuth, private toastCtrl: ToastController) {   
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        firebaseDatabase.ref(this.url_api+data.uid).once('value').then(
          (res) => {
            this.user = res.val();
            console.log(this.user);
          }
        );

        this.toastCtrl.create({
          message: 'Bem vindo ' + this.user.firstName + ' ' + this.user.lastName + '!',
          duration: 3000,
          position: 'top'
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
