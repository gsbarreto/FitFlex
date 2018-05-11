import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroTreinoPage } from './cadastro-treino';

@NgModule({
  declarations: [
    CadastroTreinoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroTreinoPage),
  ],
})
export class CadastroTreinoPageModule {}
