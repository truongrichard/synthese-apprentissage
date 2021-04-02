import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { Workout } from 'src/app/models/workout.model';
import { ExerciseSet } from 'src/app/models/exerciseSet.model';
import { DayService } from 'src/app/services/day.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { ExerciseSetService } from 'src/app/services/exerciseSet.service';
import { createNodeArray, updateIndexedAccessTypeNode } from 'typescript';


import { MatDialog } from '@angular/material/dialog';
import { WorkoutComponent } from '../workout/workout.component';
import { ExerciseSetAddComponent } from '../exercise-set-add/exercise-set-add.component';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DiaryComponent implements OnInit {
  allDays?: Day[];
  searchedWorkouts?: Workout[];
  currentIndex = -1;
  currentWorkout?: Workout;
  currentExercise?: Exercise;
  exerciseSets?: ExerciseSet[];

  isPopupOpened = true;

  constructor(private dialog: MatDialog, private dayService: DayService, private workoutService: WorkoutService, private exerciseSetService: ExerciseSetService) { }

  convert(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  ngOnInit(): void {
    this.retrieveAllDays();
  }

  retrieveAllDays(): void {
    this.dayService.getAll()
      .subscribe(
        data => {
          this.allDays = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  dateClass = (d: Date) => {
    const dateSearch = this.convert(d.toString());
    if (this.allDays) {
      return this.allDays.find(f => f.date == dateSearch) ? "example-custom-date-class": "";
    }
    return "";
  };

  startDate: Date = new Date();

  searchFor() {
    this.clearCurrentWorkout();
    this.workoutService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.searchedWorkouts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  clearCurrentWorkout() {
    this.currentWorkout = undefined;
    this.currentExercise = undefined;
    this.currentIndex = -1;
  }

  setActiveWorkout(workout: Workout, index: number): void {
    this.currentWorkout = workout;
    this.currentExercise = workout.exercise;
    this.currentIndex = index;
    this.searchForExerciseSets();
  }

  searchForExerciseSets() {
    console.log(this.currentWorkout?.id);
    this.exerciseSetService.getAllExerciseSet(this.currentWorkout?.id)
      .subscribe(
        data => {
          this.exerciseSets = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

  }

  // WIP
  addWorkout() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(WorkoutComponent, {
      data: {date: this.convert(this.startDate.toString()),}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.searchFor();
    });
  }

  // ExerciseSet
  addExerciseSet() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ExerciseSetAddComponent, {
      data: {workout: this.currentWorkout, set: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.searchForExerciseSets();
    });
  }

  editExerciseSet(id?: any) {
    this.isPopupOpened = true;
    let set = this.getExerciseSet(id)[0];
    const dialogRef = this.dialog.open(ExerciseSetAddComponent, {
      data: {workout: this.currentWorkout, set: set,}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.searchForExerciseSets();
    });
  }

  deleteExerciseSet(id?: any) {
    console.log("DELETE!");
    this.exerciseSetService.delete(id!)
      .subscribe(
        response => {
          console.log(response);
          this.searchForExerciseSets();
        },
        error => {
          console.log(error);
        });
  }

  getExerciseSet(id?: string) {
    if (this.exerciseSets) {
      return this.exerciseSets.filter(x => x.id === id);
    }
    else{
      return "";
    }
  }
}
