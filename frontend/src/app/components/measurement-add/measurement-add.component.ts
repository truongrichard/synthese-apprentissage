import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

import { MeasurementService } from 'src/app/services/measurement.service';

import { Category } from 'src/app/models/measurement.model';

@Component({
  selector: 'app-measurement-add',
  templateUrl: './measurement-add.component.html',
  styleUrls: ['./measurement-add.component.css']
})
export class MeasurementAddComponent implements OnInit {

  public measurementForm!: FormGroup;

  public categories = Object.values(Category);

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<MeasurementAddComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private measurementService: MeasurementService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.measurementForm = this._formBuilder.group({
      id: [this.data.id ],
      value: [ this.data.value, [Validators.required]],
      date: [ this.data.date, [Validators.required]],
      category: [ this.data.category, [Validators.required]],
    });
  }

  onSubmit() {
    this.newMeasurement();
    this.dialogRef.close();
  }

  private newMeasurement() {
    this.measurementService.create(this.measurementForm.value)
      .subscribe(
        response => {
        },
        error => {
          console.log(error);
        });
  }

}
