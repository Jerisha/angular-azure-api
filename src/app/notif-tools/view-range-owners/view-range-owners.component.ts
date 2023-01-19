import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-range-owners',
  templateUrl: './view-range-owners.component.html',
  styleUrls: ['./view-range-owners.component.css']
})
export class ViewRangeOwnersComponent implements OnInit {
  showAddEditblock = false;
  displayedColumns: string[] = ['select', 'ownerName', 'ownerType', 'trunkType', 'directDialMobile'];
  dataSource = [
    {ownerName: 'Vodafone Ltd (C&W)', ownerType: 'VF', trunkType: '', directDialMobile: 'fm16'},
    {ownerName: 'Vodafone Ltd (Energis)', ownerType: 'VF', trunkType: '', directDialMobile: ''},
    {ownerName: 'Vodafone Ltd (Thus)', ownerType: 'VF', trunkType: '', directDialMobile: ''},
    {ownerName: 'Vodafone Ltd (YC)', ownerType: 'VF', trunkType: '', directDialMobile: ''},
    {ownerName: 'BT', ownerType: 'BT', trunkType: '', directDialMobile: 'f'},
  ];
  length = 5;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;
  blockName: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showAddEditRangeOwner (block : any) {
    if (block === 'add') {
      this.blockName = "Add New";
    } else if (block === 'edit') {
      this.blockName = "Edit";
    }
    this.showAddEditblock = !this.showAddEditblock;
  }

  deleteDialogbox() { 
    const exportConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '600px', disableClose: true, data: {
        message: 'Are you sure you want to delete this range owner: Range_Owner_Name?'
      }
    });
  }

}
