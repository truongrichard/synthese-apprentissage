import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';


import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/app/models/workout.model';

import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  public workoutForm!: FormGroup;

  public exercises?: Exercise[];
  public workouts?: Workout[];
  public exerciseId!: string;

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<WorkoutComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private workoutService: WorkoutService, private exerciseService: ExerciseService) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
    this.getAllExercises();
    
    this.workoutForm = this._formBuilder.group({
      id: [this.data.id],
      date: [ this.data.date],
      title: [ this.data.title, [Validators.required]],
      description: [ this.data.description, [Validators.required]],
      exercise: [ this.data.exercise, [Validators.required]],
    });
  }

  getAllExercises() {
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

  onSubmit() {
    if (isNaN(this.data.id)) {
      this.newWorkout();
      this.dialogRef.close();
    } else {
      this.newWorkout();
      this.dialogRef.close();
    }
  }

  private newWorkout() {
    this.workoutService.create(this.workoutForm.value)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
