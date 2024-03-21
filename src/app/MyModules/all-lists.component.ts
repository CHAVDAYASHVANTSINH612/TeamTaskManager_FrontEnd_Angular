import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from '../models/tasks';
import { Subscription, pipe, switchMap } from 'rxjs';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrl: './all-lists.component.scss'
})

export class AllListsComponent  {


  constructor(private _userService:UserServiceService,private route: ActivatedRoute){}
  id!: number;  
  private routeSub!: Subscription;

  addTaskForm!: FormGroup; 
  allTaskList : Tasks[]=[] ; 
  ToDoTaskList: Tasks[]=[];
  InProgressTaskList: Tasks[]=[];
  DoneTaskList: Tasks[]=[];

  loading:boolean=true;
  user!:User;

   async ngOnInit():Promise<void>{
      
      //console.log( this.route.snapshot.params['id']);

     this.routeSub = await this.route.params.subscribe( async params => {

            this.id = parseInt(params['id']);
          
            await this.localGetUserWithTask();

            if(this.addTaskForm!==undefined){
              this.addTaskForm.reset();
            }

            this.addTaskForm = new FormGroup({

              task_title: new FormControl(null,[Validators.required]),
             task_content: new FormControl(null),
             task_status_id: new FormControl(1,[Validators.required]),
             task_user_id: new FormControl(this.id,[Validators.required]),
             task_status: new FormControl(""),
      
             });
       });  
       
       this.addTaskForm = new FormGroup({

        task_title: new FormControl(null,[Validators.required]),
       task_content: new FormControl(null),
       task_status_id: new FormControl(1,[Validators.required]),
       task_user_id: new FormControl(this.id,[Validators.required]),
       task_status: new FormControl(""),

       });
       
   
    }

    ngOnDestroy(): void {
      this.routeSub.unsubscribe();
    }

   async submitAddTaskForm(){

       console.log(this.addTaskForm.value);
       
     await this._userService.addTask(this.addTaskForm.value).subscribe(
        () => {
          console.log('added task:');
         
        },
        (error) => {
          console.error('Error adding task:', error);
         
        }
      )

     // this._userService.notifyAdded();
     await this.localGetUserWithTask();

    }


    async localGetUserWithTask(){

      setTimeout(async ()=>{
                this.allTaskList=[];
                this.ToDoTaskList=[];
                this.InProgressTaskList=[];
                this.DoneTaskList=[];
      (await this._userService.getUserWithTasks(this.id)).subscribe( (data:User)=>{
        try{
         
       for(let task of data.tasksList ){
         this.allTaskList.push(task);
         if(task.task_status_id===1){
           this.ToDoTaskList.push(task);
         }
         else if(task.task_status_id==2){
          this.InProgressTaskList.push(task);
        }
        else if(task.task_status_id==3){
          this.DoneTaskList.push(task);
        }
      }
      this.user=data; 
      this.loading=false;  
       
      console.log(this.user);

      
     } 
     catch (error) 
      {
            console.error('Error fetching user tasks:', error);
            this.loading=false;
      }
    });

 

  },1000);

    }

    deleteTask(taskId:number){

      this._userService.deleteTask(taskId).subscribe(
        (result)=>{console.log("user deleteed : "+result)},
        (error)=>{console.log("Error deleting User : "+error)}
      )
      
      this.localGetUserWithTask();
    }


    localUpdateTaskStatus(taskId:number,updatedStatusId:number){
         this._userService.updateTaskStatus(taskId,updatedStatusId).subscribe(
          (result)=>{console.log("task updated: "+result)},
          (error)=>{console.log("Eroor while updating task : "+error)}
         );
         this.localGetUserWithTask();
    }
  
}
