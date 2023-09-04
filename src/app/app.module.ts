import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule} from "@angular/forms"
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {MatRadioModule} from '@angular/material/radio';


import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import { CommonModule } from '@angular/common';



const routers: Routes = [
  {path: 'users', component: ListUserComponent},
  {path: 'adduser', component: AddUserComponent},
  {path: 'edituser/:id', component: AddUserComponent},
  {path: '', redirectTo: '/users', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    RouterModule.forRoot(routers)
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {}
