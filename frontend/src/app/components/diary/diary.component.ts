import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { Workout } from 'src/app/models/workout.model';
import { ExerciseSet } from 'src/app/models/exerciseSet.model';
import { DayService } from 'src/app/services/day.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { ExerciseSetService } from 'src/app/services/exerciseSet.service';

import { MatDialog } from '@angular/material/dialog';
import { WorkoutAddComponent } from '../workout-add/workout-add.component';
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
  
  startDate: Date = new Date();

  constructor(private dialog: MatDialog, private dayService: DayService, private workoutService: WorkoutService, private exerciseSetService: ExerciseSetService) { }
  
  dateClass = (d: Date) => {
    const dateSearch = this.convert(d.toString());
    if (this.allDays) {
      return this.allDays.find(f => f.date == dateSearch) ? "example-custom-date-class": "";
    }
    return "";
  };

  convert(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  ngOnInit(): void {
    this.retrieveAllDays();
    this.searchForWorkouts();
  }

  retrieveAllDays(): void {
    this.dayService.getAll()
      .subscribe(
        data => {
          this.allDays = data;
        },
        error => {
          console.log(error);
        });
  }

  searchForWorkouts() {
    this.clearCurrentWorkout();
    this.workoutService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.searchedWorkouts = data;
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
    this.exerciseSetService.getAllExerciseSet(this.currentWorkout?.id)
      .subscribe(
        data => {
          this.exerciseSets = data;
        },
        error => {
          console.log(error);
        });

  }  

  onDateChanged() {
    this.searchForWorkouts();
  }

  addWorkout() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(WorkoutAddComponent, {
      data: {date: this.convert(this.startDate.toString()),}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.updateWorkoutsForCurrentDay();
      
      this.retrieveAllDays();
      this.searchForWorkouts();
    });
  }

  editWorkout() {
    this.isPopupOpened = true;
    let workout = this.currentWorkout;
    const dialogRef = this.dialog.open(WorkoutAddComponent, {
      data: workout
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.clearCurrentWorkout();
      this.updateWorkoutsForCurrentDay();
    });
  }

  deleteWorkout() {
    this.workoutService.delete(this.currentWorkout!.id)
      .subscribe(
        response => {
          this.clearCurrentWorkout();
          this.updateWorkoutsForCurrentDayV2();
          this.searchForWorkouts();
          this.retrieveAllDays();
        },
        error => {
          console.log(error);
        });
  }

  private updateWorkoutsForCurrentDayV2() {
    this.workoutService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.searchedWorkouts = data;
          this.deleteDayWhenNoWorkouts(data);
          this.deleteWorkoutExerciseSets();
        },
        error => {
          console.log(error);
        });   
  }

  private deleteDayWhenNoWorkouts(workouts: Workout[]) {
    if (workouts == null) {
      const dateSearch = this.convert(this.startDate.toString());
      const dayArray = this.allDays.filter(f => f.date == dateSearch);
      this.dayService.delete(dayArray[0].id)
        .subscribe(
          response => {
            this.retrieveAllDays();
          },
          error => {
            console.log(error);
          });
    }
  }

  private deleteWorkoutExerciseSets() {
    let array = this.exerciseSets ? this.exerciseSets.filter(x => x.workout !== this.currentWorkout) : [];
    for (let index = 0; index < array.length; index++) {
      this.exerciseSetService.delete(array[index].id!)
      .subscribe(
        response => {
          this.searchForExerciseSets();
        },
        error => {
          console.log(error);
        });
    }
  }

  private updateWorkoutsForCurrentDay() {
    this.workoutService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.searchedWorkouts = data;
          this.checkDayExist(data);
        },
        error => {
          console.log(error);
        });   
  }

  private checkDayExist(workouts: Workout[]) {
    const dateSearch = this.convert(this.startDate.toString());
    if (workouts) {
      if (this.allDays){
        const dayArray = this.allDays.filter(f => f.date == dateSearch);
        if (dayArray.length > 0) {
          this.updateCurrentDay(dayArray[0], workouts);
        }
        else {
          this.createNewDay(dateSearch, workouts);
        }
      }  
      else {
        this.createNewDay(dateSearch, workouts);
      }
    } 
  }

  private updateCurrentDay(updateDay: Day, workouts: Workout[]) {
    updateDay.workouts = workouts;
    this.dayService.create(updateDay)
      .subscribe(
        response => {
          this.retrieveAllDays();
        },
        error => {
          console.log(error);
        });
  }

  private createNewDay(dateSearch: string, workouts: Workout[]) {
    const newDay = new Day();
    newDay.date = dateSearch;
    newDay.workouts = workouts;
    this.dayService.create(newDay)
      .subscribe(
        response => {
          this.retrieveAllDays();
        },
        error => {
          console.log(error);
        });
  }

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

  private getExerciseSet(id?: string) {
    return this.exerciseSets ? this.exerciseSets.filter(x => x.id === id) : "";
  }

  deleteExerciseSet(id?: any) {
    this.exerciseSetService.delete(id!)
      .subscribe(
        response => {
          this.searchForExerciseSets();
        },
        error => {
          console.log(error);
        });
  }

  
}
