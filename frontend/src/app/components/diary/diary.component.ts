import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { Workout } from 'src/app/models/workout.model';
import { DayService } from 'src/app/services/day.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { createNodeArray, updateIndexedAccessTypeNode } from 'typescript';


import { MatDialog } from '@angular/material/dialog';
import { WorkoutComponent } from '../workout/workout.component';

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

  isPopupOpened = true;

  constructor(private dialog: MatDialog, private dayService: DayService, private workoutService: WorkoutService) { }

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
    this.workoutService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.searchedWorkouts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  };

  setActiveWorkout(workout: Workout, index: number): void {
    this.currentWorkout = workout;
    this.currentIndex = index;
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
}
