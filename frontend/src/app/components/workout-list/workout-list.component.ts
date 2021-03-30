import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutComponent } from '../workout/workout.component';

import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/app/models/workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  isPopupOpened = true;
  workouts?: Workout[];

  constructor(private dialog: MatDialog, private workoutService: WorkoutService) { }

  ngOnInit() {
    this.getAllWorkouts();
  }

  getAllWorkouts() {
    this.workoutService.getAll()
      .subscribe(
        data => {
          this.workouts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  addWorkout() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(WorkoutComponent, {
      data: {date: "2021-03-29",}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.getAllWorkouts();
    });
  }

  editWorkout(id?: string) {
    this.isPopupOpened = true;
    let workout = this.getWorkout(id)[0];
    const dialogRef = this.dialog.open(WorkoutComponent, {
      data: workout
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.getAllWorkouts();
    });
  }

  getWorkout(id?: string) {
    if (this.workouts) {
      return this.workouts.filter(x => x.id === id);
    }
    else{
      return "";
    }
  }

  deleteWorkout(id?: any) {
    console.log("DELETE!");
    this.workoutService.delete(id!)
      .subscribe(
        response => {
          console.log(response);
          this.getAllWorkouts();
        },
        error => {
          console.log(error);
        });
  }
}
