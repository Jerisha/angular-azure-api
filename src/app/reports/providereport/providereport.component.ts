import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Select } from 'src/app/uicomponents/models/select';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProvideReport } from 'src/app/reports/models/provide-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ReportService } from '../services/report.service';
import { Utils } from 'src/app/_http/index';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";

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
    { view: 'TelephoneNumber.', viewValue: 'TelephoneNumber', default: true }
]
@Component({
    selector: 'app-providereport',
    templateUrl: './providereport.component.html',
    styleUrls: ['./providereport.component.css']
})
export class ProvidereportComponent implements OnInit {

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
    currentPage: string = '1';
    public tabs: Tab[] = [];
    errorCode = new FormControl();
    constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef, private service: ReportService, private spinner: NgxSpinnerService) { }

    errorCodeData: Select[] = [
        { view: '101', viewValue: '101', default: true },
        { view: '202', viewValue: '202', default: true },
        { view: '303', viewValue: '303', default: true },
    ];

    columns: ColumnDetails[] = [

        { header: 'TelephoneNumber', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
        { header: 'Command', headerValue: 'Command', showDefault: true, isImage: false },
        { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false }
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


    getNextSetRecords(pageIndex: any) {
        debugger;
        this.currentPage = pageIndex;
        this.onFormSubmit(true);
    }

    onFormSubmit(isEmitted?: boolean): void {
        debugger;
        this.currentPage = isEmitted ? this.currentPage : '1';
        let request = Utils.prepareQueryRequest('TelephoneNumberDetails', 'ProvideReports', this.prepareQueryParams(this.currentPage));
        this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
            if (Object.keys(res).length) {
                let result = {
                    datasource: res[0].TelephoneNumbers,
                    totalrecordcount: res[0].TotalCount,
                    totalpages: res[0].NumberOfPages,
                    pagenumber: res[0].PageNumber
                }
                return result;
            } else return res;
        }));
        this.myTable = {
            data: this.queryResult$,
            // removeNoDataColumns : true,
            Columns: this.columns,
            filter: true,
            selectCheckbox: false,
            //selectionColumn: 'TranId',

        }
        if (!this.tabs.find(x => x.tabType == 0)) {
            this.tabs.push({
                tabType: 0,
                name: 'Main'
            });
        }
        this.selectedTab = this.tabs.length;

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
            TelephoneNumber: new FormControl({ value: '', disabled: true },
                [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
        })

    }

    selected(s: string): void {
        this.select = s;
    }

    setControlAttribute(matSelect: MatSelect) {
        matSelect.options.forEach((item) => {
            if (item.selected) {
                this.myForm.controls[item.value].enable();
            }
            else {
                this.myForm.controls[item.value].disable();
            }
        });
    }
    setOptions() {
        this.errorCodesOptions = this.errorCode.valueChanges
            .pipe(
                startWith<string>(''),
                map(name => this._filter(name))
            );
    }

    private _filter(name: string): any[] {
        const filterValue = name.toLowerCase();
        // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
        // return filteredList;
        let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
        return filteredList;
    }

    resetForm(): void {
        window.location.reload();
        // this.tabs.splice(0);

        // this._snackBar.open('Reset Form Completed!', 'Close', {
        //   duration: 5000,
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        // });
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

