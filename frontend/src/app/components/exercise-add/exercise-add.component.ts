import { Component, OnInit } from '@angular/core';
import { BodyPart, Category, Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
  styleUrls: ['./exercise-add.component.css']
})
export class ExerciseAddComponent implements OnInit {
  exercise: Exercise = {
    title: '',
    description: '',
    bodyPart: '',
    category: '',
  };
  public bodyParts = Object.values(BodyPart);
  public categories = Object.values(Category);
  submitted = false;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
  }

  saveExercise(): void {
    const data = {
      title: this.exercise.title,
      description: this.exercise.description,
      bodyPart: this.exercise.bodyPart,
      category: this.exercise.category
    };

    this.exerciseService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newExercise(): void {
    this.submitted = false;
    this.exercise = {
      title: '',
      description: '',
      bodyPart: '',
      category: '',
    };
  }

}
