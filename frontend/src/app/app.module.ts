import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { HistoryComponent } from './components/history/history.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ExerciseAddComponent } from './components/exercise-add/exercise-add.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    HistoryComponent,
    ExerciseAddComponent,
    ExerciseListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
