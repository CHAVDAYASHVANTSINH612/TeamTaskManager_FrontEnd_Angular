import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './MyComponents/admin-dashboard/admin-dashboard.component';
import { HomeWelcomeComponent } from './MyComponents/home-welcome/home-welcome.component';
import { NotFoundPageComponent } from './MyComponents/not-found-page/not-found-page.component';

const routes: Routes = [
   {path:"admin",component: AdminDashboardComponent},
   {
    path: 'user/:id',
    loadChildren: () => import('./MyModules/task-lists.module').then((m) => m.TaskListsModule)
   },
   {path:"",component:HomeWelcomeComponent},
   {path:"**", component:NotFoundPageComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
