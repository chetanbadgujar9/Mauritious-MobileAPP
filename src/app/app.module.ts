import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Modules
import { NewsDetailsPageModule } from '../pages/news-details/news-details.module';
import { EventDetailsPageModule } from '../pages/event-details/event-details.module';
import { ServicesListPageModule } from '../pages/services-list/services-list.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LandingPageModule } from '../pages/landing/landing.module';

//Providers
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { SpinnerServiceProvider } from '../providers/spinner-service/spinner-service';
import { ToasterServiceProvider } from '../providers/toaster-service/toaster-service';
import { AuthHttpProvider } from '../providers/auth-http/auth-http';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { TransportServiceProvider } from '../providers/transport-service/transport-service';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NewsDetailsPageModule,
    EventDetailsPageModule,
    ServicesListPageModule,
    LoginPageModule,
    LandingPageModule,
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
    Push,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HomeServiceProvider,
    SpinnerServiceProvider,
    ToasterServiceProvider,
    AuthHttpProvider,
    LoginServiceProvider,
    TransportServiceProvider
  ]
})
export class AppModule { }
