import { Routes } from '@angular/router';
import { RegisterComponent } from './admin/register/register.component';
import { GestionUtilisateursComponent } from './admin/gestion-utilisateurs/gestion-utilisateurs.component';
import { BaseComponent } from './owl/base/base.component';
import { OwlClassComponent } from './owl/owl-class/owl-class.component';

export const routes: Routes = [
  {path:'',redirectTo:'owl',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'owl',component:BaseComponent,children:[
    {path:'',redirectTo:'class',pathMatch:'full'},
    {path:'class',component:OwlClassComponent}
  ]}
];
