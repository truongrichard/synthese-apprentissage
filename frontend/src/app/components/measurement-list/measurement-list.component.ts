import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Measurement } from 'src/app/models/measurement.model';
import { MeasurementService } from 'src/app/services/measurement.service';
import { MeasurementAddComponent } from '../measurement-add/measurement-add.component';

import { Category } from 'src/app/models/measurement.model';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class MeasurementListComponent implements OnInit {

  measurements?: Measurement[];
  isPopupOpened = true;
  selectedCategory = '';

  public categories = Object.values(Category);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private dialog: MatDialog, private measurementService: MeasurementService,) { }

  ngOnInit(): void {
    this.retrieveMeasurements(); 
  }

  onCategoryChanged() {
    this.retrieveMeasurements();
    this.changeLineChartData();
    this.addMinAndMaxInLineChart(this.measurements);
    (<any>this.chart).refresh()
  }
  
  get sortData() {
    if (this.measurements){
      let selectedMesurmentsByCategory = this.measurements.filter(f => f.category == this.selectedCategory);
      return this.sortMeasurementsByDate(selectedMesurmentsByCategory)
    } 
  }

  retrieveMeasurements(): void {
    this.measurementService.getAll()
      .subscribe(
        data => {
          this.measurements = data;
        },
        error => {
          console.log(error);
        });
  }

  changeLineChartData() {
    if (this.measurements) {
      let selectedMesurmentsByCategory = this.sortDataByDate(this.measurements);
      this.insertMeasurementsInLineChart(selectedMesurmentsByCategory);
    }
  }

  addMeasurement() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MeasurementAddComponent, {
      data: { category: this.selectedCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.retrieveMeasurements();
      this.updateLineChart();
    });
  }

  editMeasurement(id: any) {
    this.isPopupOpened = true;
    let measurement = this.getMeasurement(id)[0];
    const dialogRef = this.dialog.open(MeasurementAddComponent, {
      data: measurement
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.updateLineChart();
      this.retrieveMeasurements();
    });
  }

  getMeasurement(id?: string) {
    if (this.measurements) 
      return this.measurements.filter(x => x.id === id);
    return "";
  }

  deleteMeasurement(id?: any) {
    this.measurementService.delete(id!)
      .subscribe(
        response => {
          this.updateLineChart();
          this.retrieveMeasurements();
        },
        error => {
          console.log(error);
        });
  }

  updateLineChart() {
    this.measurementService.getAll()
      .subscribe(
        data => {
          if (data) {
            let selectedMesurmentsByCategory = this.sortDataByDate(data);
            this.insertMeasurementsInLineChart(selectedMesurmentsByCategory);
          }
        },
        error => {
          console.log(error);
    });
  }

  private sortDataByDate(data: Measurement[]) {
    let selectedMesurmentsByCategory = data.filter(f => f.category == this.selectedCategory);
    if (selectedMesurmentsByCategory.length == 0) {
      this.lineChartData = [{ data: [] }];
      this.measurements = selectedMesurmentsByCategory;
    }
    else {
      return this.sortMeasurementsByDate(selectedMesurmentsByCategory);
    }
    return selectedMesurmentsByCategory;
  }

  private sortMeasurementsByDate(measurementsData: Measurement[]) {
    return measurementsData.sort((a, b) => {
      return <any>new Date(a.date) - <any>new Date(b.date);
    });
  }

  private insertMeasurementsInLineChart(measurementsData: Measurement[]) {
    this.lineChartData = [ { data: [ ] } ];
    this.addMinAndMaxInLineChart(measurementsData);
    for (let index = 0; index < measurementsData.length; index++) {
      this.lineChartData[0].data[index] = { x: this.addOffsetUTC(measurementsData, index), y: measurementsData[index].value };
    }
  }

  private addMinAndMaxInLineChart(measurementsData: Measurement[]) {
    if (measurementsData.length > 0) {
      let yAxesMin = Math.min.apply(Math, measurementsData.map(function (o) { return o.value; }));
      let yAxesMax = Math.max.apply(Math, measurementsData.map(function (o) { return o.value; }));
      this.lineChartOptions.scales.yAxes[0].ticks.suggestedMin = (yAxesMin - 10);
      this.lineChartOptions.scales.yAxes[0].ticks.suggestedMax = (yAxesMax + 10);
    }
  }

  private addOffsetUTC(measurementsData: Measurement[], index: number) {
    var dateUTC = new Date(measurementsData[index].date);
    return dateUTC.setTime(dateUTC.getTime() + dateUTC.getTimezoneOffset() * 60 * 1000);
  }

  public lineChartData: ChartDataSets[] = [ { data: [ ] } ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
            'year': 'MMM DD',
          },
          unit: 'week',
        }
      }],
      yAxes: [{
        ticks: {
        }
      }]
    }
  };

  public lineChartPlugins = [];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
}