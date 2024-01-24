import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators'
import {data} from "./data"

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  url = 'http://localhost:8010/api/matieres';
}
