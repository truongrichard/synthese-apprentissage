import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImageExerciseService } from 'src/app/services/imageExercise.service';
import { ImageExercise } from 'src/app/models/imageExercise.model';

@Component({
  selector: 'app-image-exercise-add',
  templateUrl: './image-exercise-add.component.html',
  styleUrls: ['./image-exercise-add.component.css']
})
export class ImageExerciseAddComponent implements OnInit {

  selectedFile!: File;
  imageExercise!: ImageExercise;
  previewUrl: string = '';

  constructor(private dialogRef: MatDialogRef<ImageExerciseAddComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private imageExerciseService: ImageExerciseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage(event);
  }

  previewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.previewUrl = event.target.result;
      }
    }
  }

  onSubmit() {
    console.log(this.selectedFile);
    console.log(this.data.exerciseId);
    this.uploadImageExercise();
    this.dialogRef.close();
  }

  uploadImageExercise() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.imageExerciseService.create(this.data.exerciseId, uploadImageData).subscribe(
      data => {
        this.imageExercise = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}
