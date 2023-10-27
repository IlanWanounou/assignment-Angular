import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

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

  // pour afficher tantot le formulaire,
  // tantot la liste des assignments
  formVisible = false;


  assignmentSelectionne?:Assignment;

  assignments:Assignment[] = [
    {
      nom: 'Devoir Angular de Buffa',
      dateDeRendu: new Date('2023-09-30'),
      rendu: false,
    },
    {
      nom: 'Devoir SQL de Mopolo',
      dateDeRendu: new Date('2023-10-30'),
      rendu: false,
    },
    {
      nom: 'Devoir gestion de Tunsi',
      dateDeRendu: new Date('2023-08-30'),
      rendu: true,
    },
  ];

  ngOnInit() {
    console.log(" AVANT RENDU DE LA PAGE !");
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

  onAddAssignmentBtnClick() {
  this.formVisible = true;
  }

  onNouvelAssignment(event:Assignment) {
    this.assignments.push(event);
    this.formVisible = false;
  }
  deleteAssignment(assignment:Assignment) {
    const index = this.assignments.findIndex(a => a === assignment);
    this.assignments.splice(index, 1);
    this.assignmentSelectionne = undefined;
  }
}