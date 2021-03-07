package com.synthese.service;

import com.synthese.model.Exercise;
import com.synthese.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class InsertDataService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Transactional
    public void insertExercise() {
        Exercise exercise1 = new Exercise();
        exercise1.setTitle("Push Up");
        exercise1.setDescription("");
        exercise1.setBodyPart(Exercise.BodyPart.CHEST);
        exercise1.setCategory(Exercise.Category.BODYWEIGHT);
        exerciseRepository.save(exercise1);

        Exercise exercise2 = new Exercise();
        exercise2.setTitle("Pull Up");
        exercise2.setDescription("");
        exercise2.setBodyPart(Exercise.BodyPart.BACK);
        exercise2.setCategory(Exercise.Category.BODYWEIGHT);
        exerciseRepository.save(exercise2);

        Exercise exercise3 = new Exercise();
        exercise3.setTitle("Sit Up");
        exercise3.setDescription("");
        exercise3.setBodyPart(Exercise.BodyPart.STOMACH);
        exercise3.setCategory(Exercise.Category.BODYWEIGHT);
        exerciseRepository.save(exercise3);

        Exercise exercise4 = new Exercise();
        exercise4.setTitle("Squat");
        exercise4.setDescription("");
        exercise4.setBodyPart(Exercise.BodyPart.LEG);
        exercise4.setCategory(Exercise.Category.BODYWEIGHT);
        exerciseRepository.save(exercise4);

        Exercise exercise5 = new Exercise();
        exercise5.setTitle("Plank");
        exercise5.setDescription("");
        exercise5.setBodyPart(Exercise.BodyPart.STOMACH);
        exercise5.setCategory(Exercise.Category.DURATION);
        exerciseRepository.save(exercise5);

        Exercise exercise6 = new Exercise();
        exercise6.setTitle("Biceps Curl");
        exercise6.setDescription("");
        exercise6.setBodyPart(Exercise.BodyPart.ARM);
        exercise6.setCategory(Exercise.Category.DUMBBELL);
        exerciseRepository.save(exercise6);

        Exercise exercise7 = new Exercise();
        exercise7.setTitle("Jumping Jack");
        exercise7.setDescription("");
        exercise7.setBodyPart(Exercise.BodyPart.LEG);
        exercise7.setCategory(Exercise.Category.CARDIO);
        exerciseRepository.save(exercise7);

    }
}
