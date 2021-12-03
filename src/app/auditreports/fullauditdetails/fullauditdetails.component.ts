import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FullAuditDetails } from 'src/app/_models/fullauditdetailsmodel';
import { TableItem } from 'src/app/_models/table-item';

const ELEMENT_DATA: FullAuditDetails[] = [
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: 'DetailsVie'
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''

  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100031 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100032 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100033 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: 'Orange'
  }
];

@Component({
  selector: 'app-fullauditdetails',
  templateUrl: './fullauditdetails.component.html',
  styleUrls: ['./fullauditdetails.component.css']
})


export class FullauditdetailsComponent implements OnInit {
  @ViewChild('select')
  select!: MatSelect;
  allSelected = false;
  myTable!: TableItem

  constructor() {
    this.myTable = {
      data: ELEMENT_DATA,
      dataColumns: ['TelNo', 'View', 'OSN2Source', 'Source', 'ACTID',
        'RangeReport', 'InflightOrder', 'CUPID', 'BatchId', 'ExternalCLIStatus', 'FullAuditCLIStatus',
        'Monthly Refresh Flag', 'Resolution Type', 'SourceSystemStatus', 'MoriCircuitStatus', 'SwitchStatus',
        'SwitchPortingStatus', 'PortingPrefixOwner', 'Switch Type', 'CDMSNMSRPIPO', 'CDMSNMSR Prefix',
        'CDMSNMSRType', 'CDMSNMSRAreacall', 'IsVodafoneRangeHolder', 'BTCustomer', 'BTPostcode',
        'BTLocality', 'BTPremise', 'BTThouroughfare', 'OSN2Customer', 'OSN2Postcode', 'OSN2Locality',
        'OSN2Premise', 'OSN2Thouroughfare', 'SourceCustomer', 'SourcePostcode', 'SourceLocality',
        'SourcePremise', 'SourceThouroughfare', 'ParentCUPID', 'ChildCUPID', 'LineType', 'Franchise',
        'OrderType', 'OrderReference', 'OrderServiceType', 'TypeOfLine', 'CommentsRange',
        'LinkOrderRef', 'LinkReasonCode', 'OrderArchiveFlag', 'DeadEntry'],
      coulmnHeaders: ['TelNo', 'View', 'OSN2 Source', 'Source', 'ACT ID',
        'Range Report', 'Inflight Order', 'CUPID', 'Batch Id', 'External CLI Status', 'Full Audit CLI Status',
        'Monthly Refresh Flag', 'Resolution Type', 'Source System Status', 'Mori Circuit Status', 'Switch Status',
        'Switch Porting Status', 'Porting Prefix Owner', 'Switch Type', 'CDMS/NMSR PI/PO', 'CDMS/NMSR Prefix',
        'CDMS/NMSR Type', 'CDMS/NMSR Areacall', 'Is Vodafone RangeHolder', 'BT Customer', 'BT Postcode',
        'BT Locality', 'BT Premise', 'BT Thouroughfare', 'OSN2 Customer', 'OSN2 Postcode', 'OSN2 Locality',
        'OSN2 Premise', 'OSN2 Thouroughfare', 'Source Customer', 'Source Postcode', 'Source Locality',
        'Source Premise', 'Source Thouroughfare', 'Parent CUPID', 'Child CUPID', 'Line Type', 'Franchise',
        'Order Type', 'Order Reference', 'Order Service Type', 'Type Of Line', 'Comments(Range)',
        'Link Order Ref', 'Link Reason Code', 'Order Archive Flag', 'Dead Entry'],
      filter: true,
      colToSetImage: ['View', 'MoriCircuitStatus'],
      imgConfig: [{ column: 'View', icon: 'tab', route: '' },
      { column: 'View', icon: 'description', route: '' },
      { column: 'MoriCircuitStatus', icon: 'search', route: '' }]

    }
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

  showLog() {

    var selectedColumns: string[] = this.select.value;
    console.log(selectedColumns);    
    for (let col of selectedColumns) {


      //this.myTable.dataColumns
      this.myTable.dataColumns= this.myTable.dataColumns?.filter((item: string) => item !== col);
      var index: any = this.myTable.dataColumns?.indexOf(col);

      console.log(index);
      
      // if (index !== -1) {
      //   this.myTable.dataColumns?.splice(index, 1);
      //   this.myTable.coulmnHeaders?.splice(index, 1);
      // }
    }
    console.log(this.myTable.dataColumns?.length);
  }


  colHeader: any[] = [
    { value: 'TelNo', viewValue: 'TelNo' }, { value: 'View', viewValue: 'View' }, { value: 'OSN2Source', viewValue: 'OSN2 Source' }, { value: 'Source', viewValue: 'Source' }, { value: 'ACTID', viewValue: 'ACT ID' },
    { value: 'RangeReport', viewValue: 'Range Report' }, { value: 'InflightOrder', viewValue: 'Inflight Order' }, { value: 'CUPID', viewValue: 'CUPID' },
    { value: 'BatchId', viewValue: 'Batch Id' }, { value: 'ExternalCLIStatus', viewValue: 'External CLI Status' }, { value: 'FullAuditCLIStatus', viewValue: 'Full Audit CLI Status' },
    { value: 'MonthlyRefreshFlag', viewValue: 'Monthly Refresh Flag' }, { value: 'ResolutionType', viewValue: 'ResolutionType' }, { value: 'SourceSystemStatus', viewValue: 'Source System Status' }, { value: 'MoriCircuitStatus', viewValue: 'Mori Circuit Status' },
    { value: 'SwitchStatus', viewValue: 'Switch Status' }, { value: 'SwitchPortingStatus', viewValue: 'Switch Porting Status' }, { value: 'PortingPrefixOwner', viewValue: 'Porting Prefix Owner' },
    { value: 'SwitchType', viewValue: 'Switch Type' }, { value: 'CDMSNMSRPIPO', viewValue: 'CDMSNMSRPIPO' }, { value: 'CDMSNMSRPrefix', viewValue: 'CDMSNMSR Prefix' },
    { value: 'CDMSNMSRType', viewValue: 'CDMSNMSR Type' }, { value: 'CDMSNMSRAreacall', viewValue: 'CDMSNMSR Area call' }, { value: 'IsVodafoneRangeHolder', viewValue: 'Is VodafoneRange Holder' }, { value: 'BTCustomer', viewValue: 'BT Customer' }, { value: 'BTPostcode', viewValue: 'BTP ostcode' },
    { value: 'BTLocality', viewValue: 'BT Locality' }, { value: 'BTPremise', viewValue: 'BT Premise' }, { value: 'BTThouroughfare', viewValue: 'BT Thourough fare' }, { value: 'OSN2Customer', viewValue: 'OSN2 Customer' }, { value: 'OSN2Postcode', viewValue: 'OSN2 Postcode' }, { value: 'OSN2Locality', viewValue: 'OSN2 Locality' },
    { value: 'OSN2Premise', viewValue: 'OSN2 Premise' }, { value: 'OSN2Thouroughfare', viewValue: 'OSN2 Thourough fare' }, { value: 'SourceCustomer', viewValue: 'Source Customer' }, { value: 'SourcePostcode', viewValue: 'Source Postcode' }, { value: 'SourceLocality', viewValue: 'Source Locality' },
    { value: 'SourcePremise', viewValue: 'Source Premise' }, { value: 'SourceThouroughfare', viewValue: 'Source Thouroughfare' }, { value: 'ParentCUPID', viewValue: 'ParentCUPID' }, { value: 'ChildCUPID', viewValue: 'Child CUPID' }, { value: 'LineType', viewValue: 'LineType' }, { value: 'Franchise', viewValue: 'Franchise' },
    { value: 'OrderType', viewValue: 'Order Type' }, { value: 'OrderReference', viewValue: 'Order Reference' }, { value: 'OrderServiceType', viewValue: 'Order Service Type' }, { value: 'TypeOfLine', viewValue: 'Type Of Line' }, { value: 'CommentsRange', viewValue: 'Comments Range' }
    , { value: 'LinkOrderRef', viewValue: 'Link OrderRef' },
    { value: 'LinkReasonCode', viewValue: 'Link Reason Code' }, { value: 'OrderArchiveFlag', viewValue: 'Order Archive Flag' }, { value: 'DeadEntry', viewValue: 'DeadEntry' }]

  ngOnInit(): void {

  }
}