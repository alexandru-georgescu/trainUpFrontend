import { User } from './user';

export class Course {
    id : number;
    courseName : string;
    capacity : number;
    actualCapacity : number;
    startDate : Date;
    endDate : Date;
    projectManager : string;

constructor (courseName : string,
    capacity : number,
    startDate : Date,
    endDate : Date,
    projectManager : string) {
        this.courseName = courseName;
        this.capacity = capacity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.projectManager = projectManager;
    }
}
