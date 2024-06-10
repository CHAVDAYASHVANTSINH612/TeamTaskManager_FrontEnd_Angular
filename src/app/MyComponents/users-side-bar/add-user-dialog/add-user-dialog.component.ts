import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {

  addUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _userService:UserService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addUserForm = this.formBuilder.group({
      name: [null, Validators.required],
      userTypeId: [null, Validators.required]
    });
  }
  async onSubmit(): Promise<void> {
    if (this.addUserForm.valid) {
      console.log(this.addUserForm.value);
      
      
      await this._userService.addUser(this.addUserForm.value).subscribe(
        () => {
          console.log('added User:');
        },
        (error) => {
          console.error('Error adding User:', error.error);
          console.error(error.error);
        }
      );
      this.dialogRef.close(this.addUserForm.value);
    }
    this.dialogRef.close(this.addUserForm.value);
  }
  
}
