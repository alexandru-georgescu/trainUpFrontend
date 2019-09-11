export class Course {
    id: number;
    courseName: string;
    capacity: number;
    actualCapacity: number;
    startDate: Date;
    endDate: Date;
    projectManager: string;
    domain: string;
    type: string;
    timeInterval: string;

    constructor(courseName: string,
        capacity: number,
        actualCapacity : number,
        startDate: Date,
        endDate: Date,
        projectManager: string,
        domain: string,
        timeInterval: string) {
        this.courseName = courseName;
        this.capacity = capacity;
        this.actualCapacity = actualCapacity;
        this.startDate = startDate;
        this.endDate = endDate;
        this.projectManager = projectManager;
        this.domain = domain;
        this.timeInterval = timeInterval;
    }
}


