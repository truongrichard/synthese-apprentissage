package com.synthese.service;

import com.synthese.model.Exercise;
import com.synthese.model.ImageExercise;
import com.synthese.repository.ExerciseRepository;
import com.synthese.repository.ImageExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class ImageExerciseService {

    @Autowired
    private ImageExerciseRepository imageExerciseRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    public ImageExerciseService(ImageExerciseRepository imageExerciseRepository, ExerciseRepository exerciseRepository){
        this.imageExerciseRepository = imageExerciseRepository;
        this.exerciseRepository = exerciseRepository;
    }

    public ResponseEntity<ImageExercise> uploadImage(MultipartFile file, String id) {
        try {
            ImageExercise img;
            Optional<Exercise> exerciseOptional = exerciseRepository.findById(id);
            Optional<ImageExercise> optionalImage = imageExerciseRepository.findByExerciseId(id);

            if (optionalImage.isPresent()) {
                img = optionalImage.get();
                img.setName(file.getOriginalFilename());
                img.setType(file.getContentType());
                img.setPicByte(compressBytesBeforeStoringDB(file.getBytes()));
                img.setExercise(exerciseOptional.get());
            }
            else {
                img = new ImageExercise(file.getOriginalFilename(), file.getContentType(), compressBytesBeforeStoringDB(file.getBytes()));
                img.setExercise(exerciseOptional.get());
            }

            ImageExercise newImageExercise = imageExerciseRepository.save(img);
            return new ResponseEntity<>(newImageExercise, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static byte[] compressBytesBeforeStoringDB(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!deflater.finished()) {
                int count = deflater.deflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException e) {
        }
        return outputStream.toByteArray();
    }

    public ResponseEntity<ImageExercise> getImage(String id) throws IOException {
        Optional<ImageExercise> optionalImage = imageExerciseRepository.findByExerciseId(id);

        if (optionalImage.isPresent()) {
            ImageExercise retrievedImageExercise = new ImageExercise(optionalImage.get().getName(), optionalImage.get().getType(),
                    decompressBytesBeforeStoringDB(optionalImage.get().getPicByte()));
            return new ResponseEntity<>(retrievedImageExercise, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    public static byte[] decompressBytesBeforeStoringDB(byte[] data) {
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

    public ResponseEntity<HttpStatus> deleteByExerciseId(String id) {
        try {
            Optional<ImageExercise> optionalImage = imageExerciseRepository.findByExerciseId(id);
            if (optionalImage.isPresent()) {
                imageExerciseRepository.deleteById(optionalImage.get().getId());
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
