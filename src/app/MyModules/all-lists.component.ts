import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnInit } from '@angular/core';
import { UserService} from '../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from '../models/tasks';
import { Subscription, pipe, switchMap } from 'rxjs';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrl: './all-lists.component.scss'
})

export class AllListsComponent  {
  constructor(private _userService:UserService,private route: ActivatedRoute,private dialog :MatDialog){}
  id!: number;  
  private routeSub!: Subscription;
  addTaskForm!: FormGroup; 
  allTaskList : Tasks[]=[] ; 
  ToDoTaskList: Tasks[]=[];
  InProgressTaskList: Tasks[]=[];
  DoneTaskList: Tasks[]=[];
  loading:boolean=true;
  user!:User;
  errorMessage:string="Error message";

   async ngOnInit():Promise<void>{

     this.routeSub = await this.route.params.subscribe( async params => {
            this.id = parseInt(params['id']);
            await this.localGetUserWithTask();
            if(this.addTaskForm!==undefined){
              this.addTaskForm.reset();
            }
       });  

       this._userService.notify$.subscribe(
        ()=>{
          this.allTaskList=[];
          this.ToDoTaskList=[];
          this.InProgressTaskList=[];
          this.DoneTaskList=[];
          this.localGetUserWithTask();
         } );
    }

    ngOnDestroy(): void {
      this.routeSub.unsubscribe();
    }


    async openAddTaskDialog(){
      const dialogRef = this.dialog.open(AddTaskDialogComponent, {
        width: '600px',
        data: { id:this.user.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }

    async localGetUserWithTask(){
      setTimeout(async ()=>{
                this.allTaskList=[];
                this.ToDoTaskList=[];
                this.InProgressTaskList=[];
                this.DoneTaskList=[];
      (await this._userService.getUserWithTasks(this.id)).subscribe( 
        (data:User)=>{
         try{
         console.log(" data.taskList :  "+data.taskList[0]?.title);
              for(let task of data.taskList ){
                       this.allTaskList.push(task);
                       if(task.taskStatusId==1){
                          this.ToDoTaskList.push(task);
                       }
                       else if(task.taskStatusId==2){
                          this.InProgressTaskList.push(task);
                       }
                       else if(task.taskStatusId==3){
                            this.DoneTaskList.push(task);
                       }
              }
          this.user=data; 
          this.loading=false;  
          console.log(this.allTaskList);
        } 
        catch (error) 
         {
            console.error('Error fetching user tasks:', error);
            this.loading=false;
         }
    },
    (error)=>{
      // alert(error.error);
       console.error(error);
      this.loading=false;
      this.errorMessage=error.errorMessage;
    }
    );
  },100);
 }

    deleteTask(taskId:number){
      this._userService.deleteTask(taskId).subscribe(
        (result)=>{console.log("user deleteed : "+result)},
        (error)=>{console.log("Error deleting User : "+error);
                   this.errorMessage=error.error;
                  }
      )
      // this.localGetUserWithTask();
    }

    localUpdateTaskStatus(taskId:number,updatedStatusId:number){
         this._userService.updateTaskStatus(taskId,updatedStatusId).subscribe(
          (result)=>{console.log("task updated: "+result)},
          (error)=>{console.log("Eroor while updating task : "+error)
                     this.errorMessage=error.error;
                    }
         );
         this.localGetUserWithTask();
    }
  
}
