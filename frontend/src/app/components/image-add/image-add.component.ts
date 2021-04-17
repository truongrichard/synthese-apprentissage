import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ImageExerciseService } from 'src/app/services/imageExercise.service';
import { ImageExercise } from 'src/app/models/imageExercise.model';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {
  constructor(private httpClient: HttpClient, private imageExerciseService: ImageExerciseService) { }

  ngOnInit(): void {
  }

  selectedFile!: File;
  retrievedImageExercise: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  imageExercise!: ImageExercise;

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    /*
    this.httpClient.post('http://localhost:8080/image_exercise/upload/6056b3630a2908189e2db486', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
    );
    */
    this.imageExerciseService.create("6056b3630a2908189e2db486", uploadImageData).subscribe(
      data => {
        this.imageExercise = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
  //Make a call to Sprinf Boot to get the Image Bytes.
    //this.httpClient.get('http://localhost:8080/image_exercise/get/6056b3630a2908189e2db486')
    this.imageExerciseService.get("6056b3630a2908189e2db486")
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImageExercise = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
