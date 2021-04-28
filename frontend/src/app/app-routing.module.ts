import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeasurementListComponent } from './components/measurement-list/measurement-list.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { DiaryComponent } from './components/diary/diary.component';

const routes: Routes = [
  { path: '', redirectTo: 'diary', pathMatch: 'full' },
  { path: 'measurement', component: MeasurementListComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'listExercise', component: ExerciseListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
