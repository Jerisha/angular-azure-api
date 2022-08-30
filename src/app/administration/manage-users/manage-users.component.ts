import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { async, BehaviorSubject, of, Subject } from 'rxjs';
import { Tab } from 'src/app/uicomponents/models/tab';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { Select } from 'src/app/uicomponents/models/select';
import { Utils } from 'src/app/_http';
import { AdministrationService } from '../_services/administration.service';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate, NumberFormatStyle } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';
import { debug } from 'console';
import { SelectCheckboxComponent } from 'src/app/uicomponents/select-checkbox/select-checkbox.component';


export class TodoItemNode {
  children: TodoItemNode[];
  label: string;
  id: number;
  isChecked: boolean;
  isPlanType: boolean;
  MenuID: string;
  Position: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  label: string;
  level: number;
  expandable: boolean;
  id: number;
  MenuID: string;
  isparent: boolean
  isChecked: boolean;
  Position: string;
}

let profileitems =
{
  "menuid": "M",
  "accessname": "View|Update|Create|Delete",
  "accesslevel": "1000"
};

let TREE_DATA_three = [
  {
    name: 'All',
    id: 111,
    children: [
      {
        name: 'Process Management',
        id: 111,

        isChecked: false,
        Position: '44444444',
        children: [
          {
            name: 'Solicited/Internal Discrepancy Process updated',
            id: 22,
            isChecked: false,
            Position: '44444444',
            MenuID: 'MENU01',


          },
          {
            name: 'Solicited Resolution Report',
            id: 22,
            isChecked: false,
            MenuID: 'MENU02',
            Position: '44444444',


          },
          {
            name: 'Solicited Actions Report',
            id: 22,
            isChecked: false,
            MenuID: 'MENU03',

            Position: '44444444',


          },
          {
            name: 'Unsolicited Process',
            id: 22,
            isChecked: false,
            MenuID: 'MENU04',
            Position: '44444444',


          },
          {
            name: 'Unsolicited Actions Report',
            id: 22,
            isChecked: false,
            MenuID: 'MENU05',
            Position: '44444444',
          },
        ]
      },
      {
        name: 'Record Creation',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            MenuID: 'MENU06',
            name: 'Create Record',
            id: 77,
            isChecked: false,

            Position: '44444444',
          },
          {
            MenuID: 'MENU07',
            name: 'Create Internal Cease',
            id: 77,
            isChecked: false,

            Position: '44444444',
          },

        ]
      },
      {
        name: 'Audit Process Management',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Full Audit Details',
            id: 77,
            isChecked: false,
            MenuID: 'MENU08',
            Position: '44444444',
          },
          {
            name: 'Audit Discrepancy Report',
            id: 77,
            isChecked: false,
            MenuID: 'MENU11',

            Position: '44444444',
          },
          {
            name: 'External Audit Details',
            id: 77,
            isChecked: false,
            MenuID: 'MENU06',

            Position: '44444444',
          },
          {
            name: 'Full Audit History',
            id: 77,
            isChecked: false,
            MenuID: 'MENU07',
            Position: '44444444',
          },
          {
            name: 'Audit User Action Summary',
            id: 77,
            isChecked: false,
            MenuID: 'MENU09',
            Position: '44444444',
          },
          {
            name: 'Separate Internal Audit Details',
            id: 77,
            isChecked: false,
            MenuID: 'MENU11',
            Position: '44444444',
          }
        ]
      },
      {
        name: 'Inventory Records',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Live Records',
            id: 77,
            isChecked: false,
            MenuID: 'MENU20',
            Position: '44444444',
          },
          {
            name: 'InFlight Records',
            id: 77,
            isChecked: false,
            MenuID: 'MENU22',
            Position: '44444444',
          },
          {
            name: 'Telephone Range Report',
            id: 77,
            isChecked: false,
            MenuID: 'MENU23',
            Position: '44444444',
          },
          {
            name: 'Transaction Details Records',
            id: 77,
            isChecked: false,
            MenuID: 'MENU21',
            Position: '44444444',
          }
        ]
      },
      {
        name: 'Statistical Reports',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Transaction Trend for Source & Command',
            id: 77,
            isChecked: false,
            MenuID: 'MENU24',
            Position: '44444444',
          },


        ]
      },
      {
        name: 'Administration',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Audit Status Tracker',
            id: 77,
            isChecked: false,
            MenuID: 'MENU15',
            Position: '44444444',
          },
          {
            name: 'Audit Data Files',
            id: 77,
            isChecked: false,
            MenuID: 'MENU14',
            Position: '44444444',
          },
          {
            name: 'Restore Solicited Errors',
            id: 77,
            isChecked: false,
            MenuID: 'MENU26',
            Position: '44444444',
          },
          {
            name: 'Data Correction Summary',
            id: 77,
            isChecked: false,
            MenuID: 'MENU16',
            Position: '44444444',
          },

          {
            name: 'Unresolved Transaction',
            id: 77,
            isChecked: false,
            MenuID: 'MENU18',
            Position: '44444444',
          },
          {
            name: 'Unresolved Errors',
            id: 77,
            isChecked: false,
            MenuID: 'MENU17',
            Position: '44444444',
          },
          {
            name: 'Manage Users',
            id: 77,
            isChecked: false,
            MenuID: 'MENU19',
            Position: '44444444',
          }

        ]
      },
      {
        name: 'Configurational Reference Data',
        id: 66,
        isSelected: false,

        Position: 33333,
        children: [
          {
            name: 'Reference List',
            id: 77,
            isSelected: false,
            MenuID:'MENU25',
            Position: '44444444',
            // children: [
            //   {
            //     name: 'AuditStatus',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU34',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Command',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU35',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'CUPIDCrossReference',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU36',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'CUPIDs',
            //     id: 22,
            //     isChecked: false,

            //     Position: '44444444',
            //     MenuID: 'MENU37',
            //   },
            //   {
            //     name: 'CustomerTitles',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU38',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ErrorCodes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU39',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ErrorTypes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU40',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Franchises',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU41',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'InterimCommands',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU42',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'LineTypes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU43',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'NextCommandCheck',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU44',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'OsnProvideList',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU45',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'PermittedLineStatus',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU46',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'RejectedTelephonePrefix',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU47',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ResolutionTypes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU48',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ResolverEmails',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU49',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Olo',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU50',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Company',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU51',
            //     Position: '44444444',

            //   },

            // ]
          }]

      }]

  }
];
let TREE_DATA_View= [
  {
    name: 'All',
    id: 111,
    children: [
      {
        name: 'Process Management',
        id: 111,

        isChecked: false,
        Position: '44444444',
        children: [
          {
            name: 'Solicited/Internal Discrepancy Process updated',
            id: 22,
            isChecked: false,
            Position: '44444444',
            MenuID: 'MENU01',


          },
          {
            name: 'Solicited Resolution Report',
            id: 22,
            isChecked: false,
            MenuID: 'MENU02',
            Position: '44444444',


          },
          {
            name: 'Solicited Actions Report',
            id: 22,
            isChecked: false,
            MenuID: 'MENU03',

            Position: '44444444',


          },
          {
            name: 'Unsolicited Process',
            id: 22,
            isChecked: false,
            MenuID: 'MENU04',
            Position: '44444444',


          },
          {
            name: 'Unsolicited Actions Report',
            id: 22,
            isChecked: false,
            MenuID: 'MENU05',
            Position: '44444444',
          },
        ]
      },
      {
        name: 'Record Creation',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            MenuID: 'MENU06',
            name: 'Create Record',
            id: 77,
            isChecked: false,

            Position: '44444444',
          },
          {
            MenuID: 'MENU07',
            name: 'Create Internal Cease',
            id: 77,
            isChecked: false,

            Position: '44444444',
          },

        ]
      },
      {
        name: 'Audit Process Management',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Full Audit Details',
            id: 77,
            isChecked: false,
            MenuID: 'MENU08',
            Position: '44444444',
          },
          {
            name: 'Audit Discrepancy Report',
            id: 77,
            isChecked: false,
            MenuID: 'MENU11',

            Position: '44444444',
          },
          {
            name: 'External Audit Details',
            id: 77,
            isChecked: false,
            MenuID: 'MENU06',

            Position: '44444444',
          },
          {
            name: 'Full Audit History',
            id: 77,
            isChecked: false,
            MenuID: 'MENU07',
            Position: '44444444',
          },
          {
            name: 'Audit User Action Summary',
            id: 77,
            isChecked: false,
            MenuID: 'MENU09',
            Position: '44444444',
          },
          {
            name: 'Separate Internal Audit Details',
            id: 77,
            isChecked: false,
            MenuID: 'MENU11',
            Position: '44444444',
          }
        ]
      },
      {
        name: 'Inventory Records',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Live Records',
            id: 77,
            isChecked: false,
            MenuID: 'MENU20',
            Position: '44444444',
          },
          {
            name: 'InFlight Records',
            id: 77,
            isChecked: false,
            MenuID: 'MENU22',
            Position: '44444444',
          },
          {
            name: 'Telephone Range Report',
            id: 77,
            isChecked: false,
            MenuID: 'MENU23',
            Position: '44444444',
          },
          {
            name: 'Transaction Details Records',
            id: 77,
            isChecked: false,
            MenuID: 'MENU21',
            Position: '44444444',
          }
        ]
      },
      {
        name: 'Statistical Reports',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Transaction Trend for Source & Command',
            id: 77,
            isChecked: false,
            MenuID: 'MENU24',
            Position: '44444444',
          },


        ]
      },
      {
        name: 'Administration',
        id: 66,
        isChecked: false,

        Position: 33333,
        children: [
          {
            name: 'Audit Status Tracker',
            id: 77,
            isChecked: false,
            MenuID: 'MENU15',
            Position: '44444444',
          },
          {
            name: 'Audit Data Files',
            id: 77,
            isChecked: false,
            MenuID: 'MENU14',
            Position: '44444444',
          },
          {
            name: 'Restore Solicited Errors',
            id: 77,
            isChecked: false,
            MenuID: 'MENU26',
            Position: '44444444',
          },
          {
            name: 'Data Correction Summary',
            id: 77,
            isChecked: false,
            MenuID: 'MENU16',
            Position: '44444444',
          },

          {
            name: 'Unresolved Transaction',
            id: 77,
            isChecked: false,
            MenuID: 'MENU18',
            Position: '44444444',
          },
          {
            name: 'Unresolved Errors',
            id: 77,
            isChecked: false,
            MenuID: 'MENU17',
            Position: '44444444',
          },
          {
            name: 'Manage Users',
            id: 77,
            isChecked: false,
            MenuID: 'MENU19',
            Position: '44444444',
          }

        ]
      },
      {
        name: 'Configurational Reference Data',
        id: 66,
        isSelected: false,

        Position: 33333,
        children: [
          {
            name: 'Reference List',
            id: 77,
            isSelected: false,
            MenuID :"MENU25",
            Position: '44444444',
            // children: [
            //   {
            //     name: 'AuditStatus',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU34',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Command',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU35',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'CUPIDCrossReference',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU36',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'CUPIDs',
            //     id: 22,
            //     isChecked: false,

            //     Position: '44444444',
            //     MenuID: 'MENU37',
            //   },
            //   {
            //     name: 'CustomerTitles',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU38',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ErrorCodes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU39',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ErrorTypes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU40',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Franchises',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU41',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'InterimCommands',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU42',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'LineTypes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU43',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'NextCommandCheck',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU44',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'OsnProvideList',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU45',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'PermittedLineStatus',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU46',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'RejectedTelephonePrefix',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU47',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ResolutionTypes',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU48',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'ResolverEmails',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU49',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Olo',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU50',
            //     Position: '44444444',

            //   },
            //   {
            //     name: 'Company',
            //     id: 22,
            //     isChecked: false,
            //     MenuID: 'MENU51',
            //     Position: '44444444',

            //   },

            // ]
          }]

      }]

  }
];

