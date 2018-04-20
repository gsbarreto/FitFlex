import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  mensagem_erro: string;
  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
  }

  async login(user: User){
    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      if(result){
        this.navCtrl.push(TabsPage);
      }
    }catch(e){
      console.log(e.code);
      switch(e.code){
        case 'auth/argument-error':{
          this.toastCreate('Por favor preencha os campos email e senha.');
          break;
        }
        case 'auth/wrong-password':{
          this.toastCreate('Email ou senha incorreta.');
          break;
        }
        //Não está funcionando, não entra no switch. Provavelmente não está no catch certo;
        case 'auth/invalid-email':{
          console.log('entrou');
          this.toastCreate('O campo email não está preenchido corretamente.');
          break;
        }
        default:{
          this.toastCreate('Ocorreu um erro por favor contate um administrador.');
          break;
        }
      }
      
      
    }
  }

  toastCreate(mensagem: string){
    this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    }).present();
  }

  registrar(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  

}
