import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';

import { Router } from '@angular/router';

import { Day } from 'src/app/models/day.model';
import { DayService } from 'src/app/services/day.service';
import { Workout } from 'src/app/models/workout.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
    @ViewChild('modalContent', { static: true })
    modalContent!: TemplateRef<any>;

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData!: {
      title: string;
      description: string;
      event: CalendarEvent;
    };

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
      
    ];

    activeDayIsOpen: boolean = true;

    days: any;

    constructor(private modal: NgbModal, private router: Router, private dayService: DayService) {}

    async ngOnInit() {
      await this.dayService.getAll()
        .toPromise().then(
          data => {
            this.days = data;
            this.days.forEach(async (element: Day) => {
              await this.addEventDay(element);
            });
          },
          error => {
            console.log(error);
          });
    }

    async addEventDay(element: Day) {

      let workouts = element.workouts;

      console.log(workouts?.length);
      workouts!.forEach(async (element: Workout) => {
        await this.addEventWorkout(element);
      });
    }
    
    addEventWorkout(element: Workout) {
      const offSetUTC = new Date().getTimezoneOffset() * 60000;
  
      let dateString = "" + element.date;
      const date = new Date(dateString);

      
      this.events = [
        ...this.events,
          {
            start: startOfDay(date.getTime() + offSetUTC),
            title: "" + element.title,
            id: "" + element.id,
            meta: {
              description: element.description
            }
          }
      ];
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }

    handleEvent(event: CalendarEvent): void {
      let title = event.title;
      let description = event.meta.description;
      this.modalData = { title, description, event };
      this.modal.open(this.modalContent, { size: 'lg' });
    }

    setView(view: CalendarView) {
      this.view = view;
    }

    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
}