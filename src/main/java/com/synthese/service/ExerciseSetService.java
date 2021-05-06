package com.synthese.service;

import com.synthese.model.ExerciseSet;
import com.synthese.repository.ExerciseSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciseSetService {

    @Autowired
    private ExerciseSetRepository exerciseSetRepository;

    public ExerciseSetService(ExerciseSetRepository exerciseSetRepository){
        this.exerciseSetRepository = exerciseSetRepository;
    }

    public ResponseEntity<List<ExerciseSet>> getAll() {
        try {
            List<ExerciseSet> exerciseSets = new ArrayList<ExerciseSet>();

            exerciseSetRepository.findAll().forEach(exerciseSets::add);

            if (exerciseSets.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(exerciseSets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ExerciseSet> getById(String id) {
        Optional<ExerciseSet> exerciseSetOptional = exerciseSetRepository.findById(id);

        if (exerciseSetOptional.isPresent()) {
            return new ResponseEntity<>(exerciseSetOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<ExerciseSet> create(ExerciseSet exerciseSet) {
        try {
            ExerciseSet newExercise = exerciseSetRepository.save(exerciseSet);
            return new ResponseEntity<>(newExercise, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<HttpStatus> delete(String id) {
        try {
            exerciseSetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ExerciseSet>> getExerciseSetsByWorkoutId(String id) {
        try {
            List<ExerciseSet> exerciseSets = new ArrayList<ExerciseSet>();

            exerciseSetRepository.findAllByWorkoutId(id).forEach(exerciseSets::add);

            if (exerciseSets.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(exerciseSets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
