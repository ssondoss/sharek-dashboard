import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComplainsComponent } from './complains/complains.component';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ViewComplainComponent } from './view-complain/view-complain.component';
import { PhoneAddressComponent } from './phone-address/phone-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { EditPhoneAddressComponent } from './phone-address/edit-phone-address/edit-phone-address.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ComplainsComponent,
    ViewComplainComponent,
    PhoneAddressComponent,
    LoginComponent,
    EditPhoneAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
