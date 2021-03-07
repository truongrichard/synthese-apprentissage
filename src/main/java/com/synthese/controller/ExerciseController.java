package com.synthese.controller;

import com.synthese.model.Exercise;
import com.synthese.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/getAll")
    public ResponseEntity<List<Exercise>> getAll(@RequestParam(required = false) String title) {
        try {
            List<Exercise> exercises = new ArrayList<Exercise>();

            if (title == null)
                exerciseRepository.findAll().forEach(exercises::add);
            else
                exerciseRepository.findByTitleContainingIgnoreCase(title).forEach(exercises::add);

            if (exercises.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(exercises, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Exercise> getById(@PathVariable("id") String id) {
        Optional<Exercise> exerciseOptional = exerciseRepository.findById(id);

        if (exerciseOptional.isPresent()) {
            return new ResponseEntity<>(exerciseOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Exercise> create(@RequestBody Exercise exercise) {
        try {
            Exercise newExercise = exerciseRepository.save(exercise);
            return new ResponseEntity<>(newExercise, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            exerciseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAll() {
        try {
            exerciseRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