const ELEMENT_DATA = [
  { UserName: "Test User", Profile: "Custom", Active: "Yes", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "Admin User", Profile: "Admin", Active: "Yes", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "Admin User", Profile: "SuperAdmin", Active: "Yes", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "Admin User", Profile: "Custom", Active: "Yes", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "Admin User", Profile: "SuperAdmin", Active: "Yes", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "Test User", Profile: "SuperAdmin", Active: "Yes", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },

]
const UserOfReports = [{
  UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors"
},
{ UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors" },
{ UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors" },
{ UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors" },
{ UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors" },
{ UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors" },
{ UserId: "kashnji3", EmailAddress: "kashim.j3@vodafone.com", Sources: "Amdocs,SAS/COM", MenuGroup: "Resolving of Errors", ReportName: "Solicited Errors" }


]

const StartUpUserMessages = [{
  EmailAddress: "kashim.j3@vodafone.com", ShowFrom: "14 March 2022", ExpiryDate: "19 March 2022", Message: "test"
},
{ EmailAddress: "kashim.j3@vodafone.com", ShowFrom: "14 March 2022", ExpiryDate: "19 March 2022", Message: "test" },
{ EmailAddress: "kashim.j3@vodafone.com", ShowFrom: "14 March 2022", ExpiryDate: "19 March 2022", Message: "test" },
{ EmailAddress: "kashim.j3@vodafone.com", ShowFrom: "14 March 2022", ExpiryDate: "19 March 2022", Message: "test" },
{ EmailAddress: "kashim.j3@vodafone.com", ShowFrom: "14 March 2022", ExpiryDate: "19 March 2022", Message: "test" },
{ EmailAddress: "kashim.j3@vodafone.com", ShowFrom: "14 March 2022", ExpiryDate: "19 March 2022", Message: "test" }
];
const UserAccessDetails = [
  { UserName: "kashnji3", Profile: "Requester", Active: "Level 0", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "kashnji3", Profile: "Requester", Active: "Level 0", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "kashnji3", Profile: "Requester", Active: "Level 0", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "kashnji3", Profile: "Requester", Active: "Level 0", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "kashnji3", Profile: "Requester", Active: "Level 0", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
  { UserName: "kashnji3", Profile: "Requester", Active: "Level 0", EmailAddress: "kashim.j3@vodafone.com", Country: "United Kingdom", TelephoneNo: "0456786765", "Y/W/ID": "Y875765", "CreatedOn": "02/01/2022", "CreatedBy": "admin" },
]
const UserProfiles = [
  { "ProfileName": "New", "Description": "New Profile", "CreatedOn": "15 March 2022", "CreatedBy": "admin" },
  { "ProfileName": "Test", "Description": "Test Profile", "CreatedOn": "15 March 2022", "CreatedBy": "admin" },
  { "ProfileName": "Requestor", "Description": "Requestor Profile", "CreatedOn": "15 March 2022", "CreatedBy": "admin" },
  { "ProfileName": "Administrator", "Description": "Admin of OSN2", "CreatedOn": "15 March 2022", "CreatedBy": "admin" },
  { "ProfileName": "Super Admin", "Description": "Can view and perform all operations", "CreatedOn": "15 March 2022", "CreatedBy": "admin" },
]

const FilterListItems: Select[] = [
  // { view: 'Amdocs SOM', viewValue: 'Amdocs SOM', default: false },
  // { view: 'ONNET', viewValue: 'ONNET', default: false },
  // { view: 'Ring Central', viewValue: 'Ring Central', default: false },
  // { view: 'Audit', viewValue: 'Audit', default: false },
  // { view: 'EDGE', viewValue: 'EDGE', default: false }
];
interface Access {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('collapsed', style({ height: '0px', width: '0px', padding: '0px', display: 'none', })),
      state('expanded', style({ minHeight: '50px' })),
      transition('expanded => collapsed', animate('500ms ease-in')),
      transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
  ],
  providers: []
})

export class ManageUsersComponent implements OnInit {
  userProfile: string = '';
  userProfilesDropdown: string[] = [''];
  isShow: boolean = false;
  showMenu: string = 'expanded';
  btAuditFileDetailsTable!: TableItem;
  tabs: Tab[] = [];
  tabsLeft: Tab[] = [];
  record: any;
  eventName: string = 'Create';
  thisForm!: FormGroup;
  showDetails: boolean = false;
  referenceForm!: FormGroup;
  referenceUsernameform!: FormGroup;
  StartupUsermsgsForm!: FormGroup;
  UserProfileForm!: FormGroup;
  UserEditForm!: FormGroup;
  Header: string = '';
  isChecked?: boolean = false;
  Menuattributes: any = [];
  ApiMenuattributes: any = [];
  Resultattributes: any = []
  Acessrights: Access[] = [
    { value: '1', viewValue: 'Admin' },
    { value: '2', viewValue: 'SuperAdmin' },
    { value: '3', viewValue: 'Custom' }
  ];
  filterItems: Select[] = [];
  // FilterListItems;
  btAuditFileDetailsTableDetails: any = [
    { headerValue: 'ACTID', header: 'ACTID', showDefault: true, isImage: false },
    {
      headerValue: 'FileName',
      r: 'File Name', showDefault: true, isImage: false
    },
    { headerValue: 'CreatedOn', header: 'Created On', showDefault: true, isImage: false },
    { headerValue: 'DownloadFile', header: 'Download File', showDefault: true, isImage: true },

  ]
  selectedTab: number = 0;
  selectedTabLeft: number = 0;
  UserDetailsForm: boolean = false;
  StartupForm: boolean = false;
  UserProfilesForm: boolean = false;
  UserEditProfilesForm: boolean = false;
  isLeftPanel = false;
  Profilebutton: boolean = true;
  Formstatus: string = '';
  datauserreports = new MatTableDataSource<any>();
  userreportscolums: any = [
    { header: 'User Name', headerValue: 'username' },
    { header: 'Email Address', headerValue: 'emailaddress' },
    { header: 'Source System', headerValue: 'sources' },
    { header: 'Menu Group', headerValue: 'menugroup' },
    { header: 'Report Name', headerValue: 'reportname' }
  ];
  userreportscolumsvalues: any = this.userreportscolums.map((x: any) => x.headerValue);
  userAccessData = new MatTableDataSource<any>();
  userAccessDispCols: any = [
    { header: 'Actions', headerValue: 'Actions' },
    { header: 'User Name', headerValue: 'username' },
    { header: 'Profile Name', headerValue: 'profilename' },
    { header: 'Active', headerValue: 'active' },
    { header: 'Email Address', headerValue: 'emailaddress' },
    { header: 'Telephone No', headerValue: 'telephoneno' },
    { header: 'Y/W/ID', headerValue: 'yid' },
    { header: 'Created On', headerValue: 'createddttm' },
    { header: 'Created By', headerValue: 'createdby' }
  ];
  userAccessDispColsValue: any = this.userAccessDispCols.map((x: any) => x.headerValue);
  startupusermsgs = new MatTableDataSource<any>();
  startupusermsgscols = [
    { header: 'Actions', headerValue: 'Actions' },
    { header: 'News Header', headerValue: 'newsheader' },
    { header: 'News Description', headerValue: 'newsdescription' },
    { header: 'Email Address', headerValue: 'emailaddress' },
    { header: 'Start Date', headerValue: 'startdate' },
    { header: 'Expiry Date', headerValue: 'expirydate' },
  ];
  startupusermsgscolsvalues: any = this.startupusermsgscols.map((x: any) => x.headerValue);
  userprofilesdata = new MatTableDataSource<any>();
  userprofilescols = [
    { header: 'Actions', headerValue: 'Actions' },
    { header: 'Profile Name', headerValue: 'profilename' },
    { header: 'Profile Description', headerValue: 'profiledescription' },
    { header: 'Created On', headerValue: 'createddttm' },
    { header: 'Created By', headerValue: 'createdby' }
  ];
  userprofilescolsvalues: any = this.userprofilescols.map((x: any) => x.headerValue);
  displayedColumns1: any = ['Actions', 'Menu Group', 'Screen Name', 'Access Level'];
  @ViewChild(SelectCheckboxComponent) SelectCheckbox!: SelectCheckboxComponent;
  //Filter Form
  filterUserofReportForm: FormGroup;
  filterUserAccessForm: FormGroup;
  filterNewsUpdateForm: FormGroup;
  filterUserProfilesForm: FormGroup;

  UserProfileRowData: any;

  private readonly onDestroyQuery = new Subject<void>();

  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  datasourceview: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );
  Sourcedata: string;
   clone(obj:any) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
  InitializeTreeview(ProfileName?: string) {
    this.UserProfileForm?.get('profilename')?.disable();
    this.UserProfileForm?.get('profiledescription')?.disable();
    debugger
    let profileMenu: any;
    //console.log('profileitems',JSON.stringify(profileitems));
    let request = Utils.preparePyUIQuery('ManageUsers', 'UserProfile', '', ProfileName);
    //let request = Utils.preparePyUIQuery('ManageUsers', 'UserProfile','',ProfileName);
    console.log('request', request);
    this.bindtreeedataview([]);
    this.spinner.show();
    this.service.uiQueryDetails(request).pipe(takeUntil(this.onDestroyQuery)).subscribe(
      (res: any) => {
        debugger
       // console.log('proifle items in view ', res.Data[0].profileitems);
        this.resettreetreeview();
      if(ProfileName!='Super Admin'&& ProfileName!='Admin')
      {
        if (res.Data[0]) {
          //const tempMyObj:any[] =Object.create(TREE_DATA_View);
         // const tempMyObj:any[] =this.clone(TREE_DATA_View);
          let array:any[] = Object.assign({}, TREE_DATA_View);
          var tempMyObj = Object.values(array);
          //JSON.parse(JSON.stringify(TREE_DATA_View));
        //  clone(TREE_DATA_View); Object.assign({}, TREE_DATA_View);
         console.log('temp object length',tempMyObj.length);
          if (tempMyObj != undefined && tempMyObj.length > 0) {
            for (var i = 0; i < tempMyObj.length; i++) {
              let Tree = tempMyObj[i];
             
              for (var j = 0; j < Tree.children.length; j++) {
                let tchild = Tree.children[j];
                for (var k = 0; k < tchild.children.length; k++) {
                  let grandhchild: any = tchild.children[k];
                  // console.log('gradchild',grandhchild.MenuID);
                  if (grandhchild.MenuID != undefined) {
                    let menu = res.Data[0].profileitems.find((x: { menuitemid: string; }) => x.menuitemid?.toLowerCase() === (grandhchild.MenuID).toLowerCase())
                    {
                      if (menu != undefined) 
                      {
                        grandhchild.isChecked = true;
                      }
                        
                      }
                    }
                  else {
                    for (var l = 0; l < grandhchild.children.length; l++) {
                      let greatgrandchild = grandhchild.children[l];
                      if (greatgrandchild.MenuID != undefined) {
                        let menu = res.Data[0].profileitems.find((x: { menuitemid: string; }) => x.menuitemid?.toLowerCase() === (greatgrandchild.MenuID).toLowerCase())
                        {
                          if (menu != undefined) {
                            greatgrandchild.isChecked = true;
                          }
                         
                          }
                        }
                      }
                    }

                  }
                }
              }
            }
            console.log('temp object',tempMyObj);
            this.bindtreeedataview(tempMyObj[0].children);
          }
        else {
       
          this.bindtreeedataview([]);

          //console.log('api menuitems',this.ApiMenuattributes);
        }

      }
      else{
       this.resettreetreeviewforadmin();
        this.bindtreeedataview(TREE_DATA_View);
        console.log('treeview data',TREE_DATA_View);
      }
        this.spinner.hide();
      });
  }


  initialize(Event: string, Profilename?: string) {
    this.resettree();
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    if (Event != 'Create') {
      debugger
      let profileMenu: any;
      console.log('profileitems', JSON.stringify(profileitems));
      let Treedataupdate: any = TREE_DATA_three;
      let request = Utils.preparePyUIQuery('ManageUsers', 'UserProfile', '', Profilename);
      console.log('request', request);
      this.bindtreedata(Treedataupdate);
      this.spinner.show();
      this.service.uiQueryDetails(request).pipe(takeUntil(this.onDestroyQuery)).subscribe(
        (res: any) => {
          debugger
          //  this.userAccessData.data = res.Data;
          console.log('data of Profile', res.Data);
          this.ApiMenuattributes = [];
          profileitems = res.Data[0]?.profileitems;
          //  this.UserEditForm = this.formBuilder.group({
          //   ProfileName: new FormControl({},),
          //   Description: new FormControl({},),
          //   UserProfile: new FormControl({},)

          // });
          // for (let field in this.UserEditForm.controls) {
          //   let control = this.UserEditForm.get(field);
          //   // c
          //   // console.log(record[field]);

          //   if (field === 'ProfileName') {
          //     control?.setValue(res.Data[0].profilename);
          //   } else if (field === 'Description') {
          //      control?.setValue(res.Data[0].profiledescription);

          //   } 
          // }
          //this.record = record;
          this.eventName = 'Update';
          if (profileitems) {
            if (Treedataupdate != undefined && Treedataupdate.length > 0) {
              for (var i = 0; i < Treedataupdate.length; i++) {
                let Tree = Treedataupdate[i];
                for (var j = 0; j < Tree.children.length; j++) {
                  let tchild = Tree.children[j];
                  for (var k = 0; k < tchild.children.length; k++) {
                    let grandhchild: any = tchild.children[k];
                    // console.log('gradchild',grandhchild.MenuID);
                    if (grandhchild.MenuID != undefined) {
                      let menu = res.Data[0].profileitems.find((x: { menuitemid: string; }) => x.menuitemid?.toLowerCase() === (grandhchild.MenuID).toLowerCase())
                      {
                        if (menu != undefined) {
                          this.ApiMenuattributes.push({ 'menuid': grandhchild.MenuID, 'isChecked': 1, 'accesslevel': '1111' });
                          grandhchild.isChecked = true;
                        }
                      }
                    }
                    else {
                      for (var l = 0; l < grandhchild.children.length; l++) {
                        let greatgrandchild = grandhchild.children[l];
                        if (greatgrandchild.MenuID != undefined) {
                          let menu = res.Data[0].profileitems.find((x: { menuitemid: string; }) => x.menuitemid?.toLowerCase() === (greatgrandchild.MenuID).toLowerCase())
                          {
                            if (menu != undefined) {
                              this.ApiMenuattributes.push({ 'menuid': grandhchild.MenuID, 'isChecked': 1, 'accesslevel': '1111' });
                              greatgrandchild.isChecked = true;
                            }
                          }
                        }
                      }

                    }
                  }
                }
              }
            }
          }
          this.bindtreedata(Treedataupdate);
          console.log('api menuitems', this.ApiMenuattributes);
        }
      );
    }
    else {
      debugger
      if (TREE_DATA_three != undefined && TREE_DATA_three.length > 0) {
        for (var i = 0; i < TREE_DATA_three.length; i++) {
          let Tree = TREE_DATA_three[i];
          for (var j = 0; j < Tree.children.length; j++) {
            let tchild = Tree.children[j];
            for (var k = 0; k < tchild.children.length; k++) {
              let grandhchild: any = tchild.children[k];
            
              if (grandhchild.MenuID != undefined) {

                grandhchild.isChecked = false;

              }
              else {
                for (var l = 0; l < grandhchild.children.length; l++) {
                  let greatgrandchild = grandhchild.children[l];
                  if (greatgrandchild.MenuID != undefined)

                    greatgrandchild.isChecked = false;

                }
              }

            }

          }
        }
      }
      this.bindtreedata(TREE_DATA_three);
    }
    //this.viewAccess = user.

    debugger


  }
  bindSource() {
    let request = Utils.preparePyConfig(['Search'], ['Source']);
    this.filterItems = [];
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("source from config: " + JSON.stringify(res))

      res.data.Source?.forEach((element: any) => {
        this.filterItems.push({ view: element, viewValue: element, default: false })
      });

    });
  }
  bindtreedata(treestructure: any) {
    this.spinner.hide();
    const data = this.buildFileTree(treestructure, 0);
    console.log(data);
    this.dataSource.data = data;
    // Notify the change.
    this.dataChange.next(data);
    // treeControl.expandAll();
    this.treeControl.expandAll();
  }
  resettreetreeviewforadmin()
  {
    if (TREE_DATA_View != undefined && TREE_DATA_View.length > 0) {
      for (var i = 0; i < TREE_DATA_View.length; i++) {
        let Tree = TREE_DATA_View[i];
        for (var j = 0; j < Tree.children.length; j++) {
          let tchild = Tree.children[j];
          for (var k = 0; k < tchild.children.length; k++) {
            let grandhchild: any = tchild.children[k];
          
            if (grandhchild.MenuID != undefined) {
              grandhchild.isChecked = true;
            }
            else {
              for (var l = 0; l < grandhchild.children.length; l++) {
                let greatgrandchild = grandhchild.children[l];
                if (greatgrandchild.MenuID != undefined)
              {
                 grandhchild.isChecked = true;
              }
              }
            }

          }

        }
      }
    }
  }
  resettreetreeview() {
    debugger
    if (TREE_DATA_View != undefined && TREE_DATA_View.length > 0) {
      for (var i = 0; i < TREE_DATA_View.length; i++) {
        let Tree = TREE_DATA_View[i];
        for (var j = 0; j < Tree.children.length; j++) {
          let tchild = Tree.children[j];
          for (var k = 0; k < tchild.children.length; k++) {
            let grandhchild: any = tchild.children[k];
          
            if (grandhchild.MenuID != undefined) {
             
            
              grandhchild.isChecked = false;
             

            }
            else {
              for (var l = 0; l < grandhchild.children.length; l++) {
                let greatgrandchild = grandhchild.children[l];
                if (greatgrandchild.MenuID != undefined)
              
                 grandhchild.isChecked = false;
                
                 

              }
            }

          }

        }
      }
    }
  }




  resettree() {
    if (TREE_DATA_three != undefined && TREE_DATA_three.length > 0) {
      for (var i = 0; i < TREE_DATA_three.length; i++) {
        let Tree = TREE_DATA_three[i];
        for (var j = 0; j < Tree.children.length; j++) {
          let tchild = Tree.children[j];
          for (var k = 0; k < tchild.children.length; k++) {
            let grandhchild: any = tchild.children[k];
         
            if (grandhchild.MenuID != undefined) {

              grandhchild.isChecked = false;

            }
            else {
              for (var l = 0; l < grandhchild.children.length; l++) {
                let greatgrandchild = grandhchild.children[l];
                if (greatgrandchild.MenuID != undefined)

                  greatgrandchild.isChecked = false;

              }
            }

          }

        }
      }
    }
  }


  bindtreeedataview(treestructure: any) {
    debugger
    this.spinner.hide();
    const data = this.buildFileTree(treestructure, 0);
    console.log(data);
    this.datasourceview.data = data;
    // Notify the change.
    this.dataChange.next(data);
  }
  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const item = obj[key];
      const node = new TodoItemNode();
      node.label = obj[key].name;
      node.MenuID = obj[key].MenuID;
      node.id = obj[key].id;
      node.isChecked = obj[key].isChecked;
      node.Position = obj[key].Position;
      node.isPlanType = obj[key].isPlanType;

      if (item != null) {
        if (typeof item === 'object' && item.children != undefined) {
          node.children = this.buildFileTree(item.children, level + 1);
        } else {
          node.label = item.name;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ label: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.label = name;
    this.dataChange.next(this.data);
  }
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }


  constructor(private formBuilder: FormBuilder,
    private service: AdministrationService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private spinner: NgxSpinnerService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.datasourceview = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );


    // database.dataChange.subscribe((data) => {
    //   this.dataSource.data = data;
    // });
  }
  //this.datasource.data=
  checkAll() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if (this.treeControl.dataNodes[i].isChecked)
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      this.treeControl.expand(this.treeControl.dataNodes[i]);
    }
  }

  GetCheckAll() {
    // console.log(this.treeControl.dataNodes);
    var checklistSelection = new SelectionModel<TodoItemFlatNode>(true);
    console.log('get selected', checklistSelection);
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.label === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.label === node.label
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.label = node.label;
    flatNode.level = level;
    flatNode.id = node.id;
    flatNode.isChecked = node.isChecked;
    flatNode.MenuID = node.MenuID
    flatNode.Position = node.Position;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    // console.log('descendent event',node);
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode, event: MatCheckboxChange): void {

    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);

    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    console.log('node change event', node, event.checked);
    const partialSelection = this.treeControl.dataNodes.filter(x =>
      this.descendantsPartiallySelected(x));
    console.log('final result', this.checklistSelection.selected);
    debugger
    descendants.forEach((char: any) => {
      this.Menuattributes = this.Menuattributes.filter((item: { MenuID: any; }) => item.MenuID !== char.MenuID);
      if (char.MenuID != undefined)
        this.Menuattributes.push({ 'menuid': char.MenuID, 'isChecked': event.checked });
    });
    console.log('attributes', this.Menuattributes);
    console.log('final result', partialSelection);

  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode, event: MatCheckboxChange): void {

    this.checklistSelection.toggle(node);
    console.log('chnage event node', node, event.checked);
    node.isChecked ? (node.isChecked = false) : (node.isChecked = true);
    this.checkAllParentsSelection(node);
    debugger
    this.Menuattributes = this.Menuattributes.filter((item: { MenuID: any; }) => item.MenuID !== node.MenuID);
    // delete this.Menuattributes[this.Menuattributes.findIndex((item: { MenuID: any; }) => item.MenuID == node.MenuID)];
    //this.Menuattributes.splice()
    this.Menuattributes.push({ 'menuid': node.MenuID, 'isChecked': event.checked });
    console.log('attributes', this.Menuattributes);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.updateItem(nestedNode!, itemValue);
  }

  /** Whether all the descendants of the node are selected. */


  ngOnInit(): void {
    // this.thisForm =  this.formBuilder.group({
    //   UserId: new FormControl({ value: 'ashok' }'')
    // })
    this.createForms();
    this.bindSource();
    this.isLeftPanel = false;

  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if (this.tabs.length == 0) {
      this.isShow = false;
      this.showMenu = 'expanded';
    }
  }
  removeTabLeftPanel(index: number) {
    let indexnew = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2);
    let indexuseraccess = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 0);
    console.log('button status', this.Profilebutton)
    console.log(indexnew);
    if (index == indexnew) {
      if (this.Profilebutton) {
        this.tabsLeft.splice(index, 1);
        // this.showDetails = this.tabsLeft.length > 0 ? true : false;
        if (this.tabsLeft.length == 0) {
          //this.isShow = false;
          // this.showMenu = 'expanded';
          this.isLeftPanel = false;
        }
      }

    }
    else {

      if (indexuseraccess == index) {
        if (indexnew > 0) {
          this.tabsLeft.splice(indexnew, 1);
        }
      }
      this.tabsLeft.splice(index, 1);
      // this.showDetails = this.tabsLeft.length > 0 ? true : false;
      if (this.tabsLeft.length == 0) {
        //this.isShow = false;
        // this.showMenu = 'expanded';
        this.isLeftPanel = false;
      }
    }

  }

  clearalert()
  {
    this.alertService.clear();
  }
  getFileDetailsLeftPanel(fileType: string) {
    this.clearalert();
    this.tabsLeft.splice(0);
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (fileType === 'UserDetailsForm') {
      if (!this.tabsLeft.find(x => x.tabType == 0)) {
        this.tabsLeft.push({
          tabType: 0,
          name: 'User Access Details'
        });

      }
    }
    else if (fileType === 'UserOfReports') {
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'User Of Reports'
        });

      }
    }
    else if (fileType === 'StartUpUserMessages') {
      if (!this.tabs.find(x => x.tabType == 2)) {
        this.tabs.push({
          tabType: 2,
          name: 'Start Up User Messages'
        });

      }
    }
    else if (fileType === 'UserProfiles') {
      if (!this.tabs.find(x => x.tabType == 3)) {
        this.tabs.push({
          tabType: 3,
          name: 'User Profiles'
        });

      }
    }
    this.showDetails = true;
    this.selectedTab = this.tabs.length;
  }


  getFileDetails(fileType: string,Clear:boolean) {
    if(Clear)
    {
    this.clearalert();
    }
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (fileType === 'UserAccessDetails') {
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'User Access'
        });
        this.selectedTab = this.tabs.length;
      }
      else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 0);
      }
      let request = Utils.preparePyUIQuery('ManageUsers', 'UserAccess');
      this.spinner.show();
      this.service.uiQueryDetails(request).pipe(takeUntil(this.onDestroyQuery)).subscribe(
        (res: any) => {
          console.log('userdata from response', res.Data);
          this.userAccessData.data = res.Data[0].userdata;
          // User Profile Dropdown
          this.userProfilesDropdown = res.Data[res.Data.length - 1].userprofiles.filter((x: any) => x.iscustomprofile == 0).map((x: any) => x.profilename);
          this.userProfilesDropdown.push('Custom');

          console.log('data of manage users', this.userAccessData);
          this.spinner.hide();
        }
      );
    }
    else if (fileType === 'UserOfReports') {
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'User Of Reports'
        });
        this.selectedTab = this.tabs.length;
      }
      else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
      }
      let request = Utils.preparePyUIQuery('ManageUsers', 'UserReports');
      this.spinner.show();
      this.service.uiQueryDetails(request).pipe(takeUntil(this.onDestroyQuery)).subscribe(
        (res: any) => {
          this.datauserreports.data = res.Data;
          this.spinner.hide();
        }
      );

    }
    else if (fileType === 'StartUpUserMessages') {
      if (!this.tabs.find(x => x.tabType == 2)) {
        this.tabs.push({
          tabType: 2,
          name: 'News Update'
        });
        this.selectedTab = this.tabs.length;
      }
      else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
      }
      let request = Utils.preparePyUIQuery('ManageUsers', 'NewsUpdate', 'NewsId');
      this.spinner.show();
      this.service.uiQueryDetails(request).pipe(takeUntil(this.onDestroyQuery)).subscribe(
        (res: any) => {
          this.startupusermsgs.data = res.Data;
          console.log('news data',res.Data);
          this.spinner.hide();
        }
      );
    }
    else if (fileType === 'UserProfiles') {
      if (!this.tabs.find(x => x.tabType == 3)) {
        this.tabs.push({
          tabType: 3,
          name: 'User Profiles'
        });
        this.selectedTab = this.tabs.length;
      }
      else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 3);
      }
      let request = Utils.preparePyUIQuery('ManageUsers', 'UserProfile', 'Profile Name');
      this.spinner.show();
      this.service.uiQueryDetails(request).pipe(takeUntil(this.onDestroyQuery)).subscribe(
        (res: any) => {
          console.log('profile data',res.Data);
          if(res.Data.length>1)
          {
          res.Data.length=res.Data.length-1;
          }
          this.userprofilesdata.data = res.Data;
          this.spinner.hide();
        }
      );
    }
    this.resetFilter(fileType);
    this.showDetails = true;
  }

  btnClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';

  }
  onCancel() {
    this.isLeftPanel = false;
  }
  onEditUserprofile(record: any, event: Event, row?: any) {
    this.clearalert();
    this.UserProfileForm.reset()
    this.InitializeTreeview(row.profilename);
    //this.database.buildFileTree(TREE_DATA_two,0);
    if (row) {
      this.UserProfileForm.get('profilename')?.setValue(row.profilename);
      this.UserProfileForm.get('profiledescription')?.setValue(row.profilename);
    }
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find(x => x.tabType == 1)) {
      this.tabsLeft.push({
        tabType: 1,
        name: 'View'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 1);
    }

    this.Header = "User Profiles";
    this.UserDetailsForm = false;
    this.UserEditProfilesForm = false;
    this.StartupForm = false;
    this.UserProfilesForm = true;

    this.isLeftPanel = true;

    event.stopPropagation();
  }
  onSelectEvent(value: any) {
    console.log('event name', this.eventName);

    if (value == 'Custom') {
      this.Profilebutton = false;
      this.Menuattributes = [];
      this.UserEditForm.get('profilename')?.disable();
      this.UserEditForm?.get('profiledescription')?.disable();


      this.initialize(this.eventName, 'CUSTOM-' + this.referenceForm.controls.username?.value);
      this.onEditUserprofileAceessUserAccess('Create');
      //this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2);

    }
    else {
      let index = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2);
      // console.log('index position',index);
      if (index > 0)
        this.tabsLeft.splice(this.tabsLeft?.findIndex((x: { tabType: number; }) => x.tabType == 2), 1);
    }
  }

  preparemenu() {
    debugger

    this.Resultattributes = [];
    if (this.eventName != 'Create') {
      this.ApiMenuattributes.forEach((element: any) => {
        let flage: boolean = true;
        this.Menuattributes.forEach((char: any) => {


          if (char.menuid == element.menuid) {
            if (char.isChecked)
              this.Resultattributes.push({ 'menuid': char.menuid, 'accesslevel': '1111', 'isfullaccess': (char.isChecked) ? 1 : 0 });
            flage = false;
          }


        });
        if (flage) {
          this.Resultattributes.push({ 'menuid': element.menuid, 'accesslevel': '1111', 'isfullaccess': (element.isChecked) ? 1 : 0 });
        }


      });
      this.Menuattributes.forEach((element: any) => {
        if (element.isChecked) {
          this.Resultattributes.push({ 'menuid': element.menuid, 'accesslevel': '1111', 'isfullaccess': 1 });
        }
      });
      console.log('Update Result ', this.Resultattributes);

      console.log('Update Result2 ', this.Resultattributes);
    }
    else {
      this.Menuattributes.forEach((char: any) => {
        if (char.isChecked) {
          this.Resultattributes.push({ 'menuid': char.menuid, 'accesslevel': '1111', 'isfullaccess': (char.isChecked) ? 1 : 0 });
        }

      });
      console.log('Create Result', this.Resultattributes);
    }
  }
  redirecttoForm() {
    debugger
    if (this.Formstatus == 'Profile') {
      this.preparemenu();
      this.onSubmit('User Profiles');
    }
    else {

      this.onreturnform();
    }
  }

  onreturnform() {
    this.isShow = true;
    this.tabsLeft.splice(this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2));
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 0)) {
      this.tabsLeft.push({
        tabType: 0,
        name: 'Create'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 0);
    }
    this.preparemenu();
    // this.isShow = true;
    // this.showMenu = 'collapsed';
    // if (!this.tabsLeft.find(x => x.tabType == 2)) {
    //   this.tabsLeft.push({
    //     tabType: 2,
    //     name: 'Add Profile'
    //   });
    //   this.showDetails = true;
    //   this.selectedTabLeft = this.tabsLeft.length;
    // }
    // else {
    //   this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 2);
    // }
    // this.Header = "User Access Details";
    // this.UserDetailsForm = true;
    // this.UserEditProfilesForm = false;

    // this.StartupForm = false;
    // this.UserProfilesForm = false;
    // this.isLeftPanel = true;
    // console.log('Edit Record');
    // this.eventName = "Update";
  }
  onEditUserprofileAceessUserAccess(Actiontype: string) {
    // this.Formstatus='Profile';
    //this.initialize(Actiontype);
    debugger
    this.isShow = true;
    this.showMenu = 'collapsed';
    let name = 'Profile';
    if (Actiontype == 'Create') {
      name = 'Add Profile'
    }
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 2)) {
      this.tabsLeft.push({
        tabType: 2,
        name: name
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2);
    }
    this.Header = "User Profiles";
    this.UserDetailsForm = false;
    this.StartupForm = false;
    this.UserEditProfilesForm = true;
    this.isLeftPanel = true;
    // this.UserEditForm = this.formBuilder.group({

    //   ProfileName: new FormControl(),
    //   Description: new FormControl(),
    //   UserProfile: new FormControl()

    // });
    this.UserEditForm.get('profilename')?.setValue('CUSTOM-' + this.referenceForm.controls.username?.value);
    this.UserEditForm.get('profiledescription')?.setValue('Description');


    if (Actiontype == 'Create') {
      this.eventName = 'Create';
    }
    else {
      this.eventName = 'Update';
    }

  }
  onEditUserprofileAceess(Actiontype: string, row?: any) {
    this.clearalert();
    this.tabsLeft.splice(this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 0), 1);
    this.Profilebutton = true;
    this.Formstatus = 'Profile';
    this.UserEditForm?.get('profilename')?.disable();
    this.UserEditForm?.get('profiledescription')?.disable();
    if (row) {

      this.initialize(Actiontype, row.profilename);
    }
    else {
      this.initialize(Actiontype);
    }
    debugger
    this.isShow = true;
    this.showMenu = 'collapsed';
    let name = 'Profile';
    if (Actiontype == 'Create') {
      name = 'Add Profile'
    }
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 2)) {
      this.tabsLeft.push({
        tabType: 2,
        name: name
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2);
    }
    this.Header = "User Profiles";
    this.UserDetailsForm = false;
    this.StartupForm = false;
    this.UserEditProfilesForm = true;
    this.isLeftPanel = true;
    // this.UserEditForm = this.formBuilder.group({

    //   ProfileName: new FormControl(),
    //   Description: new FormControl(),
    //   UserProfile: new FormControl()

    // });
    if (Actiontype == 'Create') {
      this.eventName = 'Create';
      this.UserEditForm?.get('profilename')?.enable();
      this.UserEditForm?.get('profiledescription')?.enable();
      this.UserEditForm.reset();
    }
    else {
      debugger
      this.eventName = 'Update';
      this.UserEditForm.get('profilename')?.setValue(row.profilename);
      this.UserEditForm.get('profiledescription')?.setValue(row.profiledescription);
      this.UserProfileRowData = row;
    }

  }



  onEditUsermsgs(record: any, event: Event) {
    this.clearalert();
    this.tabsLeft.splice(0);
    this.Header = "Start Up User Messages";
    console.log(JSON.stringify(record));
    this.UserDetailsForm = false;
    this.StartupForm = true;
    this.UserProfilesForm = false;
    this.isLeftPanel = true;
    // this.StartupUsermsgsForm = this.formBuilder.group({
    //   startdate: new FormControl([Validators.required]),
    //   newsdescription: new FormControl(),
    //   expirydate: new FormControl(),
    //   emailaddress: new FormControl(),
    //   newsid : new FormControl(),
    // });
    this.record = record;
    // console.log('usermsgs'+this.record);
    this.eventName = 'Update';
    for (let field in this.StartupUsermsgsForm.controls) {
      let control = this.StartupUsermsgsForm.get(field);
      if (field === 'DateRange') {
        let start = this.StartupUsermsgsForm.get('DateRange.startdate');
        start?.setValue(new Date(record['startdate']));
        let end = this.StartupUsermsgsForm.get('DateRange.expirydate');
        end?.setValue(new Date(record['expirydate']));
        console.log("Date  " + new Date(record['expirydate']));

      }
      else {
        control?.setValue(record[field]);
      }
      // console.log(record[field]);
    }

  }
  changeevent(event: any) {
    debugger
    console.log('event called', event);
    //  this.Sourcedata=event;
    //this.referenceForm.get('sources')?.setValue(JSON.stringify(event));
  }
  get f() {
    return this.UserEditForm.controls;
  }
  onEdituserDetails(record: any, event: Event) {
    this.clearalert();
    debugger
    this.Menuattributes = [];
    this.tabsLeft.splice(this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2), 1);
    this.Formstatus = 'UserAccessDetails'
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 0)) {
      this.tabsLeft.push({
        tabType: 0,
        name: 'Create User'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 0);
    }



    this.Header = "User Access Details";
    this.UserDetailsForm = true;
    this.StartupForm = false;
    this.UserProfilesForm = false;
    this.isLeftPanel = true;
    console.log('Edit Record');
    this.eventName = "Update";
    debugger
    // this.referenceForm = this.formBuilder.group({

    //   username: new FormControl(),
    //   userprofiles: new FormControl(),
    //   yid: new FormControl(),
    //   firstname: new FormControl(),
    //   lastname: new FormControl(),
    //   emailaddress: new FormControl(),
    //   telephoneno: new FormControl(),

    // });

    this.record = record;
    this.eventName = 'Update'
    //this.showDataform =true; 
    //this.cdr.detectChanges();
    //
    debugger
    //this.bindSource();
    if (this.eventName === 'Update') {
      if (record['sources']) {
        this.filterItems.map((x: any) => {
         
            x.default = false;
           //false;
          });
      console.log(this.filterItems,'filter items');
        let arr: any[] = record['sources'].split(',');
        //arr.push('SAS/COMS');
        arr.forEach((value: any) => {
          this.filterItems.map((x: any) => {
            if (x.view === value) {
              x.default = true;
             //false;
            }
            // else {
            //   x.default = false;
            // }
          });
        })

      }
    }

    this.SelectCheckbox?.clearvaluesselection();


    for (let field in this.referenceForm.controls) {
      let control = this.referenceForm.get(field);
      // control?.setValue(record[field]);
      // console.log(record[field]);

      if (field === 'userprofiles') {
        // record[field].push('Custom');
        // this.userProfilesDropdown = record[field];
        // this.userProfile = record['profilename'];
        if (record['iscustomprofile'] == 1) {
          control?.setValue('Custom');
          this.Profilebutton = false;
          this.Menuattributes = [];
          this.UserEditForm.get('profilename')?.disable();
          this.UserEditForm?.get('profiledescription')?.disable();
          this.initialize(this.eventName, 'CUSTOM-' + this.referenceForm.controls.username?.value);
          this.onEditUserprofileAceessUserAccess('Create');
        }
        else {
          control?.setValue(record['profilename']);
        }
      } else if (field === 'sources') {
        // control?.setValue(record[field]);



      } else if (field === 'active') {
        record[field] === 'Yes' ? control?.setValue(true) : control?.setValue(false);
      }

      else {
        control?.setValue(record[field]);
      }
    }

    //this.referenceForm.markAsUntouched();

  }
  onCreateUserProfiles() {
    this.clearalert();
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 1)) {
      this.tabsLeft.push({
        tabType: 1,
        name: 'View'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 1);
    }

    this.Header = "User Profiles";
    this.UserDetailsForm = false;
    this.StartupForm = false;
    this.UserProfilesForm = true;
    this.isLeftPanel = true;
    this.UserProfileForm = this.formBuilder.group({
      ProfileName: new FormControl(),
      Description: new FormControl(),
      UserProfile: new FormControl()
    });
    this.eventName = "Create";
  }
  onCreateuserMsgs() {
    this.clearalert();
    this.tabsLeft.splice(0);
    this.StartupUsermsgsForm.reset();
    this.Header = "Start Up User Messages";
    this.UserDetailsForm = false;
    this.StartupForm = true;
    this.UserProfilesForm = false;
    this.isLeftPanel = true;
    // this.StartupUsermsgsForm = this.formBuilder.group({
    //   startdate: new FormControl(),
    //   newsdescription: new FormControl(),
    //   expirydate: new FormControl(),
    //   emailaddress: new FormControl(),
    // });
    this.eventName = "Create";
  }
  backuseraccessform() {

    this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 3);

  }
  onVerifyUserName() {
    this.tabsLeft.splice(this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 2), 1);
    this.StartupForm = false;
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 3)) {
      this.tabsLeft.push({
        tabType: 3,
        name: 'Create'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 3);
    }
    this.isLeftPanel = true;
    this.referenceUsernameform.reset();

  }

  onCreateuserDetails() {

    let request1 = Utils.preparePyUICreateFirstRequest('ManageUsers', 'UserAccess', 'KasimJ3', "1");
    console.log("Create first  request1 : " + JSON.stringify(request1));
    this.service.uiCreateDetails(request1).pipe(takeUntil(this.onDestroyQuery)).subscribe(
      (res: any) => {
        if (res.Status && res.Status[0].StatusMessage === 'Success') {
          //success message and same data reload
          // this.refreshData();
          this.alertService.success("Record created successfully!!", { autoClose: true, keepAfterRouteChange: false });
          this.getFileDetails('UserAccessDetails',false);
        }
      });



    debugger
    if (this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 3)) {
      let index: number = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 3);
      this.tabsLeft.splice(index);
    }
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find((x: { tabType: number; }) => x.tabType == 0)) {
      this.tabsLeft.push({
        tabType: 0,
        name: 'Create'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else {
      this.selectedTabLeft = this.tabsLeft.findIndex((x: { tabType: number; }) => x.tabType == 0);
    }
    this.referenceForm.reset();
    this.referenceForm.get('username')?.setValue(this.referenceUsernameform.controls.UserID?.value);

    this.Header = "User Access Details";
    this.UserDetailsForm = true;
    this.StartupForm = false;
    this.UserProfilesForm = false;
    this.isLeftPanel = true;

    // this.referenceForm = this.formBuilder.group({
    //   username: new FormControl(),
    //   userprofiles: new FormControl(),
    //   yid: new FormControl(),
    //   firstname: new FormControl(),
    //   lastname: new FormControl(),
    //   emailaddress: new FormControl(),
    //   telephoneno: new FormControl(),
    // });
    this.eventName = "Create";
    this.filterItems.map((x: any) => {
      x.default = false;
    }

    );
    this.SelectCheckbox?.clearvaluesselection();
  }
  onSubmit(reportIdentifier?: string) {
    debugger
    // alert("Create/Edit Completed..");
    this.isLeftPanel = false;
    // this.showDetailsForm=true;
    //  console.log("event name "+ this.eventName);

    if (this.eventName === 'Update') {
      switch (reportIdentifier) {
        case 'User Access Details':
          const updateConfirm1 = this.dialog.open(ConfirmDialogComponent, {
            width: '300px', disableClose: true, data: {
              message: 'Do you confirm update this record?'
            }
          });
          updateConfirm1.afterClosed().subscribe((confirm: any) => {
            if (confirm) {
              let request1 = Utils.preparePyUIUpdate('ManageUsers', 'UserAccess', 'UserName', this.prepareData(this.referenceForm, 'UserAccess'));
              console.log("Update request1 : " + JSON.stringify(request1));
              this.service.uiUpdateDetails(request1).pipe(takeUntil(this.onDestroyQuery)).subscribe(
                (res: any) => {
                  if (res.Status && res.Status[0].StatusMessage === 'Success') {
                    //success message and same data reload
                    // this.refreshData();
                    this.alertService.success("Record update successfully!!", { autoClose: true, keepAfterRouteChange: false });
                    this.getFileDetails('UserAccessDetails',false);
                  }
                });
            }
            else {
              this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
          break;

        case 'Start Up User Messages':
          const updateConfirm2 = this.dialog.open(ConfirmDialogComponent, {
            width: '300px', disableClose: true, data: {
              message: 'Do you confirm update this record?'
            }
          });
          updateConfirm2.afterClosed().subscribe((confirm: any) => {
            if (confirm) {
              let request2 = Utils.preparePyUIUpdate('ManageUsers', 'NewsUpdate', 'NewsId', this.prepareData(this.StartupUsermsgsForm));
              console.log("Update request2 : " + JSON.stringify(request2));
              this.service.uiUpdateDetails(request2).pipe(takeUntil(this.onDestroyQuery)).subscribe(
                (res: any) => {
                  if (res.Status && res.Status[0].StatusMessage === 'Success') {
                    //success message and same data reload
                    // this.refreshData();
                    this.alertService.success("Record update successfully!!", { autoClose: true, keepAfterRouteChange: false });
                    this.getFileDetails('StartUpUserMessages',false);
                  }
                });
            }
            else {
              this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
          break;

        case 'User Profiles':
          const updateConfirm3 = this.dialog.open(ConfirmDialogComponent, {
            width: '300px', disableClose: true, data: {
              message: 'Do you confirm update this record?'
            }
          });
          updateConfirm3.afterClosed().subscribe((confirm: any) => {
            if (confirm) {
              let request3 = Utils.preparePyUIUpdate('ManageUsers', 'UserProfile', 'ProfileName', this.prepareData(this.UserEditForm, 'UserProfileUpdate'));
              console.log("Update request3 : " + JSON.stringify(request3));
              this.service.uiUpdateDetails(request3).pipe(takeUntil(this.onDestroyQuery)).subscribe(
                (res: any) => {
                  if (res.Status && res.Status[0].StatusMessage === 'Success') {
                    //success message and same data reload
                    // this.refreshData();
                    this.alertService.success("Record update successfully!!", { autoClose: true, keepAfterRouteChange: false });
                    this.getFileDetails('UserProfiles',false);
                  }
                });
            }
            else {
              this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
          break;
      }
    }
    else {
      // Create Logic
      switch (reportIdentifier) {
        case 'User Access Details':
          let request1 = Utils.preparePyUICreate('ManageUsers', 'UserAccess', 'UserName', this.prepareData(this.referenceForm, 'UserAccess'));
          console.log("Create request1 : " + JSON.stringify(request1));
          this.service.uiCreateDetails(request1).pipe(takeUntil(this.onDestroyQuery)).subscribe(
            (res: any) => {
              if (res.Status && res.Status[0].StatusMessage === 'Success') {
                //success message and same data reload
                // this.refreshData();
                this.alertService.success("Record created successfully!!", { autoClose: true, keepAfterRouteChange: false });
                this.getFileDetails('UserAccessDetails',false);
              }
            });
          break;
        case 'Start Up User Messages':
          let request2 = Utils.preparePyUICreate('ManageUsers', 'NewsUpdate', 'NewsId', this.prepareData(this.StartupUsermsgsForm));
          console.log("Create request2 : " + JSON.stringify(request2));
          this.service.uiCreateDetails(request2).pipe(takeUntil(this.onDestroyQuery)).subscribe(
            (res: any) => {
              console.log('news uicreate response',res.Status[0].StatusMessage);
             
              if (res.Status && res.Status[0].StatusMessage === 'Success') {
                //success message and same data reload
                // this.refreshData();
                this.alertService.success("Record created successfully!!", { autoClose: true, keepAfterRouteChange: false });
                this.getFileDetails('StartUpUserMessages',false);
              }
            });
          break;
        case 'User Profiles':
          let request3 = Utils.preparePyUICreate('ManageUsers', 'UserProfile', 'ProfileName', this.prepareData(this.UserEditForm, 'UserProfileCreate'));
          console.log("Create request3 : " + JSON.stringify(request3));
          this.service.uiCreateDetails(request3).pipe(takeUntil(this.onDestroyQuery)).subscribe(
            (res: any) => {
              if (res.Status && res.Status[0].StatusMessage === 'Success') {
                //success message and same data reload
                // this.refreshData();
                this.alertService.success("Record created successfully!!", { autoClose: true, keepAfterRouteChange: false });
                this.getFileDetails('UserProfiles',false);
              }
            });
          break;
      }
    }
  }

  onDeleteRecord(record: any, reportName: string) {
    this.clearalert();
    switch (reportName) {
      case 'User Access':
        const updateConfirm1 = this.dialog.open(ConfirmDialogComponent, {
          width: '300px', disableClose: true, data: {
            message: 'Do you confirm delete this record?'
          }
        });
        updateConfirm1.afterClosed().subscribe((confirm: any) => {
          if (confirm) {
            let request1 = Utils.preparePyUIDelete('ManageUsers', 'UserAccess', 'UserName', this.prepareDeleteData(record, reportName));
            console.log("Delete request1 : " + JSON.stringify(request1));
            this.service.uiDeleteDetails(request1).pipe(takeUntil(this.onDestroyQuery)).subscribe(
              (res: any) => {
                if (res.Status && res.Status[0].StatusMessage === 'Success') {
                  //success message and same data reload
                  // this.refreshData();
                  this.alertService.success("Record delete successfully!!", { autoClose: true, keepAfterRouteChange: false });
                  this.getFileDetails('UserAccessDetails',false);
              this.isLeftPanel=false;
             
                }
                else {
                  this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
                }
              });
          }
        });
        break;
      case 'News Update':
        const updateConfirm2 = this.dialog.open(ConfirmDialogComponent, {
          width: '300px', disableClose: true, data: {
            message: 'Do you confirm update this record?'
          }
        });
        updateConfirm2.afterClosed().subscribe((confirm: any) => {
          if (confirm) {
            let request2 = Utils.preparePyUIDelete('ManageUsers', 'NewsUpdate', 'NewsId', this.prepareDeleteData(record, reportName));
            console.log("Delete request2 : " + JSON.stringify(request2));
            this.service.uiDeleteDetails(request2).pipe(takeUntil(this.onDestroyQuery)).subscribe(
              (res: any) => {
                if (res.Status && res.Status[0].StatusMessage === 'Success') {
                  //success message and same data reload
                  // this.refreshData();
                  this.alertService.success("Record delete successfully!!", { autoClose: true, keepAfterRouteChange: false });
                  this.getFileDetails('StartUpUserMessages',false);
                  this.isLeftPanel=false;
                }
                else {
                  this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
                }
              });
          }
        });
        break;
      case 'User Profiles':
        const updateConfirm3 = this.dialog.open(ConfirmDialogComponent, {
          width: '300px', disableClose: true, data: {
            message: 'Do you confirm update this record?'
          }
        });
        updateConfirm3.afterClosed().subscribe((confirm: any) => {
          if (confirm) {
            let request3 = Utils.preparePyUIDelete('ManageUsers', 'UserProfile', 'ProfileName', this.prepareDeleteData(record, reportName));
            console.log("Delete request3 : " + JSON.stringify(request3));
            this.service.uiDeleteDetails(request3).pipe(takeUntil(this.onDestroyQuery)).subscribe(
              (res: any) => {
                if (res.Status && res.Status[0].StatusMessage === 'Success') {
                  //success message and same data reload
                  // this.refreshData();
                  this.alertService.success("Record delete successfully!!", { autoClose: true, keepAfterRouteChange: false });
                  this.getFileDetails('UserProfiles',false);
                  this.isLeftPanel=false;
                }
                else {
                  this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
                }
              });
          }
        });
        break;
    }
  }
  multipleSelect(event: any) {
    // console.log(event)
    if (event) {
      console.log(event.toString());
      this.Sourcedata = event.toString();
    }
  }

  // (index:any)
  // {
  //   console.log('Edit event binded'+index);
  //   let rowdata=ELEMENT_DATA[index];
  //   this.thisForm =  this.formBuilder.group({
  //     UserId: new FormControl({ value: 'ashok' })
  //   })
  //   console.log(rowdata);
  // }

  onSearchFilter(reportName: any) {
    this.onFilterPredicate();
    switch (reportName) {
      case 'UserOfReports':
        let filteritem1 = {
          username: [this.filterUserofReportForm.controls['username'].value ? this.filterUserofReportForm.controls['username'].value : ''],
          menugroup: [this.filterUserofReportForm.controls['menugroup'].value ? this.filterUserofReportForm.controls['menugroup'].value : ''],
          reportname: [this.filterUserofReportForm.controls['reportname'].value ? this.filterUserofReportForm.controls['reportname'].value : ''],
          sources: [this.filterUserofReportForm.controls['sources'].value ? this.filterUserofReportForm.controls['sources'].value : '']
        }
        console.log(JSON.stringify(filteritem1));
        this.datauserreports.filter = JSON.stringify(filteritem1);
        break;
      case 'UserAccessDetails':
        let filteritem2 = {
          username: [this.filterUserAccessForm.controls['username'].value ? this.filterUserAccessForm.controls['username'].value : ''],
          profilename: [this.filterUserAccessForm.controls['profilename'].value ? this.filterUserAccessForm.controls['profilename'].value : '']
        }
        console.log(JSON.stringify(filteritem2));
        this.userAccessData.filter = JSON.stringify(filteritem2);
        break;
      case 'StartUpUserMessages':
        let filteritem3 = {
          emailaddress: [this.filterNewsUpdateForm.controls['emailaddress'].value ? this.filterNewsUpdateForm.controls['emailaddress'].value.trim() : ''],
          startdate: [this.filterNewsUpdateForm.controls['startdate'].value ? this.filterNewsUpdateForm.controls['startdate'].value : ''],
          expirydate: [this.filterNewsUpdateForm.controls['expirydate'].value ? this.filterNewsUpdateForm.controls['expirydate'].value : '']
        }
        console.log(JSON.stringify(filteritem3));
        this.startupusermsgs.filter = JSON.stringify(filteritem3);
        break;
      case 'UserProfiles':
        let filteritem4 = {
          profilename: [this.filterUserProfilesForm.controls['profilename'].value ? this.filterUserProfilesForm.controls['profilename'].value : ''],
          createdby: [this.filterUserProfilesForm.controls['createdby'].value ? this.filterUserProfilesForm.controls['createdby'].value : '']
        }
        console.log(JSON.stringify(filteritem4));
        this.userprofilesdata.filter = JSON.stringify(filteritem4);
        break;
    }
  }

  resetFilter(reportName: any) {
    switch (reportName) {
      case 'UserOfReports':
        this.datauserreports.filter = '';
        this.filterUserofReportForm.reset();
        break;
      case 'UserAccessDetails':
        this.userAccessData.filter = '';
        this.filterUserAccessForm.reset();
        break;
      case 'StartUpUserMessages':
        this.startupusermsgs.filter = '';
        this.filterNewsUpdateForm.reset();
        break;
      case 'UserProfiles':
        this.userprofilesdata.filter = '';
        this.filterUserProfilesForm.reset();
        break;

    }
  }

  onFilterPredicate() {

    //UserOfReports
    if (this.datauserreports)
      this.datauserreports.filterPredicate = (data: any, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        let isSources = false;
        let isUserName = false;
        let isMenuGroup = false;
        let isReportName = false;

        if (searchString.sources.length) {
          for (const d of searchString.sources) {
            if (data.sources.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isSources = true;
            }
          }
        }
        else
          isSources = true;

        if (searchString.username.length) {
          for (const d of searchString.username) {
            if (data.username.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isUserName = true;
            }
          }
        }
        else
          isUserName = true;

        if (searchString.reportname.length) {
          for (const d of searchString.reportname) {
            if (data.reportname.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isReportName = true;
            }
          }
        }
        else
          isReportName = true;

        if (searchString.menugroup.length) {
          for (const d of searchString.menugroup) {
            if (data.menugroup.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isMenuGroup = true;
            }
          }
        }
        else
          isMenuGroup = true;

        return isSources && isUserName && isReportName && isMenuGroup;
      }

    //News Update
    if (this.startupusermsgs)
      this.startupusermsgs.filterPredicate = (data: any, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        let isEmailAddress = false;
        let isStartDate = false;
        let isExpiryDate = false;

        if (searchString.emailaddress.length) {
          for (const d of searchString.emailaddress) {
            if (data.emailaddress.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isEmailAddress = true;
            }
          }
        }
        else
          isEmailAddress = true;

        if (searchString.startdate.length) {
          for (const d of searchString.startdate) {
            if (data.startdate.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isStartDate = true;
            }
          }
        }
        else
          isStartDate = true;

        if (searchString.expirydate.length) {
          for (const d of searchString.expirydate) {
            if (data.expirydate.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isExpiryDate = true;
            }
          }
        }
        else
          isExpiryDate = true;

        return isEmailAddress && isStartDate && isExpiryDate;
      }

    //User Access
    if (this.userAccessData)
      this.userAccessData.filterPredicate = (data: any, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        let isUserName = false;
        let isProfileName = false;

        if (searchString.username.length) {
          for (const d of searchString.username) {
            if (data.username.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isUserName = true;
            }
          }
        }
        else
          isUserName = true;

        if (searchString.profilename.length) {
          for (const d of searchString.profilename) {
            if (data.profilename.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isProfileName = true;
            }
          }
        }
        else
          isProfileName = true;

        return isUserName && isProfileName;
      }

    //User Profiles
    debugger
    if (this.userprofilesdata)
      this.userprofilesdata.filterPredicate = (data: any, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        let isProfileName = false;
        let isCreatedBy = false;
        if (searchString.profilename.length) {
          console.log('profile name',searchString.profilename);
          console.log('data profilename',data.profilename?.toLowerCase());
          for (const d of searchString.profilename) {
           
            }
          }
        
        if (searchString.profilename.length) {
          for (const d of searchString.profilename) {
           // console.log('console value',data.profilename.toLowerCase().indexOf(d));
            if (data.profilename?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isProfileName = true;
            }
          }
        }
        else
          isProfileName = true;

        if (searchString.createdby.length) {
          for (const d of searchString.createdby) {
            if (data.createdby?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isCreatedBy = true;
            }
          }
        }
        else
          isCreatedBy = true;

        return isProfileName && isCreatedBy;
      }

  }

  prepareData(form: FormGroup, action?: string) {
    console.log('form group data', form);
    debugger;
    let attribute: any = {};
    let profilename: string = "";
    for (const field in form.controls) {
      const control = form.get(field);
      if (field === 'userprofiles') {
        if (control?.value)
          profilename = control.value;
      }
      else if (field === 'DateRange') {
        attribute.startdate = formatDate(form.get('DateRange.startdate')?.value, 'dd-MMM-yyyy hh:mm:ss', 'en-US');
        attribute.expirydate = formatDate(form.get('DateRange.expirydate')?.value, 'dd-MMM-yyyy hh:mm:ss', 'en-US');
      }
      else if (field === 'active') {
        control?.value == true ? attribute[field] = 'Yes' : attribute[field] = 'No';
      }
      else if (control?.value) attribute[field] = control.value;

    }
    if (action == 'UserAccess') {

      if (this.Sourcedata) {
        attribute['sources'] = this.Sourcedata;
      }

      let newattribute: any = {};
      if (profilename === 'Custom') {
        this.preparemenu();
        attribute['profilename'] = this.UserEditForm.controls.profilename?.value;
        newattribute['iscustom'] = 1;
        newattribute['iseditprofile'] = 1;
        newattribute['isdefaultprofile'] = 0;
        //newattribute['profilename']=profilename;
        newattribute['profilename'] = this.UserEditForm.controls.profilename?.value;
        newattribute['profileitems'] = this.Resultattributes;
        attribute['iscustomprofile'] = 1;
        // newattribute['profiledescription']='This is custom';
      }

      else {
        attribute['profilename'] = profilename;
        attribute['iscustomprofile'] = 0;
        newattribute['profilename'] = profilename;
        newattribute['iscustom'] = 0;
        newattribute['iseditprofile'] = 1;
        newattribute['isdefaultprofile'] = 1;
        attribute['iscustomprofile'] = 0;
        // newattribute['profileitems']=this.Resultattributes;
      }
      newattribute['isdelete'] = 1;

      attribute['profiledata'] = newattribute;
    }

    if (action == 'UserProfileCreate') {

      let newattribute: any = {};

      attribute['isdefaultprofile'] = 0;
      attribute['iseditprofile'] = 1;
      attribute['iscustom'] = 0;
      attribute['isdelete'] = 1;

      attribute['profileitems'] = this.Resultattributes;

      // attribute['profiledata']=newattribute;
    }

    if (action == 'UserProfileUpdate') {

      let newattribute: any = {};
      if (this.UserProfileRowData) {
        attribute['isdefaultprofile'] = this.UserProfileRowData.isdefaultprofile;
        attribute['iseditprofile'] = this.UserProfileRowData.iseditprofile;
        attribute['iscustom'] = this.UserProfileRowData.iscustomprofile;
        attribute['isdelete'] = this.UserProfileRowData.isdelete;
      }

      attribute['profileitems'] = this.Resultattributes;

      // attribute['profiledata']=newattribute;
    }
    console.log(JSON.stringify(attribute));
    return attribute;
  }

  prepareDeleteData(record: any, reportName: string) {
    let attribute: any = {};
    switch (reportName) {
      case 'User Access':
        attribute.username = record.username;
        break;
      case 'News Update':
        attribute.newsid = record.newsid;
        break;
      case 'User Profiles':
        attribute.profilename = record.profilename;
        break;
    }
    return attribute;
  }

  createForms() {
    this.referenceForm = this.formBuilder.group({
      username: new FormControl({ value: '' }, [Validators.required]),
      userprofiles: new FormControl({ value: '' }, [Validators.required]),
      yid: new FormControl({ value: '' }),
      firstname: new FormControl({ value: '' }, [Validators.required]),
      lastname: new FormControl({ value: '' }, [Validators.required]),
      emailaddress: new FormControl({ value: '' }, [Validators.required, Validators.email]),
      telephoneno: new FormControl({ value: '' }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
      active: new FormControl({ value: '' }, []),
      sources: new FormControl({ value: '' }),
    });


    this.StartupUsermsgsForm = this.formBuilder.group({
      newsid: new FormControl({ value: '' }, []),
      newsdescription: new FormControl({ value: '' }, [Validators.required]),
      DateRange: this.formBuilder.group({
        startdate: new FormControl({ value: '' }, [Validators.required]),
        expirydate: new FormControl({ value: '' }, [Validators.required])
      }),
      emailaddress: new FormControl({ value: '' }, [Validators.required, Validators.email]),
      newsheader: new FormControl({ value: '' }, [Validators.required]),
      newssubheader: new FormControl({ value: '' }, []),
    });

    this.UserEditForm = this.formBuilder.group({

      profilename: new FormControl({ value: '' }, [Validators.required]),
      profiledescription: new FormControl({ value: '' }, [Validators.required]),
      // userprofile: new FormControl()

    });
    this.UserProfileForm = this.formBuilder.group({

      profilename: new FormControl({ value: '' }, [Validators.required]),
      profiledescription: new FormControl({ value: '' }, [Validators.required]),
      // userprofile: new FormControl()

    });

    this.filterUserofReportForm = this.formBuilder.group({
      username: new FormControl({ value: '' }, []),
      sources: new FormControl({ value: '' }, []),
      menugroup: new FormControl({ value: '' }, []),
      reportname: new FormControl({ value: '' }, []),
    });

    this.filterNewsUpdateForm = this.formBuilder.group({
      emailaddress: new FormControl({ value: '' }, []),
      startdate: new FormControl({ value: '' }, []),
      expirydate: new FormControl({ value: '' }, []),
    });

    this.filterUserAccessForm = this.formBuilder.group({
      username: new FormControl({ value: '' }, []),
      profilename: new FormControl({ value: '' }, []),
    });

    this.filterUserProfilesForm = this.formBuilder.group({
      profilename: new FormControl({ value: '' }, []),
      createdby: new FormControl({ value: '' }, []),
    });
    this.referenceUsernameform = this.formBuilder.group({

      UserID: new FormControl({ value: '' }, [Validators.required]),
    });
    this.StartupUsermsgsForm.reset();
    this.referenceForm.reset();
    this.filterUserofReportForm.reset();
    this.filterNewsUpdateForm.reset();
    this.filterUserAccessForm.reset();
    this.filterUserProfilesForm.reset();
    this.UserEditForm.reset();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onExport(tableHeader: any, tabName: string, tableData: any) {
    if (tableData.data != undefined && (tableData.data != [] && tableData.data.length != 0)) {
      //  let header = this.reportReferenceService.getDownLoadHeaders(currentReportName)

      let header = tableHeader;
      // header.filter((x:any) => x.headerValue != 'Actions');
      let copydata = JSON.parse(JSON.stringify(tableData.data));
      var c = document.createElement("a");
      let data: any = [];
      let dataHeaderRow = Object.assign({}, ...header.map((x: any) => ({ [x.headerValue]: x.header })))
      Reflect.deleteProperty(dataHeaderRow, "Actions");
      data += Object.values(dataHeaderRow).toString().replace(/[,]+/g, '\t') + "\n";
      copydata.forEach((row: any) => {

        for (const i of ['Actions', 'firstname', 'lastname', 'userprofiles', 'updateddttm', 'updatedby', 'profileitems', 'newsid', 'iseditprofile', 'iscustomprofile', 'isdefaultprofile', 'isdelete']) {
          Reflect.deleteProperty(row, i);
        }

        if (tabName === 'News_Update') {
          for (const i of ['createddttm', 'createdby', 'newssubheader']) {
            Reflect.deleteProperty(row, i);
          }
        }
        if (tabName != 'User_Of_Reports') {
          for (const i of ['sources']) {
            Reflect.deleteProperty(row, i);
          }
        }

        let disp = Object.assign({}, ...header.map((x: any) => ({ [x.headerValue]: " " })))
        Reflect.deleteProperty(disp, "Actions");
        // console.log( "data value" +JSON.stringify(row));
        // console.log( "header data value" +JSON.stringify(disp));
        let dataRow = Object.assign(disp, row);
        Object.keys(dataRow).forEach((key: any) => {
          if (dataRow[key] == "")
            dataRow[key] = " ";
        });
        // console.log( "data row value" +JSON.stringify(dataRow));
        let val = Object.values(dataRow).join('|');
        val.replace(/[/t]+/g, ' ');
        data += val.replace(/[|]+/g, '\t') + "\n";
      });
      c.download = tabName + "_Report.tab";
      var t = new Blob([data], {

        type: "data:text/plain;charset=utf-8"
      });
      c.href = window.URL.createObjectURL(t);
      c.click();
      this.alertService.success('UserAccess' + ' Download Completed', { autoClose: true, keepAfterRouteChange: false });
    }
    else {
      this.alertService.info('UserAccess' + ' No Data Found ', { autoClose: true, keepAfterRouteChange: false });
    }
  }
  onPaste(event: ClipboardEvent) {
    debugger
    let clipboardData = event.clipboardData;
    //let regexp = new RegExp('/\s/g');
    let pastedText:any = clipboardData?.getData('text');
    //let test = regexp.test(pastedText);
    let trimmedText = pastedText.replace(/\s/g, "");;
    this.StartupUsermsgsForm.get('emailaddress')?.setValue(trimmedText);
    event.preventDefault();
  //   if (test) {
  //     event.preventDefault();
  // }
}

onPasteEmail(event: ClipboardEvent) {
  debugger
  let clipboardData = event.clipboardData;
  //let regexp = new RegExp('/\s/g');
  let pastedText:any = clipboardData?.getData('text');
  //let test = regexp.test(pastedText);
  let trimmedText = pastedText.replace(/\s/g, "");;
  this.referenceForm.get('emailaddress')?.setValue(trimmedText);
  event.preventDefault();
//   if (test) {
//     event.preventDefault();
// }
}

}