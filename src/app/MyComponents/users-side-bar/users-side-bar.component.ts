import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users-side-bar',
  templateUrl: './users-side-bar.component.html',
  styleUrl: './users-side-bar.component.scss'
})

export class UsersSideBarComponent implements OnInit{

  constructor(private _userService:UserService, private dialog:MatDialog ){}

  userList :User[]=[];
  loading:boolean=true;
  addUserForm!:FormGroup;
  
  async ngOnInit(): Promise<void> {
     await  this.getAllUserList();
     this._userService.notify$.subscribe(() => {
        this.userList=[];
        this.getAllUserList(); 
    });
  }

  getAllUserList(){
      this.userList=[];
      setTimeout(()=>{
             this.userList=[];
             this._userService.getAllUserList().subscribe(
              (data: User[]) => {
              
                for(let user of data){
                  this.userList.push(user);
                } 
                this.loading=false;
              },
            (error) => {
               console.error('Error fetching users:', error);
               this.loading=false;
            });
      },100);
   }

   openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
