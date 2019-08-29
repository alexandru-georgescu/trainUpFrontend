import { Course } from './course';

export class User {
    id : number;
    email: string;
    type: string;
    password : string;
    firstName: string;
    lastName: string;
    courses: Course[];

    constructor (email : string,
        type : string,
        firstName : string,
        lastName : string,
        password : string) {
            this.email = email;
            this.type = type;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
        }

}

