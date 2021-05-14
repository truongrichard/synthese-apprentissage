package com.synthese.controller;

import com.synthese.model.ImageExercise;
import com.synthese.service.ImageExerciseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/image_exercise")
public class ImageExerciseController {

    private ImageExerciseService imageExerciseService;

    public ImageExerciseController(ImageExerciseService imageExerciseService){
        this.imageExerciseService = imageExerciseService;
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<ImageExercise> uploadImage(@RequestParam("imageFile") MultipartFile file, @PathVariable("id") String id) {
        return imageExerciseService.uploadImage(file, id);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ImageExercise> getImage(@PathVariable("id") String id) throws IOException {
        return imageExerciseService.getImage(id);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteByExerciseId(@PathVariable("id") String id) {
        return imageExerciseService.deleteByExerciseId(id);
    }
}
