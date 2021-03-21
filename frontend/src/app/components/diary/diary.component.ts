import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { DayService } from 'src/app/services/day.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DiaryComponent implements OnInit {
  allDays?: Day[];
  days?: Day[];
  currentDay?: Day;
  currentIndex = -1;

  constructor(private dayService: DayService) { }

  ngOnInit(): void {
    this.retrieveAllDays();
  }

  retrieveAllDays(): void {
    this.dayService.getAll()
      .subscribe(
        data => {
          this.allDays = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  convert(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  startDate: Date = new Date();

  searchFor() {
    console.log(this.startDate.toString());
    console.log(this.convert(this.startDate.toString()));
    this.dayService.findByDate(this.convert(this.startDate.toString()))
      .subscribe(
        data => {
          this.days = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  };

  setActiveDay(day: Day, index: number): void {
    this.currentDay = day;
    this.currentIndex = index;
  }

  dateClass = (d: Date) => {
    const dateSearch = this.convert(d.toString());
    if (this.allDays) {
      return this.allDays.find(f => f.date == dateSearch) ? "example-custom-date-class": "";
    }
    return "";
  };
}
