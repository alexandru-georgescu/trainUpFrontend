import { Course } from './course';

export class User {
    id : number;
    email: string;
    type: string;
    password : string;
    firstName: string;
    lastName: string;
    courses: Course[];
}
