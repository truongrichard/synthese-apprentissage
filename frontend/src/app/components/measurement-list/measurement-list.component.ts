import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Measurement } from 'src/app/models/measurement.model';
import { MeasurementService } from 'src/app/services/measurement.service';
import { MeasurementAddComponent } from '../measurement-add/measurement-add.component';

import { Category } from 'src/app/models/measurement.model';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class MeasurementListComponent implements OnInit {

  offSetUTC = new Date().getTimezoneOffset() * 60000;

  measurements?: Measurement[];
  isPopupOpened = true;
  selectedCategory = '';

  public categories = Object.values(Category);

  constructor(private dialog: MatDialog, private measurementService: MeasurementService,) { }

  ngOnInit(): void {
    this.retrieveMeasurements();
  }

  onCategoryChanged() {
    this.retrieveMeasurements();
    this.insertMeasurementsInChart();
  }
  
  get sortData() {

    if (this.measurements){
      const selectedMesurmentsByCategory = this.measurements.filter(f => f.category == this.selectedCategory);
      if (selectedMesurmentsByCategory.length == 0) {
        this.lineChartData = [ { data: [ ] } ];
      }
      return selectedMesurmentsByCategory.sort((a, b) => {
        return <any>new Date(a.date) - <any>new Date(b.date);
      });
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

  insertMeasurementsInChart() {
    //console.log(this.measurements);
    if (this.measurements) {
      const selectedMesurmentsByCategory = this.measurements.filter(f => f.category == this.selectedCategory);
      if (selectedMesurmentsByCategory.length == 0) {
        this.lineChartData = [ { data: [ ] } ];
        this.measurements = selectedMesurmentsByCategory;
      }
      else{
        selectedMesurmentsByCategory.sort((a, b) => {
          return <any>new Date(a.date) - <any>new Date(b.date);
        });
      }
      //console.log(selectedMesurmentsByCategory);
      this.lineChartData = [ { data: [ ] } ];
      for (let index = 0; index < selectedMesurmentsByCategory.length; index++) {
        
        var dateUTC = new Date(selectedMesurmentsByCategory[index].date);
        dateUTC.setTime(dateUTC.getTime() + dateUTC.getTimezoneOffset() * 60 * 1000);

        this.lineChartData[0].data[index] = { x: new Date(dateUTC), y: selectedMesurmentsByCategory[index].value };
      }
    }
  }

  addMeasurement() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MeasurementAddComponent, {
      data: { category: this.selectedCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.updateLineChart();
      this.retrieveMeasurements();
    });
  }

  // WIP
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
    if (this.measurements) {
      return this.measurements.filter(x => x.id === id);
    }
    else{
      return "";
    }
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

  // WIP
  updateLineChart() {
    this.measurementService.getAll()
      .subscribe(
        data => {
          if (data) {
            
            //console.log(data);
            const selectedMesurmentsByCategory = data.filter(f => f.category == this.selectedCategory);
            if (selectedMesurmentsByCategory.length == 0) {
              this.lineChartData = [ { data: [ ] } ];
              this.measurements = selectedMesurmentsByCategory;
            }

            selectedMesurmentsByCategory.sort((a, b) => {
              return <any>new Date(a.date) - <any>new Date(b.date);
            });

            //console.log(selectedMesurmentsByCategory);
            this.lineChartData = [ { data: [ ] } ];

            for (let index = 0; index < selectedMesurmentsByCategory.length; index++) {

              var dateUTC = new Date(selectedMesurmentsByCategory[index].date);
              dateUTC.setTime(dateUTC.getTime() + dateUTC.getTimezoneOffset() * 60 * 1000);

              this.lineChartData[0].data[index] = { x: new Date(dateUTC), y: selectedMesurmentsByCategory[index].value };
            }
          }
        },
        error => {
          console.log(error);
    });
  }

  public lineChartData: ChartDataSets[] = [
    { data: [ ] }
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
          	'millisecond': 'MMM DD',
            'second': 'MMM DD',
            'minute': 'MMM DD',
            'hour': 'MMM DD',
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
            'quarter': 'MMM DD',
            'year': 'MMM DD',
          },
          unit: 'week',
        }
      }],
    }
  };

  public lineChartPlugins = [];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
}