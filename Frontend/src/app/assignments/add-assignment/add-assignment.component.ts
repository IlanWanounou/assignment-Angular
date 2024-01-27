import { Component} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {Router} from '@angular/router';
import { MatiereService } from 'src/app/shared/matiere.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  constructor(private assignmentsService:AssignmentsService, private router: Router,private matiereService: MatiereService  ) { }

  // pour le formulaire
  nomDevoir=""
  dateDeRendu?:Date=undefined;
  auteur=""
  remarques=""
  subjects: any;
  selectedSubject: any;
  minDate = new Date();

  ngOnInit(): void {
    this.matiereService.getMatieres().subscribe((subject) => {
      this.subjects = subject;
    });
  }


  onSubmit(event:any) {
    if(!this.nomDevoir || !this.dateDeRendu) {
      alert("Veuillez entrer un nom de devoir et une date de rendu")
      return;
    }
   const assignment = new Assignment();
    assignment.nom = this.nomDevoir;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.auteur = this.auteur;
    assignment.remarques = this.remarques;
    assignment.matiere = this.selectedSubject._id;

    this.assignmentsService.addAssignment(assignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

}
