import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { PerfilPage } from '../perfil/perfil';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { firebaseDatabase } from '../../app/app.firebase.config';
import { PopularesPage } from '../populares/populares';
import { BuscaPage } from '../busca/busca';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  user = {} as User; 
  profileData: Observable<any>;
  url_api = 'users/';


  tab1Root = PopularesPage;
  tab2Root = BuscaPage;
  tab3Root = PerfilPage;

  constructor(private afAuth:AngularFireAuth, private afDatabase:AngularFireDatabase, private toastCtrl: ToastController) {   
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        firebaseDatabase.ref(this.url_api+data.uid).once('value').then(
          (res) => {
            this.user = res.val();
            this.criaToast('Bem vindo ' + this.user.firstName + ' ' + this.user.lastName + '!');
          }
        );
      }else{
        this.toastCtrl.create({
          message: `Não encontramos informações de login!`,
          duration: 3000
        }).present();
        this.profileData = afDatabase.object(`users/${data.uid}`).valueChanges();
      }
    });
  }

  criaToast(msg:string){
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    }).present();
  }
}

