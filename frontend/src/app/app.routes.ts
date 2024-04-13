import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PeopleMenuComponent } from './people-menu/people-menu.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRegisterComponent } from './people-register/people-register.component';
import { NgModule } from '@angular/core';
import { PeopleEditComponent } from './people-edit/people-edit.component';
import { PeopleDeleteComponent } from './people-delete/people-delete.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: PeopleMenuComponent },
  { path: 'listar', component: PeopleListComponent },
  { path: 'cadastrar', component: PeopleRegisterComponent },
  { path: 'editar', component: PeopleEditComponent },
  { path: 'apagar', component: PeopleDeleteComponent},
  // { path: 'apagar', component: ApagarComponent },
  // { path: 'apagar-endereco', component: ApagarEnderecoComponent },
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
