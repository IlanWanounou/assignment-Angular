import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { MatiereService } from 'src/app/shared/matiere.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // Stepper form groups
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  subjects: any;
  selectedSubject: any;
  minDate = new Date();

  constructor(
    private assignmentsService:AssignmentsService,
    private router: Router,
    private matiereService: MatiereService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize form groups for each step
    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required],
      auteur: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      remarques: ['', Validators.required],
      dateDeRendu: ['', Validators.required],
      selectedSubject: ['', Validators.required]
    });
    this.matiereService.getMatieres().subscribe((subject) => {
      this.subjects = subject;
    });
  }

  onSubmit() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      alert("Veuillez compléter tous les champs requis.");
      return;
    }

    const assignment = new Assignment();
    assignment.nom = this.firstFormGroup.value.nomDevoir;
    assignment.auteur = this.firstFormGroup.value.auteur;
    assignment.remarques = this.secondFormGroup.value.remarques;
    console.log("c'est la remarque " + this.secondFormGroup.value.remarques);
    assignment.dateDeRendu = this.secondFormGroup.value.dateDeRendu;
    assignment.matiere = this.secondFormGroup.value.selectedSubject;

    this.assignmentsService.addAssignment(assignment).subscribe(message => {
      console.log(message);
      this.snackBar.open('Devoir ajouté', 'Fermer', {
        duration: 2000,
      });
      this.router.navigate(['/home']);
    });
  }

  getSubjectName(subject: any): string {
    // Assurez-vous que la propriété 'name' existe sur l'objet 'subject'
    return subject ? subject.name : 'Non spécifié';
  }
  // In your component
  get formattedDateDeRendu(): string | null {
    const date = this.secondFormGroup.get('dateDeRendu')?.value;
    if (date) {
      return new Date(date).toISOString();
    }
    return null;
  }


}
