import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule }from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
import {AssignmentDetailComponent}  from './assignments/assignment-detail/assignment-detail.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { AuthGuardAdmin, AuthGuardLogged } from './shared/auth.guard';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent,  canActivate:[AuthGuardLogged] },
  { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate:[AuthGuardAdmin] },
 // { path: '**', component: AssignmentsComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AddAssignmentComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule, MatIconModule, MatDividerModule, MatPaginatorModule,
    MatCardModule, MatFormFieldModule, MatInputModule, HttpClientModule,
    FormsModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatListModule, MatSlideToggleModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
