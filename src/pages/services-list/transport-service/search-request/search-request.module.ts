import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchRequestPage } from './search-request';

@NgModule({
  declarations: [
    SearchRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchRequestPage),
  ],
})
export class SearchRequestPageModule {}
