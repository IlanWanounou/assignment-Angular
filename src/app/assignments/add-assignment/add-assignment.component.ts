import { Component, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  // Evenement qu'on enverra au père avec la soumission
  // du formulaire
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  // pour le formulaire
  nomDevoir=""
  dateDeRendu?:Date=undefined;

  onSubmit(event:any) {

    let a = new Assignment();
    a.nom = this.nomDevoir;
    if(this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;

    a.rendu = false;

    //this.assignments.push(a);
    this.nouvelAssignment.emit(a);
  }

}