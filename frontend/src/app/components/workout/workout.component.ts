import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';


import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/app/models/workout.model';

import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseSetService } from 'src/app/services/exerciseSet.service';
import { ExerciseSet } from 'src/app/models/exerciseSet.model';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  public workoutForm!: FormGroup;
  //public setForm!: FormGroup;

  public exercises?: Exercise[];
  public workouts?: Workout[];
  public exerciseId!: string;
  
  //public exerciseSets?: ExerciseSet[];

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
      exerciseSet: this._formBuilder.array([this.addExerciseSetFormGroup()]),
    });

    this.data.exerciseSet.forEach((set: any) => {
      this.addExerciseSetInitial(set)
    })

    /*
    this.setForm = this._formBuilder.group({
      id: [this.data.id],
      repititions: [ this.data.title, [Validators.required]],
      weight: [ this.data.description, [Validators.required]],
      duration: [ this.data.exercise, [Validators.required]],
    });
    */
  }

  addExerciseSetInitial(set: any): FormGroup {
    return this._formBuilder.group({
      id: [set.id, Validators.required],
      repititions: [set.repititions, Validators.required],
      weight: [set.weight, Validators.required],
      duration: [set.duration, Validators.required],
    });
  }

  addExerciseSetFormGroup(): FormGroup {
    return this._formBuilder.group({
      id: ["", Validators.required],
      repititions: ["", Validators.required],
      weight: ["", Validators.required],
      duration: ["", Validators.required],
    });
  }

  addExerciseSet(): void {
    (<FormArray>this.workoutForm.get("exerciseSet")).push(
      this.addExerciseSetFormGroup()
    );
  }

  onSubmit2() {
    console.log(this.workoutForm.value)
  }

  get exerciseSetArray() {
    return this.workoutForm.get("exerciseSet") as FormArray;
  }

  /*
  addExerciseSet(): void {
    this.exerciseSetArray.push(this.setForm);
    console.log(this.exerciseSetArray.controls[0].value);
  }
  */

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
      this.workoutService.create(this.workoutForm.value)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      this.dialogRef.close();
    } else {
      this.workoutService.create(this.workoutForm.value)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      this.dialogRef.close();
    }
  }

  submit() {

  }
}
