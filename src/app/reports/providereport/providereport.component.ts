import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Select } from 'src/app/uicomponents/models/select';
import { Component, OnInit, ViewChild, ChangeDetectorRef , Input } from '@angular/core';
import { ProvideReport } from 'src/app/reports/models/provide-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ReportService } from '../services/report.service';
import { Utils } from 'src/app/_http/index';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { formatDate } from '@angular/common';
import { expDate, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

const ELEMENT_DATA: ProvideReport[] = [
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNumber: '1977722725', Command: 'A', Source: 'N'
    }

];



const Itemstwo: Select[] = [
    { view: 'TelephoneNumber', viewValue: 'TelephoneNumber', default: true }
]
@Component({
    selector: 'app-providereport',
    templateUrl: './providereport.component.html',
    styleUrls: ['./providereport.component.css']
})
export class ProvidereportComponent extends UserProfile implements OnInit {

    select: string = 'Exp';
    isDisabled = true;
    myTable!: TableItem;
    selectedTab!: number;
    selectListItems: string[] = [];
    listItems!: Select[];
    myForm!: FormGroup;
    errorCodesOptions!: Observable<any[]>;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    // currentPage: string = '1';
    Datetime: string= '';
    expOperatorsKeyPair: [string, string][] = [];
    expressions: any = [expNumeric, expString, expDate];
    currentPage: number = DefaultPageNumber;
    pageSize: number = DefaultPageSize;
    isRemoveCache: number = DefaultIsRemoveCache;
    expOperators: string[] = [
        "StartTelephoneNumberOperator",
     
      ];

    public tabs: Tab[] = [];
    errorCode = new FormControl();
    constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef, private service: ReportService, private spinner: NgxSpinnerService, private telnoPipe: TelNoPipe,private auth: AuthenticationService,
        private actRoute: ActivatedRoute)
         {
            super(auth, actRoute);
            this.intializeUser();
          }

    errorCodeData: Select[] = [
        { view: '101', viewValue: '101', default: true },
        { view: '202', viewValue: '202', default: true },
        { view: '303', viewValue: '303', default: true },
    ];

    columns: ColumnDetails[] = [

        { header: 'TelephoneNumber', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
        { header: 'Command', headerValue: 'Command', showDefault: true, isImage: false },
        { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false }
    ];

    queryResult$!: Observable<any>;

    ngOnInit(): void {
        this.createForm();
        debugger;
        this.listItems = Itemstwo;
        
    }
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }


    getNextSetRecords(pageEvent: any) {
        debugger;
        this.currentPage = pageEvent.currentPage;
        this.pageSize = pageEvent.pageSize
        this.onFormSubmit(true);
      
    }
refresh(event: any)
{
    this.onFormSubmit(true);
    console.log('refresh');
}
    onFormSubmit(isEmitted?: boolean): void {
        debugger;
        // this.currentPage = isEmitted ? this.currentPage : '1';
        this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
        this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
        this.isRemoveCache = isEmitted ? 0 : 1;
        var reqParams = [{ "Pagenumber": this.currentPage },
        { "RecordsperPage": this.pageSize },
        { "IsRemoveCache": this.isRemoveCache }];
       
        this.Datetime =   formatDate( new Date, 'dd-MMM-yyyy HH:mm', 'en-US')
        this.tabs.splice(0);
        let request = Utils.preparePyQuery('TelephoneNumberDetails', 'ProvideReports', this.prepareQueryParams(this.currentPage.toString()), reqParams);
        this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
            if (Object.keys(res).length) {
                let result = {
                    datasource: res.data.TelephoneNumbers,
                    params: res.params
            //         totalrecordcount: res.TotalCount,
            // totalpages: res.NumberOfPages,
            // pagenumber: res.PageNumber,
            // pagecount: res.Recordsperpage  
                }
                return result;
            } else return res;
        }));
        this.myTable = {
            data: this.queryResult$,
            removeNoDataColumns : true,
            Columns: this.columns,
            filter: false,
            isFavcols:true,
            excelQuery : this.prepareQueryParams(this.currentPage.toString()),
            selectCheckbox: false,
            //selectionColumn: 'TranId',

        }
        if (!this.tabs.find(x => x.tabType == 0)) {
            this.tabs.push({
                tabType: 0,
                name: 'Inflight Report'
            });
        }
        this.selectedTab = this.tabs.length;

    }

    OnOperatorClicked(val: [string, string]) {
        // if (event.target.value !="")
        console.log("operators event", "value ", val);
        let vals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, val[0]));
        console.log("operators event1", "vals ", vals);
        if (vals.length == 0) {
          this.expOperatorsKeyPair.push(val);
          console.log("if part", this.expOperatorsKeyPair);
        }
        else {
          this.expOperatorsKeyPair = this.expOperatorsKeyPair.filter((i) => i[0] != val[0]);
          this.expOperatorsKeyPair.push(val);
          console.log("else part", this.expOperatorsKeyPair);
        }
      }
    
      getTupleValue(element: [string, string], keyvalue: string) {
        if (element[0] == keyvalue) { return element[1]; }
        else
          return "";
    
      }
    get f() {
        return this.myForm.controls;
    }

    prepareQueryParams(pageNo: string): any {
        let attributes: any = [
            { Name: 'PageNumber', Value: [`${pageNo}`] }];
        for (const field in this.myForm?.controls) {
            const control = this.myForm.get(field);
            if (field != 'Command') {
                if (control?.value)
                    attributes.push({ Name: field, Value: [control?.value] });
                else
                    attributes.push({ Name: field });
            }
        }
        console.log(attributes);

        return attributes;

    }

    createForm() {
        
        this.myForm = new FormGroup({
            TelephoneNumber: new FormControl({ value: '', disabled: false },
                [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
        })
        this.onFormSubmit(true);
    }

    selected(s: string): void {
        this.select = s;
    }
    onChange(value: string, ctrlName: string) {
        const ctrl = this.myForm.get(ctrlName) as FormControl;
        if (isNaN(<any>value.charAt(0))) {
          //const val = coerceNumberProperty(value.slice(1, value.length));
          ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
        } else {
          ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
        }
      }

    resetForm(): void {
        this.myForm.reset();
        this.tabs.splice(0);
      }

    addPrefix(control: string, value: any) {
        if (value.charAt(0) != 0) {
            value = value.length <= 10 ? '0' + value : value;
        }
        this.myForm.controls[control].setValue(value);
    }

    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}

