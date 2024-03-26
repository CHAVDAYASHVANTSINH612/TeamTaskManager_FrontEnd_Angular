import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllListsComponent } from './all-lists.component';
import { FormGroup, FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: AllListsComponent,
  }
];

@NgModule({
  declarations: [
     AllListsComponent,
     AddTaskDialogComponent
     
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogActions
  ]
})
export class TaskListsModule { }
