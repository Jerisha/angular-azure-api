import { Component, OnInit } from '@angular/core';
import { BTResponses, InternalError, ResolutionHistory, TransactionErrors } from '../models/ITransactionErrors';

const ele: TransactionErrors = {
  InternalError: [{ TelephoneNumber: '12345', TransactionId: '19967456', Comment: 'Awaiting Customer' }],
  BTResponse: [
    { Code: '1083', Response: 'OLO Does', Date: '14-Jan-2014', Final: 'Y', FileName: 'BT101311043202.CAR' },
    { Code: '1081', Response: 'Daa/Record', Date: '20-Jan-2014', Final: 'N', FileName: 'BT101311041002.CAR' }
  ],
  ResolHistory: [
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
  ]
}
@Component({
  selector: 'app-transaction-errors',
  templateUrl: './transaction-errors.component.html',
  styleUrls: ['./transaction-errors.component.css']
})
export class TransactionErrorsComponent implements OnInit {
  internalError?: InternalError[];
  btResponse?: BTResponses[];
  resolHistory?: ResolutionHistory[];
  constructor() { }

  ngOnInit(): void {
    this.internalError = ele.InternalError;
    this.btResponse = ele.BTResponse;
    this.resolHistory = ele.ResolHistory
  }
  

}
