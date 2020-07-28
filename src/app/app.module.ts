import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
// import { MediaCapture/*, MediaFile, CaptureError, CaptureImageOptions*/ } from '@ionic-native/media-capture';
// import { Media } from '@ionic-native/media';
// import { VideoPlayer } from '@ionic-native/video-player';

import { Tars } from './app.component';
import { HomePage } from '../pages/home/home';
import { ViewAccidentsPage } from '../pages/view-accidents/view-accidents';
import { ReportAccidentPage } from '../pages/report-accident/report-accident';
import { AccidentProvider } from '../providers/accident/accident';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastProvider } from '../providers/toast/toast';
import { AccidentPage } from '../pages/accident/accident';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../providers/auth/auth';
import { ApiProvider } from '../providers/api/api';
import { LoginPage } from '../pages/login/login';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { VideoPlayer } from '@ionic-native/video-player';
import { InvolvedVehiclePage } from '../pages/involved-vehicle/involved-vehicle';
import { AddVehiclePage } from '../pages/add-vehicle/add-vehicle';
import { AddPersonPage } from '../pages/add-person/add-person';
import { AddPedestrianPage } from '../pages/add-pedestrian/add-pedestrian';

@NgModule({
  declarations: [
    Tars,
    LoginPage,
    HomePage,
    ReportAccidentPage,
    ViewAccidentsPage,
    AccidentPage,
    AddVehiclePage,
    AddPedestrianPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(Tars),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Tars,
    LoginPage,
    HomePage,
    ReportAccidentPage,
    ViewAccidentsPage,
    AccidentPage,
    AddVehiclePage,
    AddPedestrianPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastProvider,
    NetworkProvider,
    Camera,
    MediaCapture,
    // Media,
    Network,
    VideoPlayer,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    ApiProvider,
    AccidentProvider,
  ]
})
export class AppModule { }
