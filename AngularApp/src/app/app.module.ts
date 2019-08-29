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
import { AuthGuard } from './auth.guard';
import { TmPageComponent } from './pages/tm-page/tm-page.component';
import { MatExpansionModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatTableModule, MatSortModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ModalComponent } from './pages/tm-page/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    UserPageComponent,
    TmPageComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatPaginatorModule, 
    MatTableModule, 
    MatSortModule
  ],
  providers: [AuthGuard, UserService, LoginPageComponent],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
