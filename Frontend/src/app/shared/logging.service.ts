import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName:Assignment["nom"], action:string) {
    console. log ("Assignment " + " " + assignmentName + action);
  }
}
