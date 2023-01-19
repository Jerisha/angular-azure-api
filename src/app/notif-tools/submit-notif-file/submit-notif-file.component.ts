import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_shared/alert/alert.service';

@Component({
  selector: 'app-submit-notif-file',
  templateUrl: './submit-notif-file.component.html',
  styleUrls: ['./submit-notif-file.component.css']
})
export class SubmitNotifFileComponent implements OnInit {
  fileName: string;
  displayDownload: boolean = false;
  validateBtn: boolean = false;
  @ViewChild("fileupload", {static: false}) clearFileInput: ElementRef;

  constructor(private alertService: AlertService,) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.fileName = event.target.files[0].name;
    this.validateBtn = true;
    this.displayDownload = false;
  }

  clearInput(fileData: any) {
    this.fileName='No File chosen';
    this.validateBtn = false;
    this.clearFileInput.nativeElement.value = "";
  }

  validateFileCheck() {
    if (this.fileName == 'Correct Version Notif.xlsx') {
      this.alertService.success("File uploaded successfully", { autoClose: true, keepAfterRouteChange: false });
      this.displayDownload = false;
    } else {
      this.alertService.error("File validation failed", { autoClose: true, keepAfterRouteChange: false });
      this.displayDownload = true;
    }
    this.fileName = 'No File chosen';
    this.validateBtn = false;
  }

}
