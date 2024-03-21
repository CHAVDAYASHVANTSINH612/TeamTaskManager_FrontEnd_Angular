import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-side-bar',
  templateUrl: './users-side-bar.component.html',
  styleUrl: './users-side-bar.component.scss'
})

export class UsersSideBarComponent implements OnInit{


  constructor(private _userService:UserServiceService ){}

  userList :User[]=[];
  loading:boolean=true;
  addUserForm!:FormGroup;
  
  async ngOnInit(): Promise<void> {

    this.addUserForm= new FormGroup({
      user_name: new FormControl(null,[Validators.required]),
      user_type_id:  new FormControl(null,[Validators.required])
    });

     await  this.getAllUserList();

     this._userService.userDeleted$.subscribe(() => {
      this.getAllUserList(); 
    });

  }

  getAllUserList(){
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
      });
    },100);
   }

  async submitAddUserForm(){

      console.log(this.addUserForm.value);

      
     await this._userService.addUser(this.addUserForm.value).subscribe(
        () => {
          console.log('added User:');
         
        },
        (error) => {
          console.error('Error adding User:', error);
          alert(error.error);
        }
      )

     await this.getAllUserList();

     await this.addUserForm.reset();
  }

}
