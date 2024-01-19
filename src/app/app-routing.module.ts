import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NewContartComponent } from './new-contart/new-contart.component';
import { CoordonnesBancairesComponent } from './coordonnes-bancaires/coordonnes-bancaires.component';
import { ListContartComponent } from './list-contart/list-contart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'new_contart', component: NewContartComponent},
  { path: 'coordonnes_bancaires', component: CoordonnesBancairesComponent},
  { path: 'list_contart', component: ListContartComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
