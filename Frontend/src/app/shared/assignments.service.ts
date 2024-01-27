import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators'
import {data} from "./data"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  url = environment.apiUrl + '/assignments';
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }
  getAssignmentsPagine(
    page: number,
    limit: number,
    options: { [key: string]: any }
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (options) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          params = params.set(key, options[key]);
        }
      }
    }

    return this.http.get<any>(this.url, { params: params });
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(this.url + '/' + assignment._id);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + '/' + id).pipe(
      map((a) => {
        // a.nom +=" avec Pipe";
        return a;
      }),
      tap((_) => {
        console.log(
          'tap: Assignment avec id = ' +
            id +
            ' requête GET envoyer sur MongoDB Cloud'
        );
      }),
      catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    );
  }

  getAssignmentCount(): Observable<any> {
    return this.http.get<any>(this.url + '/count');
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation + 'a échoué ' + error.message);
      return of(result as T);
    };
  }

  searchAssignments(term: string) {
    return this.http.get<Assignment[]>(this.url + '/search/' + term);
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    data.forEach((a) => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }
}
