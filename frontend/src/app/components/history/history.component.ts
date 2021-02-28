import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';

import { Router } from '@angular/router';

import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

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
      action: string;
      event: CalendarEvent;
    };

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
      {
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        color: colors.red,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
        color: colors.yellow,
      },
      {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue,
        allDay: true,
      },
      {
        start: addHours(startOfDay(new Date()), 2),
        end: addHours(new Date(), 2),
        title: 'A draggable and resizable event',
        color: colors.yellow,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
    ];

    activeDayIsOpen: boolean = true;

    tutorials?: Tutorial[];

    constructor(private modal: NgbModal, private router: Router, private tutorialService: TutorialService) {}

    ngOnInit() {
      this.retrieveTutorials();
    }
  
    retrieveTutorials() {
      this.tutorialService.getAll()
        .subscribe(
          data => {
            this.tutorials = data;
            this.someBullshit(this.tutorials);
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

    someBullshit(tutorials: Tutorial[]){
      console.log(tutorials);
      
      if (tutorials == null) {
        console.log('Instance is null or undefined');
      } else {
          console.log(this.tutorials!);
          tutorials!.forEach(element => {
              this.addEvent(element);
          });
      }
    }

    addEvent(element: Tutorial) {
      const offSetUTC = new Date().getTimezoneOffset() * 60000;
  
      let dateString = "" + element.date;
      const date = new Date(dateString);
      
      this.events = [
        ...this.events,
          {
            start: startOfDay(date.getTime() + offSetUTC),
            title: "" + element.title,
            id: "" + element.id,
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

    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
      //this.modalData = { event, action };
      //this.modal.open(this.modalContent, { size: 'lg' });
      console.log(event.id);
      if (event.id != undefined) {
        this.router.navigateByUrl('/tutorials/' + event.id);
      }
    }

    setView(view: CalendarView) {
      this.view = view;
    }

    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
}