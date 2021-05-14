package com.synthese.controller;

import com.synthese.model.ExerciseSet;
import com.synthese.service.ExerciseSetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/exercise_sets")
public class ExerciseSetController {

    private ExerciseSetService exerciseSetService;

    public ExerciseSetController(ExerciseSetService exerciseSetService){
        this.exerciseSetService = exerciseSetService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ExerciseSet>> getAll() {
        return exerciseSetService.getAll();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ExerciseSet> getById(@PathVariable("id") String id) {
        return exerciseSetService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<ExerciseSet> create(@RequestBody ExerciseSet exerciseSet) {
        return exerciseSetService.create(exerciseSet);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        return exerciseSetService.delete(id);
    }

    @GetMapping("/get/exerciseSet/{id}")
    public ResponseEntity<List<ExerciseSet>> getExerciseSetsByWorkoutId(@PathVariable("id") String id) {
        return exerciseSetService.getExerciseSetsByWorkoutId(id);
    }
}
