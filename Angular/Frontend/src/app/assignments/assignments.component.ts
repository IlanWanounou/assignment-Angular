import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = "Formulaire d'ajout de devoir";
  color = 'green';
  id="monParagraphe";
  boutonDesactive = true;

  assignmentSelectionne?:Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService) {
  }

  ngOnInit() {
    console.log(" AVANT RENDU DE LA PAGE !");
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });
    /*
    setTimeout(() => {
      this.boutonDesactive = false;
    }, 3000)
    */
  }
  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }


  assignmentClique(a:Assignment) {
    this.assignmentSelectionne = a;
  }

  deleteAssignment(assignment:Assignment) {
    const index = this.assignments.findIndex(a => a === assignment);
    this.assignments.splice(index, 1);
    this.assignmentSelectionne = undefined;
  }
}