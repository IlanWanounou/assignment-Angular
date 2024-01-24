import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  page: number = 1;
  limit: number = 20;
  assignmentSelectionne?: Assignment;
  assignments: Assignment[] = [];
  count!: number;
  filter = 'all';
  searchTerm = '';
  

  constructor(private changeDetectorRef: ChangeDetectorRef, private assignmentsService: AssignmentsService) {}

  ngOnInit() {
    this.getData(this.page);
    this.assignmentsService.getAssignmentCount().subscribe((count) => {
      this.count = count.count;
    });
    // this.peuplerBD();

  }

  getData(page: number) {
    this.assignmentsService
      .getAssignmentsPagine(page, this.limit, {search: this.searchTerm})
      .subscribe((data) => {
        (this.assignments = data.docs),
        this.count = data.totalDocs;
        console.log('data reçu');
        this.changeDetectorRef.detectChanges();
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
    this.getData(e.pageIndex + 1);
  }

  get allCount() {
    return this.assignments ? this.assignments.length : 0;
  }
  get rendusCount() {
    return this.assignments.filter((a) => a.rendu).length;
  }
  get nonRendusCount() {
    return this.assignments.filter((a) => !a.rendu).length;
  }

  get filteredAssignments() {
    let assignments;
    if (this.filter === 'all') {
      assignments = this.assignments;
    } else if (this.filter === 'rendus') {
      assignments = this.assignments.filter((a) => a.rendu);
    } else if (this.filter === 'nonRendus') {
      assignments = this.assignments.filter((a) => !a.rendu);
    } else {
      assignments = this.assignments;
    }
    return assignments;
  }

}
