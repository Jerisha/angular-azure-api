import { LowerCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  Utils } from 'src/app/_http';
import { exporttoexcelService } from './services/exporttoexcel.service';
import { HttpResponse } from '@angular/common/http';


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
  // repIdentifier: string;
  // ExportSummary$: Observable<any>;

  constructor(private service: exporttoexcelService,    
    private cdr: ChangeDetectorRef) { }    
    dataSource =new MatTableDataSource<any>()
  exportData : any;
  // FilePath:string='/opt/SP/rpiadmin/workspace/osn2/excel/';
  FilePath:string=''
  reports:any;
  ColumnDetails: any = [
    { header: 'Report Name', headerValue: 'ReportName'},
    { header: 'File Name', headerValue: 'FileName'},
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
    this.service.queryDetails(request).subscribe(x => {     
       //console.log(x,'res')
      if (x.Status.StatusMessage === 'Success' || x.Status.StatusCode ==='EUI000') {
        this.dataSource.data =x.data.ExportData
        // this.exportData = x.data.ExportData
        this.reports = [...new Set(x.data.ExportData.map((val:any)=> val.ReportName))]
        //this.FilePath =this.exportData[0].Filepath
      }
      else {
        console.log(x,'Export request Error Response')
      }
    },       
    (error: any) => {
      //  console.log(error,'Export Sumary API Function')  

    },
    ()=>{
      // console.log('Export Sumary API Completed','Export Sumary API Function')
    });
    
  }

  filterReportWise(filterValue: any) {  
    //debugger
    if(filterValue != undefined)
    { 
    this.dataSource.filter = filterValue.value.toLocaleLowerCase() != "all"?filterValue.value.toLocaleLowerCase():'';
    }
  }  
  
  downloadFile(FileFullPath:string) {
    debugger
    // FileFullPath ='TelephoneRangeReports_BEEMA_20220613_101009.xlsx'
    let request = Utils.preparePydownloadFile('/opt/SP/rpiadmin/workspace/osn2/excel/'+FileFullPath);
    console.log(request,'download Request')
    this.service.downloadFileDetails(request).subscribe((response: HttpResponse<any>) => {     
      console.log(response,'res')
      if (response.ok) {        
        let type =  response.type.toString() //'application/vnd.ms-excel'
          this.service.blob2File(response,type,FileFullPath)
      }
      else {
        console.log(response,'Download File request Error Response')
      }         
   },       
   (error: any) => {
     //  console.log(error,'Download File API Function')  

   },
   ()=>{
     // console.log('Download File API Completed','Download File API Function')
   });
   
    
  }

  
}
