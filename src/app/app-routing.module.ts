import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemographicDetailsComponent } from './demographic-details/demographic-details.component';
import { HomeComponent } from './home/home.component';
import { ViewExaminationComponent } from './view-examination/view-examination.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
   { path: '',component: HomeComponent },
  { path: 'demographic', component: DemographicDetailsComponent },
  { path: 'examination', component: VisitDetailsComponent },
  { path: 'view-examination', component: ViewExaminationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
