import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';


const routes: Routes = [
  { path: 'user', component: UserPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: '**', component : NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
