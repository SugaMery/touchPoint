import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NewContartComponent } from './new-contart/new-contart.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CoordonnesBancairesComponent } from './coordonnes-bancaires/coordonnes-bancaires.component';
import { ListContartComponent } from './list-contart/list-contart.component';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewContartComponent,
    CoordonnesBancairesComponent,
    ListContartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CheckboxModule,
    InputTextModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputMaskModule,
    ToastModule,
    ProgressBarModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
