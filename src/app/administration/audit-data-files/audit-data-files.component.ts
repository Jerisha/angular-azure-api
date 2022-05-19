import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { Utils } from 'src/app/_http';
import { AdministrationService } from '../services/administration.service';

@Component({
  selector: 'app-audit-data-files',
  templateUrl: './audit-data-files.component.html',
  styleUrls: ['./audit-data-files.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('collapsed', style({ height: '0px' , width: '0px', padding: '0px', display: 'none', })),
      state('expanded', style({ minHeight: '50px' })),
      transition('expanded => collapsed', animate('225ms ease-in')),
      transition('collapsed => expanded', animate('225ms ease-out')),
    ]),
  ],
})
export class AuditDataFilesComponent{
  isShow: boolean = false;
  showMenu: string = 'expanded';
  btAuditFileDetailsTable!: TableItem;
  dataLiveInSwitchTable!: TableItem;
  tabs: Tab[] = [];
  showDetails: boolean = false;
  btAuditFileDetailsTableDetails: any = [
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'FileName', header: 'File Name', showDefault: true, isImage: false },
    { headerValue: 'CreatedDate', header: 'Created On', showDefault: true, isImage: false },
    { headerValue: 'DownloadFile', header: 'Download File', showDefault: true, isImage: true },

  ]
  
  selectedTab: number = 0;
  currentPage: string = '1';
  queryResult$!: Observable<any>;

  constructor(private service: AdministrationService ) { }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {
    this.isShow = false;
    this.showMenu = 'expanded';
    }
  }

  getFileDetails(fileType: string, isEmitted: boolean) {
    console.log("File Type : " + fileType);
    this.isShow = true;
    this.showMenu = 'collapsed';
    this.queryFetch(fileType, isEmitted);
    if (fileType === 'BTAuditFileDetails') {
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'BT Audit File Details'
        });
      }
        this.btAuditFileDetailsTable = {
          // data: of({datasource:ELEMENT_DATA,
          //   totalrecordcount: 100,
          //   totalpages:1,
          //   pagenumber:1}),
          data: this.queryResult$,
          Columns: this.btAuditFileDetailsTableDetails,
          selectCheckbox: true,
          imgConfig: [{ headerValue: 'DownloadFile', icon: 'save_alt', route: '', tabIndex: 1 }]
        }
    }
    else {
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'Data - Live in Switch Only'
        });
      }
        this.dataLiveInSwitchTable = {
          //  data: of({datasource:ELEMENT_DATA1,
          //   totalrecordcount: 200,
          //   totalpages:2,
          //   pagenumber:1}),
            data: this.queryResult$,
          Columns: this.btAuditFileDetailsTableDetails,
          selectCheckbox: true,
          imgConfig: [{ headerValue: 'DownloadFile', icon: 'save_alt', route: '', tabIndex: 2 }]
        }
    }
    this.showDetails = true;
    this.selectedTab = this.tabs.length;
  }

  btnClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';

  }

  getNextSetRecords(pageIndex: any, tabType: number) {
    debugger;
    this.currentPage = pageIndex;
    // console.log("Tab Type : " +tabType);
    tabType ? this.getFileDetails('LiveSwitchData', true) : this.getFileDetails('BTAuditFileDetails', true);
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
      console.log("Query params" + JSON.stringify(attributes));
      return attributes;
    }

    queryFetch(fileType: string, isEmitted?: boolean)
    {
      debugger;
      this.currentPage = isEmitted ? this.currentPage : '1';
      let request = Utils.preparePyQuery( fileType, 'AuditDataFiles', this.prepareQueryParams(this.currentPage));
      console.log("py request : " + JSON.stringify(request));
      this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
        // console.log("Response data : " + JSON.stringify(res.data.BTAuditFiles));
        if (Object.keys(res).length) {
          let result = {};
          if(fileType == 'BTAuditFileDetails'){
           result = {
            datasource: res.data.BTAuditFiles,
            totalrecordcount: res.TotalCount,
            totalpages: res.NumberOfPages,
            pagenumber: res.PageNumber
          }; //result
          } else {
            result = {
              datasource: res.data.LiveSwitchData,
              totalrecordcount: res.TotalCount,
              totalpages: res.NumberOfPages,
              pagenumber: res.PageNumber
            }; //result
          }// else
          return result;
        } else return {
          datasource: res
        };
      }));
    }

    /* download functionality */
    newTab(tab: any, tabType: number) {

      let downloadLink = document.createElement('a');

      if(tabType)
      {
        downloadLink.download = tab.row.FileName + '.csv';
        downloadLink.href = "../../../assets/dataFiles/LiveInSwitch.csv";
      } else {
        downloadLink.download = tab.row.FileName;
        downloadLink.href = "../../../assets/dataFiles/BTAuditFile.dat";
      }    
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    }
    
}
