package com.synthese.controller;

import com.synthese.model.ExerciseSet;
import com.synthese.repository.ExerciseSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/exercise_sets")
public class ExerciseSetController {

    @Autowired
    private ExerciseSetRepository exerciseSetRepository;

    @GetMapping("/getAll")
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

    @GetMapping("/get/{id}")
    public ResponseEntity<ExerciseSet> getById(@PathVariable("id") String id) {
        Optional<ExerciseSet> exerciseSetOptional = exerciseSetRepository.findById(id);

        if (exerciseSetOptional.isPresent()) {
            return new ResponseEntity<>(exerciseSetOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ExerciseSet> create(@RequestBody ExerciseSet exerciseSet) {
        try {
            ExerciseSet newExercise = exerciseSetRepository.save(exerciseSet);
            return new ResponseEntity<>(newExercise, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            exerciseSetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAll() {
        try {
            exerciseSetRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
