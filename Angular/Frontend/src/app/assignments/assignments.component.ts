import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  page:number = 1;
  limit:number = 10;
  totalPages!:number;
  totalDocs!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:number;
  hasNextPage!:number;
  assignmentSelectionne?:Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService) {
  }

  ngOnInit() {
    // this.peuplerBD();
    console.log(" AVANT RENDU DE LA PAGE !");
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs,
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
      console.log("data reçu")

    })
  }
  peuplerBD() {
   // version naive et simple
   //this.assignmentsService.peuplerBD();

   // meilleure version :
   this.assignmentsService.peuplerBDavecForkJoin()
     .subscribe(() => {
       console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
	// replaceUrl = true = force le refresh, même si
	// on est déjà sur la page d’accueil
// Marche plus avec la dernière version d’angular
       //this.router.navigate(["/home"], {replaceUrl:true});
	// ceci marche….
	window.location.reload();
     })
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
