import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseDatabase } from '../../app/app.firebase.config';
import { Camera } from '@ionic-native/camera';
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

  constructor(private camera:Camera,private loadingCtrl:LoadingController,private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
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
        uid: result.uid,
        foto: this.user.foto
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

  capturaFoto(captura){
    let foto;

    if(captura == true){
      foto = this.camera.PictureSourceType.CAMERA;
			console.log("Foto da câmera: " + foto);
    }else{
      foto = this.camera.PictureSourceType.PHOTOLIBRARY;
			console.log("Foto da galeria: " + foto);
    }
    
    this.camera.getPicture({
			sourceType: foto,
	        destinationType: this.camera.DestinationType.DATA_URL,
	        targetWidth: 1000,
	        targetHeight: 1000
	    }).then((imageData) => {
        this.user.foto = "data:image/jpeg;base64," + imageData;
        let toast = this.toastCtrl.create({
          message: 'Foto capturada com sucesso!',
          duration: 1500,
          position: 'top'
			  }).present();
	    }, (err) => {
        this.user.foto = '';
	    	let toast = this.toastCtrl.create({
          message: 'Erro ao tentar capturar foto.',
          duration: 1500,
          position: 'top'
			  }).present();
	    console.log(err);
      });

  }

  ionViewDidLoad() {
  }

}
