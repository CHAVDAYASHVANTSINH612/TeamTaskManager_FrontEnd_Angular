import { Tasks } from "../models/tasks";

export class User {
    public id!:number;
    public name!:string;
    public userTypeId!:number;
    public userType!:string;
    public taskList!:Tasks[];
}
