import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDetails } from '../uicomponents/models/table-item';
import { Utils } from '../_http';
import { DocumentAreaService } from './services/documentarea.service';

@Component({
  selector: 'app-document-area',
  templateUrl: './document-area.component.html',
  styleUrls: ['./document-area.component.css']
})
export class DocumentAreaComponent implements OnInit {

  reportIdentifier = 'DocumentName';
  subreportName = 'DocumentMenu'
  menuGroup: string[];
  panelOpenState1: boolean = false;
  step: number = 2;
  menuBind: any | undefined = [];

  dataSource = new MatTableDataSource<any>()
  constructor(private service: DocumentAreaService) { }

  columnDetails: ColumnDetails[] = [
    
    { header: 'Menu Group', headerValue: 'menugroup', showDefault: true, isImage: false },
    { header: 'Document name', headerValue: 'docname', showDefault: true, isImage: false },
    { header: 'Download', headerValue: 'docpath', showDefault: true, isImage: true },

    // { header: 'Child Cupid', headerValue: 'ChildCupId', showDefault: true, isImage: false }
  ];

  dataColumns = this.columnDetails.map(x => x.headerValue)
  ngOnInit(): void {
    let request = Utils.preparePyUIQueryDoc(this.reportIdentifier, this.subreportName)

    this.service.queryDetails(request).subscribe((x: any) => {

      const menus = x.Data.map((e: any) => e.menugroup);
      this.menuGroup = [...new Set(menus)] as string[];


      this.menuGroup.forEach((m: string, index) => {
        let group = x.Data.filter((e: any) => e.menugroup === m)
        this.menuBind.push({ key: m, menuItems: group });
      })
      // console.log(menus)
      // console.log(this.menuBind)
    });
  }

  downloadFile(FileFullPath: string) {
    debugger
    // FileFullPath ='TelephoneRangeReports_BEEMA_20220613_101009.xlsx'
    let request = Utils.preparePydownloadFile(FileFullPath);
    //console.log(request,'download Request')
    this.service.downloadFileDetails(request).subscribe((response: any) => {
      //console.log(response,'res')
      if (response.ok) {
        let type = response.body.type
        //  let type =  'application/vnd.ms-excel'
        // console.log(type,'type')
        this.service.blob2File(response, type, FileFullPath.substring(FileFullPath.lastIndexOf('/') + 1))
      }
      else {
        console.log(response, 'Download File request Error Response')
      }
    },
      (error: any) => {
        //  console.log(error,'Download File API Function')  

      },
      () => {
        // console.log('Download File API Completed','Download File API Function')
      });


  }

  setStep(index: number) {
    this.step = index;
  }

}
