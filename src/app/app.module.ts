import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Providers
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { SpinnerServiceProvider } from '../providers/spinner-service/spinner-service';
import { ToasterServiceProvider } from '../providers/toaster-service/toaster-service';
import { AuthHttpProvider } from '../providers/auth-http/auth-http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeServiceProvider,
    SpinnerServiceProvider,
    ToasterServiceProvider,
    AuthHttpProvider
    
  ]
})
export class AppModule {}
