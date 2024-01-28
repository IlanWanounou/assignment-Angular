import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent {
  assignmentTransmis?: Assignment;
  isAdmin!: boolean;
  prefix = environment.apiUrlPhoto;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.authService
      .isAdmin()
      .toPromise()
      .then((data) => {
        this.isAdmin = data.isAdmin;
      });
  }

  getAssignment(): void {
    this.assignmentsService
      .getAssignment(this.route.snapshot.params['id'])
      .subscribe((assignment) => {
        this.assignmentTransmis = assignment;
      });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message);
          this.router.navigate(['/home']);
        });
    }
  }

  onSubmit(event: any) {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message);
          this.snackBar.open("L'Assignment a été noté, le status est rendu", 'OK', {
            duration: 2000,
          });
          this.router.navigate(['/home']);
        });
    }
  }
  onDelete(event: any) {
    if (this.assignmentTransmis) {
      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message);
        });
        this.snackBar.open("L'Assignment a été supprimé", 'OK', {
          duration: 2000,
        });
      this.router.navigate(['/home']);
    }
  }
}
