import { Component} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  constructor(private assignmentsService:AssignmentsService, private router: Router) { }

  // pour le formulaire
  nomDevoir=""
  dateDeRendu?:Date=undefined;

  onSubmit(event:any) {
    if(!this.nomDevoir || !this.dateDeRendu) {
      alert("Veuillez entrer un nom de devoir et une date de rendu")
      return;
    }
   const assignment = new Assignment();
    assignment.nom = this.nomDevoir;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.rendu = false;

    this.assignmentsService.addAssignment(assignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}