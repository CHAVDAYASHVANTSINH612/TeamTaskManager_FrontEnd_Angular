import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersSideBarComponent } from './MyComponents/users-side-bar/users-side-bar.component';
import { NavBarMainComponent } from './MyComponents/nav-bar-main/nav-bar-main.component';

import { UserService } from './Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './MyComponents/admin-dashboard/admin-dashboard.component';
import { HomeWelcomeComponent } from './MyComponents/home-welcome/home-welcome.component';
import { NotFoundPageComponent } from './MyComponents/not-found-page/not-found-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TaskListsModule } from './MyModules/task-lists.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for animations
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    UsersSideBarComponent,
    NavBarMainComponent,
    AdminDashboardComponent,
    HomeWelcomeComponent,
    NotFoundPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     FormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     ReactiveFormsModule,
     TaskListsModule,
     MatFormFieldModule,
     BrowserAnimationsModule,
     MatSelectModule,
    
  ],
  providers: [UserService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
