import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LoggingService } from './logging.service';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id: 1,
      nom: 'Devoir Angular de Buffa',
      dateDeRendu: new Date('2023-09-30'),
      rendu: false,
    },
    {
      id: 2,
      nom: 'Devoir SQL de Mopolo',
      dateDeRendu: new Date('2023-10-30'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Devoir gestion de Tunsi',
      dateDeRendu: new Date('2023-08-30'),
      rendu: true,
    },
  ];

  constructor (private loggingService:LoggingService) { }

 

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment:Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, " ajouté");
    return of('Assignment ajouté');
  }

  updateAssignment(assignment:Assignment): Observable<string> {
    return of ("Assignment service: assignment modifié");
  }

  deleteAssignment(assignment:Assignment): Observable<string> {
   let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos,1);

    return of ("Assignment service: assignment supprimé ! ");
  }

  getAssignment(id:number): Observable<Assignment|undefined> {
   return of(this.assignments.find(a => a.id == id));

  }
}
