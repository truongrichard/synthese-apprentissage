import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { Workout } from 'src/app/models/workout.model';
import { DayService } from 'src/app/services/day.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { createNodeArray, updateIndexedAccessTypeNode } from 'typescript';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DiaryComponent implements OnInit {
  allDays?: Day[];
  workouts?: Workout[];
  currentIndex = -1;
  currentWorkout?: Workout;

  testDays?: Day[];
  testWorkouts?: Workout[];

  constructor(private dayService: DayService, private workoutService: WorkoutService) { }

  convert(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  ngOnInit(): void {
    this.retrieveAllDays();
    this.retrieveAllWorkouts();
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
    //console.log(this.startDate.toString());
    //console.log(this.convert(this.startDate.toString()));
    this.workoutService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.workouts = data;
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

  test() {
    console.log("TEST ADD WORKOUT");
    const dateSearch = this.convert(this.startDate.toString());
    if (this.allDays) {
      this.allDays.find(f => f.date == dateSearch) ? this.updateDayLog(dateSearch): this.createDayLog();
    }
  }
   
  retrieveAllWorkouts(): void {
    this.workoutService.getAll()
      .subscribe(
        data => {
          this.testWorkouts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateDayLog(dateSearch: string) {
    console.log("FOUND");
    if (this.allDays) {
      let updateDay = this.allDays.filter(x => x.date === dateSearch)
      updateDay[0].workouts = this.testWorkouts;
      console.log(updateDay[0]);
      this.dayService.create(updateDay[0])
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
          
      this.retrieveAllDays();    
    }
  }

  createDayLog() {
    console.log("NOTFOUND");
    const data = {
      date: this.convert(this.startDate.toString())
    };

    this.dayService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    
    this.retrieveAllDays();    
  }
}
