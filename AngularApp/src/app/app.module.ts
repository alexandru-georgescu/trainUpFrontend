import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { UserService } from './services/user-service.service';
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ShareServiceService } from './services/share-service.service';




@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, ShareServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
