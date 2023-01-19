import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-creation-dialog',
  templateUrl: './profile-creation-dialog.component.html'
})
export class ProfileCreationDialogComponent implements OnInit {

  profileName: string = '';
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: { selectedColsArray: any },) { }

  ngOnInit(): void {
  }

  get checkInvalid() {
    if (this.profileName == '' || this.profileName == null ||
      (this.profileName || '').trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
