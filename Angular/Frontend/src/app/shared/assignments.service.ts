import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';


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

  constructor (private loggingService:LoggingService, private http:HttpClient) { }

    url = "http://localhost:8010/api/assignments" ;
     getAssignments(): Observable<Assignment[]> {
     return this.http.get<Assignment[]>(this.url)
  }

  addAssignment(assignment:Assignment): Observable<any> {
    return this.http.post<Assignment>(this.url, assignment)
  }

  updateAssignment(assignment:Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment): Observable<any> {
    return this.http.delete(this.url + '/' + assignment._id)
  }

  getAssignment(id:number): Observable<Assignment|undefined> {
    return this.http.get<Assignment>(this.url + "/" + id)

  }
}
