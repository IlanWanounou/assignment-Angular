import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  page: number = 1;
  limit: number = 20;
  assignments!: MatTableDataSource<Assignment>;
  count!: number;
  searchTerm = '';
  filteredAssignments: MatTableDataSource<Assignment> | null = null;
  selectedFilter: 'all' | 'rendus' | 'nonRendus' = 'all';
  originalAssignments!: MatTableDataSource<Assignment>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit() {
    this.assignments = new MatTableDataSource<Assignment>();
    this.getData(this.page);
    this.assignmentsService.getAssignmentCount().subscribe((count) => {
      this.count = count.count;
    });
    // this.peuplerBD();
  }

  getData(page: number) {
    this.assignmentsService.getAssignmentsPagine(page, this.limit, { search: this.searchTerm })
      .subscribe(data => {
        const newDataSource = new MatTableDataSource<Assignment>(data.docs);
        this.originalAssignments = new MatTableDataSource<Assignment>(data.docs);
        this.assignments.data = newDataSource.data;
        this.assignments.sort = this.sort;
        this.changeDetectorRef.detectChanges();
      });
  }
  applyFilter() {
    let filteredData;
    switch (this.selectedFilter) {
      case 'rendus':
        filteredData = this.originalAssignments.data.filter(assignment => assignment.rendu);
        break;
      case 'nonRendus':
        filteredData = this.originalAssignments.data.filter(assignment => !assignment.rendu);
        break;
      default:
        filteredData = this.originalAssignments.data; // Aucun filtre appliqué
    }
    this.count = filteredData.length; // Mettre à jour le compte
    this.assignments = new MatTableDataSource<Assignment>(filteredData);
    this.changeDetectorRef.detectChanges();
  }

  countAll(): number {
    return this.originalAssignments.data.length;
  }
  countRendus(): number {
    return this.originalAssignments.data.filter(assignment => assignment.rendu).length;
  }
  countNonRendus(): number {
    return this.originalAssignments.data.filter(assignment => !assignment.rendu).length;
  }
  getDataSource() {
    return this.filteredAssignments || this.assignments;
  }
  handlePageEvent(e: PageEvent) {
    this.limit = e.pageSize;
    this.getData(e.pageIndex + 1);
    this.applyFilter();
  }

}
