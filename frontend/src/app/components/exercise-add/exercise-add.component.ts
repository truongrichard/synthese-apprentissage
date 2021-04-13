import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

import { ExerciseService } from 'src/app/services/exercise.service';

import { BodyPart, Category } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
  styleUrls: ['./exercise-add.component.css']
})
export class ExerciseAddComponent implements OnInit {

  public exerciseForm!: FormGroup;

  public bodyParts = Object.values(BodyPart);
  public categories = Object.values(Category);

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<ExerciseAddComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private exerciseService: ExerciseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.exerciseForm = this._formBuilder.group({
      id: [this.data.id ],
      title: [ this.data.title, [Validators.required]],
      description: [ this.data.description, [Validators.required]],
      bodyPart: [ this.data.bodyPart, [Validators.required]],
      category: [ this.data.category, [Validators.required]],
    });
  }

  onSubmit() {
    if (isNaN(this.data.id)) {
      console.log(this.exerciseForm.value);
      this.newExercise();
      this.dialogRef.close();
    } else {
      console.log(this.exerciseForm.value);
      this.newExercise();
      this.dialogRef.close();
    }
  }

  private newExercise() {
    this.exerciseService.create(this.exerciseForm.value)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
