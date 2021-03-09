import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ComplainsComponent } from './complains/complains.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditPhoneAddressComponent } from './phone-address/edit-phone-address/edit-phone-address.component';
import { PhoneAddressComponent } from './phone-address/phone-address.component';
import { ViewComplainComponent } from './view-complain/view-complain.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'complains', component: ComplainsComponent },
  { path: 'view-complain', component: ViewComplainComponent },
  { path: 'phone-address', component: PhoneAddressComponent },
  { path: 'edit-phone-address', component: EditPhoneAddressComponent },

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
