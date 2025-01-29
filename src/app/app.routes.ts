import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DressComponent} from './dress/dress.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {LoginComponent} from './login/login.component';
import {AddDressComponent} from './add-dress/add-dress.component';
import {UserComponent} from './user/user.component';
import {ModifyComponent} from './modify/modify.component';

export const routes: Routes = [
  {path :'home', component :HomeComponent},
  {path: 'addDress', component: AddDressComponent},
  {path: 'dress', component: DressComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path:'login', component: LoginComponent},
  { path:'user', component:UserComponent},
  { path:'modify', component:ModifyComponent},

  //{ path:'purchase', component:PurchaseComponent}, TODO : Ajouter composant pour le panier
  {path: '', redirectTo:'home', pathMatch:'full'},
  { path:'**', component: HomeComponent}
];
