import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  page: number = 1;
  limit: number = 10;
  assignmentSelectionne?: Assignment;
  assignments: Assignment[] = [];
  count!: number;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit() {
    this.assignmentsService.getAssignmentCount().subscribe((count) => {
      this.count = count.count;
    });
    // this.peuplerBD();
    this.getData(this.page);
  }
  getData(page:number) {
    this.assignmentsService
      .getAssignmentsPagine(page, this.limit)
      .subscribe((data) => {
        (this.assignments = data.docs),
        console.log('data reçu');
      });
  }
  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDavecForkJoin().subscribe(() => {
      console.log(
        'LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE'
      );
      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      // Marche plus avec la dernière version d’angular
      //this.router.navigate(["/home"], {replaceUrl:true});
      // ceci marche….
      window.location.reload();
    });
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  assignmentClique(a: Assignment) {
    this.assignmentSelectionne = a;
  }

  deleteAssignment(assignment: Assignment) {
    const index = this.assignments.findIndex((a) => a === assignment);
    this.assignments.splice(index, 1);
    this.assignmentSelectionne = undefined;
  }

  handlePageEvent(e: PageEvent) {
   this.getData(e.pageIndex+1)
  }
}
