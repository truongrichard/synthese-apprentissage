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
      title: string;
      description: string;
      event: CalendarEvent;
    };

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
      
    ];

    activeDayIsOpen: boolean = true;

    tutorials: any;

    constructor(private modal: NgbModal, private router: Router, private tutorialService: TutorialService) {}

    async ngOnInit() {
      await this.tutorialService.getAll()
        .toPromise().then(
          data => {
            this.tutorials = data;
            this.tutorials.forEach(async (element: Tutorial) => {
              await this.addEvent(element);
            });
          },
          error => {
            console.log(error);
          });

    }

    async addEvent(element: Tutorial) {
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
              description: "TESTING"
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
      /*
      console.log(event.id);
      if (event.id != undefined) {
        this.router.navigateByUrl('/tutorials/' + event.id);
      }
      */
    }

    setView(view: CalendarView) {
      this.view = view;
    }

    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
}