import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularesPage } from './populares';

@NgModule({
  declarations: [
    PopularesPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularesPage),
  ],
})
export class PopularesPageModule {}
