package com.synthese.service;

import com.synthese.model.Exercise;
import com.synthese.repository.ExerciseRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class ExerciseServiceTest {

    @Autowired
    private ExerciseService exerciseService;

    @MockBean
    private ExerciseRepository exerciseRepository;

    Exercise mockExercise1;
    Exercise mockExercise2;
    Exercise mockExercise3;

    @BeforeEach
    void setUp() {
        mockExercise1 = new Exercise();
        mockExercise1.setId("1l");
        mockExercise1.setTitle("title1");
        exerciseRepository.save(mockExercise1);

        mockExercise2 = new Exercise();
        mockExercise2.setId("2l");
        mockExercise2.setTitle("title2");
        exerciseRepository.save(mockExercise2);

        mockExercise3 = new Exercise();
        mockExercise3.setId("3l");
        mockExercise3.setTitle("title3");
    }

    @Test
    void getAll() {
        // Arrange
        doReturn(Arrays.asList(mockExercise1, mockExercise2)).when(exerciseRepository).findAll();
        // Act
        ResponseEntity<List<Exercise>> exercises = exerciseService.getAll(null);
        // Assert
        Assertions.assertNotNull(exercises.getBody());
        Assertions.assertEquals(HttpStatus.OK, exercises.getStatusCode());
        Assertions.assertEquals(2, exercises.getBody().size());
    }

    @Test
    void getAllTitleFound() {
        // Arrange
        when(exerciseRepository.findByTitleContainingIgnoreCase(mockExercise1.getTitle())).thenReturn(Collections.singletonList(mockExercise1));
        doReturn(Arrays.asList(mockExercise1, mockExercise2)).when(exerciseRepository).findAll();
        // Act
        ResponseEntity<List<Exercise>> exercises = exerciseService.getAll(mockExercise1.getTitle());
        // Assert
        Assertions.assertNotNull(exercises.getBody());
        Assertions.assertEquals(HttpStatus.OK, exercises.getStatusCode());
        Assertions.assertEquals(1, exercises.getBody().size());
    }

    @Test
    void getAllTitleNotFound() {
        // Arrange
        List<Exercise> emptyList = new ArrayList<>();
        when(exerciseRepository.findByTitleContainingIgnoreCase("nada")).thenReturn(emptyList);
        doReturn(Arrays.asList("")).when(exerciseRepository).findAll();
        // Act
        ResponseEntity<List<Exercise>> exercises = exerciseService.getAll("nada");
        // Assert
        Assertions.assertNull(exercises.getBody());
        Assertions.assertEquals(HttpStatus.NO_CONTENT, exercises.getStatusCode());
    }


    @Test
    void getById() {
        // Arrange
        doReturn(Optional.of(mockExercise1)).when(exerciseRepository).findById(mockExercise1.getId());
        // Act
        ResponseEntity<Exercise> exercise = exerciseService.getById(mockExercise1.getId());
        // Assert
        Assertions.assertNotNull(exercise.getBody());
        Assertions.assertEquals(HttpStatus.OK, exercise.getStatusCode());
        Assertions.assertEquals(mockExercise1.getId(), exercise.getBody().getId());
    }

    @Test
    void getByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(exerciseRepository).findById("100l");
        // Act
        ResponseEntity<Exercise> exercise = exerciseService.getById("100l");
        // Assert
        Assertions.assertNull(exercise.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, exercise.getStatusCode());
    }

    @Test
    void create() {
        // Arrange
        when(exerciseRepository.save(mockExercise3)).thenReturn(mockExercise3);
        doReturn(mockExercise3).when(exerciseRepository).save(any());
        // Act
        ResponseEntity<Exercise> exercise = exerciseService.create(mockExercise3);
        // Assert
        Assertions.assertNotNull(exercise);
        Assertions.assertEquals(HttpStatus.CREATED, exercise.getStatusCode());
        Assertions.assertEquals(mockExercise3.getTitle(), exercise.getBody().getTitle());
    }

    @Test
    void delete() {

        exerciseService.delete(mockExercise1.getId());

        verify(exerciseRepository, times(1)).deleteById(eq(mockExercise1.getId()));
    }
}