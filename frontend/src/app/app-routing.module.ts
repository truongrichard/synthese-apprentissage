import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { HistoryComponent } from './components/history/history.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { ExerciseAddComponent } from './components/exercise-add/exercise-add.component';
import { DiaryComponent } from './components/diary/diary.component';


import { WorkoutListComponent } from './components/workout-list/workout-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'listExercise', component: ExerciseListComponent },
  { path: 'addExercise', component: ExerciseAddComponent },
  { path: 'workout', component: WorkoutListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
