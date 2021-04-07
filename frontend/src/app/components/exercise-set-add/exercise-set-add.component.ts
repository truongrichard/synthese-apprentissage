import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

import { ExerciseService } from 'src/app/services/exercise.service';

import { ExerciseSetService } from 'src/app/services/exerciseSet.service';

@Component({
  selector: 'app-exercise-set-add',
  templateUrl: './exercise-set-add.component.html',
  styleUrls: ['./exercise-set-add.component.css']
})
export class ExerciseSetAddComponent implements OnInit {

  public exerciseSetForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<ExerciseSetAddComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private exerciseService: ExerciseService, private exerciseSetService: ExerciseSetService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.exerciseSetForm = this._formBuilder.group({
      id: [this.data.set.id ],
      repetitions: [ this.data.set.repetitions, [Validators.required]],
      weight: [ this.data.set.weight, [Validators.required]],
      time: [ (this.data.set.time == null ? "00:00:00" : this.data.set.time), [Validators.required]],
      distance: [ this.data.set.distance, [Validators.required]],
      workout: [ this.data.workout ],
    });
  }

  onSubmit() {
    if (isNaN(this.data.id)) {
      console.log(this.exerciseSetForm.value);
      this.newExerciseSet();
      this.dialogRef.close();
    } else {
      console.log(this.exerciseSetForm.value);
      this.newExerciseSet();
      this.dialogRef.close();
    }
  }

  private newExerciseSet() {
    this.exerciseSetService.create(this.exerciseSetForm.value)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
