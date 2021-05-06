package com.synthese.controller;

import com.synthese.model.Exercise;
import com.synthese.service.ExerciseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    private ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService){
        this.exerciseService = exerciseService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Exercise>> getAll(@RequestParam(required = false) String title) {
        return exerciseService.getAll(title);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Exercise> getById(@PathVariable("id") String id) {
        return exerciseService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Exercise> create(@RequestBody Exercise exercise) {
        return exerciseService.create(exercise);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        return exerciseService.delete(id);
    }
}
