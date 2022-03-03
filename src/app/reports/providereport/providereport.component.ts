import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProvideReport } from 'src/app/reports/models/provide-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { select, selectcupid, selectlist } from 'src/app/_helper/Constants/exp-const';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ReportService } from '../services/report.service';
import { Utils } from 'src/app/_http/index';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


const ELEMENT_DATA: ProvideReport[] = [
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    },
    {
        TelephoneNo: '1977722725', Command: 'A', Source: 'N'
    }

];



const Itemstwo: Select[] = [
    { view: 'Telephone No.', viewValue: 'TelephoneNumber', default: true }
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

    errorCodeData: Select[] = [
        { view: '101', viewValue: '101', default: true },
        { view: '202', viewValue: '202', default: true },
        { view: '303', viewValue: '303', default: true },
    ];
    public tabs: Tab[] = [];
    errorCode = new FormControl();
    constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef, private service: ReportService) { }


    columns: ColumnDetails[] = [

        { header: 'TelephoneNumber', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
        { header: 'Command', headerValue: 'Command', showDefault: true, isImage: false },
        { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false }
    ];

    queryResult$!: Observable<any>;

    ngOnInit(): void {

        this.createForm();
        // debugger;
        // let transformInput = JSON.parse(WMRequests.CONFIG);
        // transformInput.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[1].Value = ['Command', 'Source']
        // console.log("Input: ", transformInput);
        debugger;
        // let request = Utils.prepareConfigRequest(['Command', 'Source', 'ResolutionType', 'ErrorType', 'ErrorCode']);
        // this.configResult$ = this.service.configDetails(request).pipe(map((res: any) => res[0]));
    
        this.listItems = Itemstwo;
        //this.selectedTab = 0;

    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }


    onFormSubmit(): void {
        debugger;
        let request = Utils.prepareQueryRequest('TelephoneNumberDetails', 'ProvideReports', this.prepareQueryParams());
        this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => res[0].TelephoneNumbers));
        console.log('added');
        this.myTable = {
            data: this.queryResult$,
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
        //this.selectedTab = this.tabs.length - 1;
    }


    prepareQueryParams(): any {
        let attributes: any = [
            { Name: 'PageNumber', Value: ['1'] }];
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
                [Validators.required, Validators.minLength(3), Validators.maxLength(99)])
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
        this._snackBar.open('Reset Form Completed!', 'Close', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}

