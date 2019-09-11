import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  private acceptedSource = new BehaviorSubject(undefined);
  accepted = this.acceptedSource.asObservable();

  changeAccepted(accepted: number) {
    this.acceptedSource.next(accepted);
  }

  private rejectedSource = new BehaviorSubject(undefined);
  rejected = this.rejectedSource.asObservable();

  changeRejected(rejected: number) {
    this.rejectedSource.next(rejected);
  }

  private domainSource = new BehaviorSubject(undefined);
  domain = this.domainSource.asObservable();

  changeDomain(domain: string) {
    this.domainSource.next(domain);
  }

  private bestCourseSource = new BehaviorSubject(undefined);
  bestCourse = this.bestCourseSource.asObservable();

  changebestCourse(bestCourse: string) {
    this.bestCourseSource.next(bestCourse);
  }

  private bestPastCourseSource = new BehaviorSubject(undefined);
  bestPastCourse = this.bestPastCourseSource.asObservable();

  changebestPastCourse(bestPastCourse: string) {
    this.bestPastCourseSource.next(bestPastCourse);
  }

  private teamPercentageSource = new BehaviorSubject(undefined);
  teamPercentage = this.teamPercentageSource.asObservable();

  changeteamPercentage(teamPercentage: string) {
    this.teamPercentageSource.next(teamPercentage);
  }

  private courseCoverageSource = new BehaviorSubject(undefined);
  courseCoverage = this.courseCoverageSource.asObservable();

  changecourseCoverage(courseCoverage: string) {
    this.courseCoverageSource.next(courseCoverage);
  }

  private attendedDaysSource = new BehaviorSubject(undefined);
  attendedDays = this.attendedDaysSource.asObservable();

  changeAttendedDays(attendedDays: number) {
    this.attendedDaysSource.next(attendedDays);
  }

  private upcomingDaysSource = new BehaviorSubject(undefined);
  upcomingDays = this.upcomingDaysSource.asObservable();

  changeUpcomingDays(upcomingDays: number) {
    this.upcomingDaysSource.next(upcomingDays);
  }

  private courseStatisticSource = new BehaviorSubject(undefined);
  courseStatistic = this.courseStatisticSource.asObservable();

  changeCourseStatistic(courseStatistic: number[]) {
    this.courseStatisticSource.next(courseStatistic);
  }
}