import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
   
    constructor(private _userService:UserServiceService){ }

  userList!:User[];
  loading=true;


  ngOnInit():void{

        this.localGetAllUsers();

  }

  localGetAllUsers(){

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
        this.loading=false;          
      },1000);

  }

  async deleteUser(userId:number ){
    if(confirm("confirm that you want to delete User "+userId)){
   await this._userService.deleteUser(userId).subscribe(
    (result)=>{
        console.log("user deleted "+result);
        
    },
    (error)=>{
         console.log("Error : "+error)
    }
   )
   await this.localGetAllUsers();
  }
   
  }






}
