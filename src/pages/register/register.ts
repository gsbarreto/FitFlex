import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseDatabase } from '../../app/app.firebase.config';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  public url_api = "users/";

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  async register(user: User){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      let body = {
        email: this.user.email,
        password: this.user.password,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        birthDay: this.user.birthDay,
        profissao: this.user.profissao,
        weight: this.user.weight,
        height: this.user.height,
        uid: result.uid
      };
      
      firebaseDatabase.ref(this.url_api).child(result.uid).set(body).then(
        () => {
          let toast = this.toastCtrl.create({
						message: 'Cadastrado com sucesso!',
						duration: 3000,
						position: 'top'
          });
          
          toast.onDidDismiss(() => {
						this.navCtrl.pop();
          });
          
          toast.present();
        }, (err) => {
          let toast = this.toastCtrl.create({
						message: 'Erro ao cadastrar, por favor contate o suporte!',
						duration: 3000,
						position: 'top'
          });
          
          toast.onDidDismiss(() => {
						this.navCtrl.pop();
          });
          
          toast.present();
        }
      );
      
    }catch(e){
      console.error(e);
    }
  }

  cancelar(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
  }

}
