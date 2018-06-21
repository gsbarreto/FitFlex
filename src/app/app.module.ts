import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { PerfilPage } from '../pages/perfil/perfil';
import { PopularesPage } from '../pages/populares/populares';
import { BuscaPage } from '../pages/busca/busca';
import { CadastroTreinoPage } from '../pages/cadastro-treino/cadastro-treino';
import { TreinoPage } from '../pages/treino/treino';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PerfilPage,
    PopularesPage,
    BuscaPage,
    CadastroTreinoPage,
    TreinoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PerfilPage,
    PopularesPage,
    BuscaPage,
    CadastroTreinoPage,
    TreinoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
