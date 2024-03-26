import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserDialogComponent } from '../../MyComponents/users-side-bar/add-user-dialog/add-user-dialog.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  addTaskForm:FormGroup;

  constructor(private formBuilder: FormBuilder,
      private _userService:UserService,
      public dialogRef: MatDialogRef<AddTaskDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any)
      {  console.log(data);
      
        this.addTaskForm = this.formBuilder.group({
          task_title: [null, Validators.required],
          task_content: [null],
          task_user_id: [this.data.user_id]
        });
      }

      async addTaskSubmit(){
        console.log(this.addTaskForm.value);
        
        if(this.addTaskForm.valid){
             await this._userService.addTask(this.addTaskForm.value).subscribe(
                  (result)=>{ console.log("task added");}
              )
        }
        this.dialogRef.close(this.addTaskForm.value);

      }



}
