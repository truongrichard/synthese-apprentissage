import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises?: Exercise[];
  currentExercise?: Exercise;
  currentIndex = -1;
  title = '';

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.retrieveExercises();
  }

  retrieveExercises(): void {
    this.exerciseService.getAll()
      .subscribe(
        data => {
          this.exercises = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveExercises();
    this.currentExercise = undefined;
    this.currentIndex = -1;
  }

  setActiveExercise(exercise: Exercise, index: number): void {
    this.currentExercise = exercise;
    this.currentIndex = index;
  }

  removeAllExercises(): void {
    this.exerciseService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentExercise = undefined;
    this.currentIndex = -1;

    this.exerciseService.findByTitle(this.title)
      .subscribe(
        data => {
          this.exercises = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteExercise(id: string): void {
    this.exerciseService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

}
