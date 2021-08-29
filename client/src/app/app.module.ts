import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { GraficoModule } from './grafico/grafico.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgprimeCoreModule } from 'ngprime-core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    GraficoModule,
    NgprimeCoreModule.forRoot(environment),
    NgxSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
