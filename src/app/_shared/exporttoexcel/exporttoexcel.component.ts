import { LowerCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  Utils } from 'src/app/_http';
import { exporttoexcelService } from './services/exporttoexcel.service';
import { HttpResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


const myData = [
  {
    ReportName : 'Solicited Errors',
    FileName : 'solicitedErrors_testj_05052020_093030',
    // Filepath: "/opt/SP/osnapp/excel/Audit Data Files_BEEMA_20230103_150427.xlsx",
    Filepath: "/../../assets/dataFiles/dcmTestFile.xlsx",
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

const DCMExportData = {
  "ScreenIdentifier": "ExporttoExcelReport",
  "ReportIdentifier": [
      "Audit Data Files",
      "Solicited Internal Discrepancy Process"
  ],
  "data": {
      "ExportData": [
          {
              "ReportName": "Search View & Extract ",
              "FileName": "Audit Data Files_Test_20230113_150427.xlsx",
              // "Filepath": "/opt/SP/osnapp/excel/Audit Data Files_BEEMA_20230103_150427.xlsx",
              "Filepath": "/../../assets/dataFiles/TestFile.xlsx",
              "Status": "Available",
              "Startdatetime": "13-Jan-2023 15:04:27",
              "Enddatetime": "13-Jan-2023 15:04:27",
              "Createdby": "test@vodafone.com",
              "Duration": "00mins00sec"
          }
      ]
  },
  "Status": {
      "StatusCode": "EUI000",
      "StatusMessage": "Success",
      "MessageType": "Informational"
  }
};

@Component({
  selector: 'app-exporttoexcel',
  templateUrl: './exporttoexcel.component.html',
  styleUrls: ['./exporttoexcel.component.css']
})
export class ExporttoexcelComponent implements OnInit {
  // repIdentifier: string;
  // ExportSummary$: Observable<any>;
  // activeDownloads: string[] = [];
color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 40;
  spinnerSize: number =20;
  constructor(private service: exporttoexcelService,    
    private cdr: ChangeDetectorRef) { }    
    dataSource =new MatTableDataSource<any>()
  exportData : any;
  // FilePath:string='/opt/SP/rpiadmin/workspace/osn2/excel/';
  FilePath:string=''
  reports:any;
  ColumnDetails: any = [
    { header: 'Report Name', headerValue: 'ReportName'},
    { header: 'File Name', headerValue: 'Filepath'},
    { header: 'Created By', headerValue: 'Createdby'},
    { header: 'Status', headerValue: 'Status' },
    { header: 'Start Time', headerValue: 'Startdatetime' },
    { header: 'End Time', headerValue: 'Enddatetime' },
    { header: 'Duration', headerValue: 'Duration' },
   
  ];
  dataColumns = this.ColumnDetails?.map((e:any) => e.headerValue);

  
  ngOnInit(): void {
    //this.exportData = myData;        
    this.refresh();
    this.dataSource.filterPredicate = function (record,filter) {
      return record.ReportName.toLocaleLowerCase().indexOf(filter) == 0;
   }
  }
  //formControlName="reportctl"
  ngOnChanges(changes: SimpleChanges) {
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  refresh(){    
    let request = Utils.preparePyExportSummary();
    //console.log('export2excel',JSON.stringify(request))
    this.dataSource.data = DCMExportData.data.ExportData;
    console.log('Export Data', JSON.stringify(DCMExportData));
    this.reports = [...new Set(DCMExportData.data.ExportData.map((val:any)=> val.ReportName))]
    // this.service.queryDetails(request).subscribe(x => {     
    //    console.log(JSON.stringify(x),'res')
    //   if (x.Status.StatusMessage === 'Success' || x.Status.StatusCode ==='EUI000') {
    //     this.dataSource.data =x.data.ExportData
    //     this.reports = [...new Set(x.data.ExportData.map((val:any)=> val.ReportName))]
    //   }
    //   else {
    //     console.log(x,'Export request Error Response')
    //   }
    // },       
    // (error: any) => { 

    // },
    // ()=>{
    // });
    
  }

  filterReportWise(filterValue: any) {  
    //debugger
    if(filterValue != undefined)
    { 
    this.dataSource.filter = filterValue.value.toLocaleLowerCase() != "all"?filterValue.value.toLocaleLowerCase():'';
    }
  }  
  
  downloadFile(FileFullPath:string) {
    // debugger
    // FileFullPath ='TelephoneRangeReports_BEEMA_20220613_101009.xlsx'
    let data = "This is sample download file for DCM";
    let type =  'application/vnd.ms-excel';
    let response = new Blob([data]);
    this.service.blob2File(response,type,FileFullPath.substring(FileFullPath.lastIndexOf('/')+1))
  //   let request = Utils.preparePydownloadFile(FileFullPath);
  //   this.service.downloadFileDetails(request).subscribe((response: any) => {     
  //     if (response.ok) {        
  //      let type =  'application/vnd.ms-excel'
  //         this.service.blob2File(response,type,FileFullPath.substring(FileFullPath.lastIndexOf('/')+1))
  //     }
  //     else {
  //       console.log(response,'Download File request Error Response'); 
  //     }         
  //  },       
  //  (error: any) => {
  //  },
  //  ()=>{
  //  });
   
    
  }

  
}
