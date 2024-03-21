import { Tasks } from "../models/tasks";

export class User {
    public user_id!:number;
    public user_name!:string;
    public user_type_id!:number;
    public user_type!:string;
    public tasksList!:Tasks[];
}
