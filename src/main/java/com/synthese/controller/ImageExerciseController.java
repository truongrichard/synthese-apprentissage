package com.synthese.controller;

import com.synthese.model.Exercise;
import com.synthese.model.ImageExercise;
import com.synthese.repository.ExerciseRepository;
import com.synthese.repository.ImageExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/image_exercise")
public class ImageExerciseController {

    @Autowired
    private ImageExerciseRepository imageExerciseRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;

    @PostMapping("/upload/{id}")
    public ResponseEntity<ImageExercise> uploadImage(@RequestParam("imageFile") MultipartFile file, @PathVariable("id") String id) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        try {
            Optional<Exercise> exerciseOptional = exerciseRepository.findById(id);
            ImageExercise img = new ImageExercise();
            Optional<ImageExercise> optionalImage = imageExerciseRepository.findByExerciseId(id);
            if (optionalImage.isPresent()) {
                img = optionalImage.get();
                img.setName(file.getOriginalFilename());
                img.setType(file.getContentType());
                img.setPicByte(compressBytes(file.getBytes()));
                img.setExercise(exerciseOptional.get());
            }
            else {
                img = new ImageExercise(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));
                img.setExercise(exerciseOptional.get());
            }
            ImageExercise newImageExercise = imageExerciseRepository.save(img);
            return new ResponseEntity<>(newImageExercise, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = { "/get/{id}" })
    public ResponseEntity<ImageExercise> getImage(@PathVariable("id") String id) throws IOException {
        Optional<ImageExercise> optionalImage = imageExerciseRepository.findByExerciseId(id);

        if (optionalImage.isPresent()) {
            ImageExercise retrievedImageExercise = new ImageExercise(optionalImage.get().getName(), optionalImage.get().getType(),
                                            decompressBytes(optionalImage.get().getPicByte()));
            return new ResponseEntity<>(retrievedImageExercise, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
