import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map, take, tap } from 'rxjs';
import {User} from '../models/user'
import { Tasks } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {


  constructor(private http : HttpClient) {}

   public getAllUserList(): Observable<User[]> {

   return  this.http.get<User[]>('https://localhost:7282/ToDo/users')
    .pipe(

     // tap(data=> { console.log("filtered users: "+JSON.stringify(data)); }),
      catchError((err)=>{
        throw err;
      })
    );
   }

   public async getAllUserTasks(id:number): Promise<Observable<Tasks[]>> {
    
    return  this.http.get<Tasks[]>('https://localhost:7282/ToDo/tasks/'+id)
     .pipe(
       tap(data=> {   
        console.log("tasks of user "+id+" : "+JSON.stringify(data)); 
        }),
        catchError((err)=>{
         throw err;
       })
     );
 
    }


   public  async getUserWithTasks(id:number): Promise<Observable<User>> {

      return  this.http.get<User>('https://localhost:7282/ToDo/userwithtasks/'+id)
       .pipe(
         tap(data=> {   
          console.log("tasks of user "+id+" : "+JSON.stringify(data)); 
          }),
          catchError((err)=>{
           throw err;
         })
       );
   
      }

      

      public   addTask(task: any):Observable<any> {
        
        return   this.http.post('https://localhost:7282/ToDo/task/', task);
        
        }

     public addUser(user:any):Observable<any>{
        return this.http.post("https://localhost:7282/ToDo/user/",user);
     }

     public deleteTask(taskId:number):Observable<any>{
      return this.http.delete("https://localhost:7282/ToDo/task/"+taskId);
   }


   private userDeletedSubject = new Subject<void>();

   userDeleted$ = this.userDeletedSubject.asObservable();

   public deleteUser(userId:number):Observable<any>{
      let response = this.http.delete("https://localhost:7282/ToDo/user?userId="+userId);
      this.userDeletedSubject.next();
      return response;
   }


   updateTaskStatus(taskId:number,updatedTaskStatus:number){
    let response= this.http.put("https://localhost:7282/ToDo/task/"+taskId+"?updatedStatus="+updatedTaskStatus,null);
    return response;           
   }

}
