package com.synthese.service;

import com.synthese.model.Exercise;
import com.synthese.model.ExerciseSet;
import com.synthese.model.Workout;
import com.synthese.repository.ExerciseSetRepository;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;


@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class ExerciseSetServiceTest {

    @Autowired
    private ExerciseSetService exerciseSetService;

    @MockBean
    private ExerciseSetRepository exerciseSetRepository;

    ExerciseSet mockExercise1;
    ExerciseSet mockExercise2;
    ExerciseSet mockExercise3;
    Workout mockWorkout1;

    @BeforeEach
    void setUp() {
        mockWorkout1 = new Workout();
        mockWorkout1.setId("1l");

        mockExercise1 = new ExerciseSet();
        mockExercise1.setId("1l");
        mockExercise1.setWorkout(mockWorkout1);
        exerciseSetRepository.save(mockExercise1);

        mockExercise2 = new ExerciseSet();
        mockExercise2.setId("2l");
        mockExercise2.setWorkout(mockWorkout1);
        exerciseSetRepository.save(mockExercise2);

        mockExercise3 = new ExerciseSet();
        mockExercise3.setId("3l");
        mockExercise3.setWorkout(mockWorkout1);
    }

    @Test
    void getAll() {
        // Arrange
        doReturn(Arrays.asList(mockExercise1, mockExercise2)).when(exerciseSetRepository).findAll();
        // Act
        ResponseEntity<List<ExerciseSet>> exerciseSets = exerciseSetService.getAll();
        // Assert
        Assertions.assertNotNull(exerciseSets.getBody());
        Assertions.assertEquals(HttpStatus.OK, exerciseSets.getStatusCode());
        Assertions.assertEquals(2, exerciseSets.getBody().size());
    }

    @Test
    void getById() {
        // Arrange
        doReturn(Optional.of(mockExercise1)).when(exerciseSetRepository).findById(mockExercise1.getId());
        // Act
        ResponseEntity<ExerciseSet> exerciseSet = exerciseSetService.getById(mockExercise1.getId());
        // Assert
        Assertions.assertNotNull(exerciseSet.getBody());
        Assertions.assertEquals(HttpStatus.OK, exerciseSet.getStatusCode());
        Assertions.assertEquals(mockExercise1.getId(), exerciseSet.getBody().getId());
    }

    @Test
    void getByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(exerciseSetRepository).findById("100l");
        // Act
        ResponseEntity<ExerciseSet> exerciseSet = exerciseSetService.getById("100l");
        // Assert
        Assertions.assertNull(exerciseSet.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, exerciseSet.getStatusCode());
    }

    @Test
    void create() {
        // Arrange
        when(exerciseSetRepository.save(mockExercise3)).thenReturn(mockExercise3);
        doReturn(mockExercise3).when(exerciseSetRepository).save(any());
        // Act
        ResponseEntity<ExerciseSet> exerciseSet = exerciseSetService.create(mockExercise3);
        // Assert
        Assertions.assertNotNull(exerciseSet);
        Assertions.assertEquals(HttpStatus.CREATED, exerciseSet.getStatusCode());
        Assertions.assertEquals(mockExercise3.getId(), exerciseSet.getBody().getId());
    }

    @Test
    void delete() {

        exerciseSetService.delete(mockExercise1.getId());

        verify(exerciseSetRepository, times(1)).deleteById(eq(mockExercise1.getId()));
    }

    @Test
    void getExerciseSetsByWorkoutId() {
        // Arrange
        doReturn(Arrays.asList(mockExercise3)).when(exerciseSetRepository).findAllByWorkoutId(mockWorkout1.getId());
        // Act
        ResponseEntity<List<ExerciseSet>> exerciseSet = exerciseSetService.getExerciseSetsByWorkoutId(mockWorkout1.getId());
        // Assert
        Assertions.assertNotNull(exerciseSet.getBody());
        Assertions.assertEquals(HttpStatus.OK, exerciseSet.getStatusCode());
        Assertions.assertEquals(mockExercise3.getId(), exerciseSet.getBody().get(0).getId());
    }

    @Test
    void getExerciseSetsByWorkoutIdNotFound() {
        // Arrange
        List<Exercise> emptyList = new ArrayList<>();
        doReturn(emptyList).when(exerciseSetRepository).findAllByWorkoutId("nada");
        // Act
        ResponseEntity<List<ExerciseSet>> exerciseSet = exerciseSetService.getExerciseSetsByWorkoutId("nada");
        // Assert
        Assertions.assertNull(exerciseSet.getBody());
        Assertions.assertEquals(HttpStatus.NO_CONTENT, exerciseSet.getStatusCode());
    }
}