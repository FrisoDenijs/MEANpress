import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { ErrorComponent } from './error/error.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    PublicModule,
    AdminModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
