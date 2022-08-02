import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  ngOnInit(): void {
    let request = Utils.preparePyUIQueryDoc(this.reportIdentifier, this.subreportName)
    this.service.queryDetails(request).subscribe((x: any) => {

      const menus = x.Data.map((e: any) => e.menugroup);
      this.menuGroup = [...new Set(menus)] as string[];


      this.menuGroup.forEach((m: string, index) => {
        let group = x.Data.filter((e: any) => e.menugroup === m)
        this.menuBind.push({ key: m, menuItems: group });
      })
      console.log(menus)
      console.log(this.menuBind)
    });
  }

  setStep(index: number) {
    this.step = index;
  }

}
