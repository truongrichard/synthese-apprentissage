package com.synthese.service;

import com.synthese.model.Day;
import com.synthese.repository.DayRepository;
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

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class DayServiceTest {

    @Autowired
    private DayService dayService;

    @MockBean
    private DayRepository dayRepository;

    Day mockDay1;
    Day mockDay2;
    Day mockDay3;

    @BeforeEach
    void setUp() {
        mockDay1 = new Day();
        mockDay1.setId("1l");
        mockDay1.setDate(LocalDate.now());
        dayRepository.save(mockDay1);

        mockDay2 = new Day();
        mockDay2.setId("2l");
        mockDay1.setDate(LocalDate.now().plusDays(1));
        dayRepository.save(mockDay2);

        mockDay3 = new Day();
        mockDay3.setId("3l");
        mockDay1.setDate(LocalDate.now().plusDays(3));
    }

    @Test
    void getAll() {
        // Arrange
        doReturn(Arrays.asList(mockDay1, mockDay2)).when(dayRepository).findAll();
        // Act
        ResponseEntity<List<Day>> days = dayService.getAll(null);
        // Assert
        Assertions.assertNotNull(days.getBody());
        Assertions.assertEquals(HttpStatus.OK, days.getStatusCode());
        Assertions.assertEquals(2, days.getBody().size());
    }

    @Test
    void getAllDateFound() {
        // Arrange
        when(dayRepository.findByDateEquals(mockDay1.getDate())).thenReturn(Collections.singletonList(mockDay1));
        doReturn(Arrays.asList(mockDay1, mockDay2)).when(dayRepository).findAll();
        // Act
        ResponseEntity<List<Day>> days = dayService.getAll(mockDay1.getDate().toString());
        // Assert
        Assertions.assertNotNull(days.getBody());
        Assertions.assertEquals(HttpStatus.OK, days.getStatusCode());
        Assertions.assertEquals(1, days.getBody().size());
    }

    @Test
    void getAllDateNotFound() {
        // Arrange
        List<Day> emptyList = new ArrayList<>();
        when(dayRepository.findByDateEquals(LocalDate.now().minusDays(1))).thenReturn(emptyList);
        doReturn(Arrays.asList("")).when(dayRepository).findAll();
        // Act
        ResponseEntity<List<Day>> days = dayService.getAll(LocalDate.now().minusDays(1).toString());
        // Assert
        Assertions.assertNull(days.getBody());
        Assertions.assertEquals(HttpStatus.NO_CONTENT, days.getStatusCode());
    }


    @Test
    void getById() {
        // Arrange
        doReturn(Optional.of(mockDay1)).when(dayRepository).findById(mockDay1.getId());
        // Act
        ResponseEntity<Day> day = dayService.getById(mockDay1.getId());
        // Assert
        Assertions.assertNotNull(day.getBody());
        Assertions.assertEquals(HttpStatus.OK, day.getStatusCode());
        Assertions.assertEquals(mockDay1.getId(), day.getBody().getId());
    }

    @Test
    void getByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(dayRepository).findById("100l");
        // Act
        ResponseEntity<Day> day = dayService.getById("100l");
        // Assert
        Assertions.assertNull(day.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, day.getStatusCode());
    }

    @Test
    void create() {
        // Arrange
        when(dayRepository.save(mockDay3)).thenReturn(mockDay3);
        doReturn(mockDay3).when(dayRepository).save(any());
        // Act
        ResponseEntity<Day> day = dayService.create(mockDay3);
        // Assert
        Assertions.assertNotNull(day);
        Assertions.assertEquals(HttpStatus.CREATED, day.getStatusCode());
        Assertions.assertEquals(mockDay3.getDate(), day.getBody().getDate());
    }

    @Test
    void delete() {

        dayService.delete(mockDay1.getId());

        verify(dayRepository, times(1)).deleteById(eq(mockDay1.getId()));
    }
}