import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ImageExerciseService } from 'src/app/services/imageExercise.service';
import { ExerciseAddComponent } from '../exercise-add/exercise-add.component';
import { ImageExerciseAddComponent } from '../image-exercise-add/image-exercise-add.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ExerciseListComponent implements OnInit {
  exercises?: Exercise[];
  currentExercise?: Exercise;
  currentIndex = -1;
  title = '';

  isPopupOpened = true;
  
  retrievedImageExercise: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(private dialog: MatDialog, private exerciseService: ExerciseService, private imageExerciseService: ImageExerciseService) { }

  ngOnInit(): void {
    this.retrieveExercises();
  }
  
  retrieveExercises(): void {
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

  refreshList(): void {
    this.retrieveExercises();
    this.currentExercise = undefined;
    this.currentIndex = -1;
  }

  setActiveExercise(exercise: Exercise, index: number): void {
    this.currentExercise = exercise;
    this.currentIndex = index;
    this.getImage();
  }

  searchTitle(): void {
    this.currentExercise = undefined;
    this.currentIndex = -1;

    this.exerciseService.findByTitle(this.title)
      .subscribe(
        data => {
          this.exercises = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // WIP ...

  getImage() {
    this.imageExerciseService.get(this.currentExercise?.id)
      .subscribe(
        res => {
          console.log(res);
          this.retrieveResonse = res;
          if (res != null){
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImageExercise = 'data:image/jpeg;base64,' + this.base64Data;
          }
        }
      );
  }

  addImageExercise() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ImageExerciseAddComponent, {
      data: {exerciseId: this.currentExercise?.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.retrieveExercises();
    });
  }

  goToYoutubeLink() {
    window.open("https://www.youtube.com/results?search_query=" + this.currentExercise?.title + " Technique")
  }

  goToGoogleLink(){
    window.open("https://www.google.com/search?q=" + this.currentExercise?.title + " Technique");
  }

  clearCurrenExercise() {
    this.currentExercise = undefined;
    this.currentIndex = -1;
    this.retrieveExercises();
  }

  addExercise() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ExerciseAddComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.retrieveExercises();
    });
  }

  editExercise() {
    this.isPopupOpened = true;
    let exercise = this.currentExercise;
    const dialogRef = this.dialog.open(ExerciseAddComponent, {
      data: exercise
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.clearCurrenExercise();
    });
  }

  deleteExercise() {
    this.exerciseService.delete(this.currentExercise!.id)
      .subscribe(
        response => {
          this.clearCurrenExercise();
          //console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
