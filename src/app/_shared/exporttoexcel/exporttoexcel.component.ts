import { Component, OnInit } from '@angular/core';

const myData = [
  {
    ReportName : 'Solicited Errors',
    FileName : 'solicitedErrors_testj_05052020_093030',
    CreatedBy : 'test.xxxxx@vodafone.com',
    Status : 'Available',
    StartTime : '05-May-2022 09:30:30',
    EndTime : '05-May-2022 09:40:30',
    Duration : '10'
  },
  {
    ReportName : 'UnSolicited Errors',
    FileName : 'UnsolicitedErrors_testj_05052020_093030',
    CreatedBy : 'test.xxxxx@vodafone.com',
    Status : 'Available',
    StartTime : '05-May-2022 09:30:30',
    EndTime : '05-May-2022 09:40:30',
    Duration : '10'
  },
  {
    ReportName : 'Solicited Errors',
    FileName : 'solicitedErrors_testj_05052020_093030',
    CreatedBy : 'test.xxxxx@vodafone.com',
    Status : 'Available',
    StartTime : '05-May-2022 09:30:30',
    EndTime : '05-May-2022 09:40:30',
    Duration : '10'
  },
  {
    ReportName : 'Solicited Errors',
    FileName : 'solicitedErrors_testj_05052020_093030',
    CreatedBy : 'test.xxxxx@vodafone.com',
    Status : 'Available',
    StartTime : '05-May-2022 09:30:30',
    EndTime : '05-May-2022 09:40:30',
    Duration : '10'
  },
  {
    ReportName : 'Solicited Errors',
    FileName : 'unsolicitedErrors_testj_05052020_093030',
    CreatedBy : 'test.xxxxx@vodafone.com',
    Status : 'Available',
    StartTime : '05-May-2022 09:30:30',
    EndTime : '05-May-2022 09:40:30',
    Duration : '10'
  },
]
@Component({
  selector: 'app-exporttoexcel',
  templateUrl: './exporttoexcel.component.html',
  styleUrls: ['./exporttoexcel.component.css']
})
export class ExporttoexcelComponent implements OnInit {

  constructor() { }

  exportData : any;
  ColumnDetails: any = [
    { header: 'Report Name', headerValue: 'ReportName'},
    { header: 'File Name', headerValue: 'FileName'},
    { header: 'Created By', headerValue: 'CreatedBy'},
    { header: 'Status', headerValue: 'Status' },
    { header: 'Start Time', headerValue: 'StartTime' },
    { header: 'End Time', headerValue: 'EndTime' },
    { header: 'Duration', headerValue: 'Duration' },
   
  ];
  dataColumns = this.ColumnDetails?.map((e:any) => e.headerValue);
  ngOnInit(): void {
    this.exportData = myData;
  }

}
