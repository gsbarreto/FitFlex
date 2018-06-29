import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { firebaseDatabase } from '../../app/app.firebase.config';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the AlterarFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alterar-foto',
  templateUrl: 'alterar-foto.html',
})
export class AlterarFotoPage {
  uid:string;
  user = {} as User;
  url_api = '/users';

  constructor(private camera:Camera,private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.uid = this.navParams.get("uid");
    
    firebaseDatabase.ref(this.url_api+this.uid).once('value').then((res) => {
      this.user = res.val();
    });

    
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

      this.navCtrl.pop();

  }
}
