import { SelectionModel } from '@angular/cdk/collections';
import {
  Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter,
  Output, OnDestroy, SimpleChanges, ChangeDetectionStrategy, AfterViewChecked, DoCheck
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CellAttributes, ColumnDetails, FavoriteProfile, FooterDetails, PaginationAttributes, ProfileDetails, TableItem, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ignoreElements, map, takeUntil } from 'rxjs/operators';
import { UIService } from '../_services/ui.service';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Utils, WebMethods } from 'src/app/_http';
import { ProfileCreationDialogComponent } from '../../_shared/profile-creation-dialog/profile-creation-dialog.component';
import { AlertService } from 'src/app/_shared/alert';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-table-expansion-new',
  templateUrl: './table-expansion-new.component.html',
  styleUrls: ['./table-expansion-new.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpansionNewComponent extends UserProfile implements OnDestroy, AfterViewChecked {

    private readonly onDestroy = new Subject<void>();
    fltvalue: string = '';
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort!: MatSort;
    @ViewChild('select') select!: MatSelect;
    allSelected = true;
    selection = new SelectionModel<any>(true, []);
    @Input() tableitem?: TableItem;
    @Input() sidePan: any;
    @Input() isShown: boolean = true;
    @Output() rowChanges = new EventEmitter<any>();
    @Output() addNewTab = new EventEmitter<any>();
    @Output() pageIndex = new EventEmitter<any>();
    @Output() refreshtab = new EventEmitter<any>();
    @Output() requestExport2Excel = new EventEmitter<any>();
    @Input() isExportDisable: boolean = true;
    // dataSource!: MatTableDataSource<any>;
    public dataSource = new MatTableDataSource<any>();
    selectedrows: any;
    ColumnDetails: ColumnDetails[] = [];
    dataColumns!: string[];
    footerColumns!: string[];
    columnHeaders: any;
    columnHeaderFilter?: boolean = false;
    columnFilter?: boolean = false;
    imgList?: ViewColumn[];
    imgColumns?: string[];
    selectColumn: string = '';
    selectedTelnos: string[] = [];
    isEmailRequired?: boolean = false;
    selectList: string[] = [];
  
    emptyColumns: string[] = [];
    nonemptyColumns: string[] = [];
    unSelectListItems: string[] = [];
    gridFilter: ColumnDetails[] = [];
    filteredDataColumns: ColumnDetails[] = [];
    fontHighlightedCells: CellAttributes[] = [];
    backgroundHighlightedCells: CellAttributes[] = [];
    imageAttrCells: CellAttributes[] = [];
    isTotDisplayed: boolean = false;
    totShowed: boolean = false;
    showTotalRow!: boolean;
    showCustomFooter?: boolean = false;
    isRowselected: boolean = false;
    totalRowCols: string[] = [];
    footerDisplayCols: string[] = [];
    nonNumericCols: string[] = [];
    isLoading = false;
    isDataloaded: boolean = false;
    dataObs$!: Observable<any>
    dataobj!: any;
    totalRows = 0;
    step: number = 2;
    childTable: string = '';
    pageSize = 0;
    currentPage = 0;
    apiPageNumber: number = 0;
    reportIdentifier: string;
    screenIdentifier: string;
    excelQueryObj: any;
    pageSizeOptions: number[] = [500];
    disablePageSize: boolean = true;
    disablePaginator: boolean = false;
    paginatorList!: HTMLCollectionOf<Element>;
    pageProp: PaginationAttributes = { currentPage: 0, pageSize: 0 };
    footerDetails!: FooterDetails;
    option: any = [];
    favProfile: FavoriteProfile[] = [];
    showFavCols: boolean = false;
    selectedUserProfileId: any;
    enableCustomization: boolean = false;
    expandedElement: any;
    constructor(private changeDetectorRef: ChangeDetectorRef,
      private spinner: NgxSpinnerService,
      private service: UIService,
      private alertService: AlertService,
      private dialog: MatDialog,
      private auth: AuthenticationService,
      private actRoute: ActivatedRoute) {
      super(auth, actRoute)
      this.intializeUser();
  
    }
  
    pageChanged(event: PageEvent) {
      debugger;
      this.currentPage = event.pageIndex;
      this.pageProp.currentPage = this.currentPage + 1;
      this.pageProp.pageSize = event.pageSize;
      this.pageIndex.emit(this.pageProp);
    }
  
    refresh(event: any) {
      event.stopPropagation();
      this.refreshtab.emit({ event });
    }
    setAddressDetails(section: string, element: any) {
      // console.log(element.details.postcode);
  
    }
    setStep(index: number) {
      this.step = index;
    }
    ngOnChanges(changes: SimpleChanges) {
      this.initializeTableAttributes();
      this.disablePaginator = this.tableitem?.disablePaginator ? true : false;
      this.dataObs$ = this.tableitem?.data;
      this.spinner.show();
      this.dataObs$.pipe(takeUntil(this.onDestroy)).subscribe(
        (res: any) => {
          this.dataSource.data = res.datasource;
          this.loadDataRelatedAttributes(this.dataSource.data);
          this.totalRows = (res?.params?.TotalCount) as number;
          this.apiPageNumber = (res?.params?.PageNumber) as number;
          this.currentPage = this.apiPageNumber - 1;
          this.pageSize = (res?.params?.Recordsperpage) as number;
          this.reportIdentifier = res?.params?.ReportIdentifier;
          this.screenIdentifier = res?.params?.ScreenIdentifier;
          if (this.showCustomFooter) this.footerDetails = res.FooterDetails;
          // this.dataSource.sort = this.sort;
          this.spinner.hide();
          this.disablePageSize = this.totalRows > 50 ? false : true;
          this.isDataloaded = true;
        },
        (error) => { this.spinner.hide(); },
        () => {
          if (this.currentPage > 0) {
            this.toggleAllSelection();
          }
          this.spinner.hide();
          if (this.dataSource.data != undefined && this.tableitem?.isFavcols) {
            this.showFavCols = true;
            this.loadFavProfile();
          } else {
            this.showFavCols = false;
          }
        }
      );
    }
  
    loadDataRelatedAttributes(data: any) {
      this.ColumnDetails = [];
      this.favProfile = [];
      this.columnHeaderFilter = this.tableitem?.filter;
      if (this.tableitem?.removeNoDataColumns) {
        if (data && data.length > 0)
          this.verifyEmptyColumns(data);
        else
          this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
      }
      else {
        this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
      }
      //Select checkbox
      if (this.tableitem?.selectCheckbox) {
        const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
        this.ColumnDetails.unshift(selItem);
      }
      this.childTable = this.tableitem?.childData ? this.tableitem?.childData : '';
      this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
      this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
      if (this.tableitem?.isCustomFooter) this.footerColumns = this.dataColumns.map(x => `f2_${x}`);
    }
  
    newTab(tab: any) {
      console.log('event log');
      this.addNewTab.emit({ tab });
    }
    initializeTableAttributes() {
      this.selection.clear();
      this.allSelected = true;
      this.excelQueryObj = this.tableitem?.excelQuery;
      this.imageAttrCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isImage) : [];
      this.fontHighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isFontHighlighted) : [];
      this.backgroundHighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isBackgroundHighlighted) : [];
      this.totalRowCols = this.tableitem?.Columns ? this.tableitem?.Columns.filter(e => e.isTotal === true).map(e => e.headerValue) : [];
      //this.showTotalRow = this.totalRowCols?.length > 0;
      this.showTotalRow =true;
      this.imgList = this.tableitem?.imgConfig;
      this.isEmailRequired = this.tableitem?.showEmail;
      this.showCustomFooter = this.tableitem?.isCustomFooter;
      if (this.tableitem?.isCustomFooter) this.footerDisplayCols = this.tableitem?.Columns ? this.tableitem?.Columns.filter(e => e.isFooter === true).map(e => `f2_${e.headerValue}`) : [];
  
      // if (this.tableitem?.removeNoDataColumns) {
      //   if (data && data.length > 0)
      //     this.verifyEmptyColumns(data);
      //   else
      //     this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
      // }
      // else {
      //   this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
      // }
  
      // //Select checkbox
      // if (this.tableitem?.selectCheckbox) {
      //   const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
      //   this.ColumnDetails.unshift(selItem);
      // }
  
      // this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
      // this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
    }
  
    removeNoDataColumns(data: any) {
      this.ColumnDetails = [];
      this.columnHeaderFilter = this.tableitem?.filter;
      if (this.tableitem?.removeNoDataColumns) {
        if (data && data.length > 0)
          this.verifyEmptyColumns(data);
        else
          this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
      }
      else {
        this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
      }
  
      //Select checkbox
      if (this.tableitem?.selectCheckbox) {
        const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
        this.ColumnDetails.unshift(selItem);
      }
  
      this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
      this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
      if (this.tableitem?.isCustomFooter) this.footerColumns = this.dataColumns.map(x => `f2_${x}`);
    }
  
    ngOnInit(): void {
    }
  
    ngAfterViewInit() {
      this.changeDetectorRef.detectChanges();
    }
  
    ngAfterViewChecked() {
      if (this.isDataloaded) {
        this.toggleAllSelection();
        this.isDataloaded = false;
      }
  
    }
  
    getTotal(cellname: string) {
      // debugger
      var cell = cellname ? cellname : '';
      if (this.dataColumns[0] === cellname && !this.totalRowCols.includes(cell)) {
        return 'Total';
      }
      if (this.totalRowCols.includes(cell) && this.dataColumns.includes(cell))
        return this.dataSource?.data.reduce((a: number, b: any) => a + ((b[cell] === undefined || b[cell] === '') ? 0 : parseInt(b[cell])), 0);
      else
        return '';
    }
  
    getFooterDetails(cellname: string) {
  
      // debugger 
  
      var cell = cellname ? cellname : '';
  
      if (this.footerColumns[0] === cellname && !this.footerDisplayCols.includes(cell)) {
  
        return this.footerDetails.footerName;
  
      }
  
      if (this.footerDisplayCols.includes(cell) && this.footerColumns.includes(cell))
  
        return this.footerDetails.footerValue;
  
      else
  
        return '';
  
    }
  
    getColSpan(cellname: string) {
      if (this.dataColumns[0] === cellname) {
        return this.nonNumericCols.length;
      }
      return 1;
    }
  
    selectRow(event: any, row: any) {
      // this.dataSource.data = this.dataSource.data.filter(r => r !== row);
      // if (event.checked) {
      //   this.dataSource.data = [row].concat(this.dataSource.data);
      // }
      // else {
      //   this.dataSource.data = this.dataSource.data.concat(row);
      // }
      this.rowChanges.emit([row]);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      //  this.spinner.show();
      if (this.isAllSelected()) {
        this.selection.clear()
        //this.selectedTelnos = [];
      }
      else {
        this.dataSource.data.forEach(row => this.selection.select(row));
      }
      this.rowChanges.emit(this.dataSource.data);
      //this.spinner.hide();
    }
  
    applyFilter() {
      this.dataSource.filter = this.fltvalue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    toggleAllSelection() {
      if (this.select) {
        if (this.allSelected) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption, index) => { 
            if (index == 0 || item.value == 'TelephoneNumber' || item.value == 'View' || item.value == 'Link' || item.value == 'Links')
            {
              //  item.deselect();
              ;
            }else {
              item.deselect();
            }
           });
        }
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
  
    // getDisplayName(data: string) {
    //   let index = this.tableitem?.dataColumns ? this.tableitem?.dataColumns.indexOf(data) : -1;
    //   return this.tableitem?.coulmnHeaders ? this.tableitem?.coulmnHeaders[index] : undefined;
  
    // }
  
    filterGridColumns(event: any) {
      debugger;
      let selectedColumns: string[] = this.select.value;
      this.dataColumns = this.tableitem?.selectCheckbox ? ['Select'].concat(selectedColumns) : selectedColumns;
      if (this.tableitem?.isCustomFooter) this.footerColumns = this.dataColumns.map(x => `f2_${x}`);
      event.close();
      //console.log('datacols', this.dataColumns)
      // let coulmnHeader: string[] = [];
      // let staticColumns = this.tableitem?.coulmnHeaders ?
      //   this.tableitem?.coulmnHeaders : undefined;filter
  
      // selectedColumns.forEach(function (selectedColumn) {
      //   let displayedColumn = staticColumns?.
      //     find(x => x.replace(/[^a-zA-Z0-9]/g, "") == selectedColumn)
      //   coulmnHeader.push(displayedColumn ? displayedColumn : '');
      // });
      // this.columnHeaders = this.tableitem?.selectCheckbox ? ['Select'].concat(coulmnHeader) : coulmnHeader;
  
    }
  
    addTabs(event: any, tabType: number, row: any) {
      event.stopPropagation();
      this.addNewTab.emit({ tabType, row });
    }
  
    logSelection(a: any) {
  
      this.selectedrows = this.selection.selected ? this.selection.selected : undefined;
      //this.selectedrowsCount = this.selection.selected ? this.selection.selected.length: 0;
      return true;
    }
  
    verifyEmptyColumns(data: any) {
      this.nonemptyColumns = [];
      this.emptyColumns = [];
      this.unSelectListItems = [];
  
      data?.forEach((item: any) => this.checkIsNullOrEmptyProperties(item));
      //console.log('non', this.nonemptyColumns)
      this.tableitem?.Columns?.forEach(x => {
        if (this.nonemptyColumns.find(c => c === x.headerValue) || x.isImage) {
          this.ColumnDetails.push(x);
        }
      })
    }
  
    removeNullOrEmpty(data: any) {
      this.tableitem?.Columns?.forEach(x => {
        let col = data[x.headerValue];
      })
  
    }
  
    checkIsNullOrEmptyProperties(obj: any) {
      for (var key in obj) {
        // if ((this.tableitem?.Columns?.filter(x => key === (x.headerValue)).length == 0)) {
        //   this.emptyColumns.push(key);
        // }
        if ((obj[key] === null || obj[key] === "")) {
          this.emptyColumns.push(key);
        }
        else {
          this.nonemptyColumns.push(key)
        }
        // debugger;
        // this.checkImgcols(obj)     
      }
    }
  
    setImageCellAttributes(row: any, cell: any) {
      let flag = true;
      let loopFlag = true;
  
      var cells = this.imageAttrCells.filter(x => x.cells.includes(cell));
      if (cells.length > 0) {
        //debugger;
        cells.forEach(x => {
          if (x.cells.find(x => x === (cell)) && row[x.flag] === x.value) {
            loopFlag = true;
          }
          else {
            flag = false;
          }
        });
      }
      return flag && loopFlag;
    }
  
    highlightCell(row: any, disCol: any) {
      let applyStyles = {};
  
      if (this.backgroundHighlightedCells.find(x => x.cells.includes(disCol.headerValue))) {
        this.backgroundHighlightedCells.forEach(x => {
          if (x.cells.find(x => x === (disCol.headerValue)) && row[x.flag] === x.value) {
            applyStyles = {
              'background-color': '#ff9999'
            };
          }
        })
      }
  
      if (this.fontHighlightedCells.find(x => x.cells.includes(disCol.headerValue))) {
        this.fontHighlightedCells.forEach(x => {
          if (x.cells.find(x => x === (disCol.headerValue)) && row[x.flag] === x.value) {
            applyStyles = {
              'color': 'red',
              'font-weight': '500'
            }
          }
        })
      }
      return applyStyles;
    }
  
    rowHighlight(row: any) {
      let rowHighlight = '';
      if ((parseInt(row.SuccessCount) > 0)) rowHighlight = 'rowFontHighlight1';
      if ((parseInt(row.SuccessCount) === 0)) rowHighlight = 'rowFontHighlight2';
      return rowHighlight;
    }
  
    ngOnDestroy() {
      this.onDestroy.next();
    }
  
    getSelectedProfile(val: any) {
      debugger;
      this.dataColumns = [];
      let newStatus = true;
      let selectedColumns = this.favProfile?.find(x => x.favprofileid === val)?.favcolumnlist;
      selectedColumns = this.ColumnDetails.filter(x => selectedColumns?.includes(x.headerValue)).map(x => x.headerValue)
      selectedColumns = selectedColumns ? selectedColumns : []
      this.enableCustomization = this.favProfile?.find(x => x.favprofileid === val)?.isdefaultprofile === 1 ? false : true;
  
      //updating column headers attributes
      this.gridFilter.forEach((x: any) => {
        if (selectedColumns?.includes(x.headerValue) && x.headerValue != 'Select') {
          x.showDefault = true;
        }
        else {
          x.showDefault = false;
        }
      });
  
      //deselecting all options and select only the fav columns
      this.select.options.forEach((item: MatOption, index) => { if (index != 0) item.deselect() });
      this.select.options.forEach((item: MatOption) => {
        if (selectedColumns?.includes(item.value)) {
          newStatus = false;
          item.select();
        }
      });
      let actualCols = this.ColumnDetails.filter(x => x.headerValue != 'Select').map(x => x.headerValue).length;
      selectedColumns = selectedColumns.filter((x: any) => x != 'Select');
      this.allSelected = (actualCols === selectedColumns.length) ? true : false;
      this.dataColumns = this.tableitem?.selectCheckbox ? ['Select'].concat(selectedColumns) : selectedColumns;
      if (this.tableitem?.isCustomFooter) this.footerColumns = this.dataColumns.map(x => `f2_${x}`);
    }
  
    copyToClipboard() {
    
      let data = "";
  
      this.selection.selected.forEach((row: any, index) => {
        //console.log('row data',row);
        delete row.Link
        if (index === 0) {
          let tablehead = this.gridFilter.filter(x => x.headerValue != 'View' &&  x.headerValue != 'Inventory' && this.select?.value?.includes(x.headerValue)).map(e => e.header);
          let  datahead   = tablehead.toString().replace(/[,]+/g, '\t') + "\n";
          data =datahead.toString().replace('Inventory', '');
        }
        let tabValue: string[] = []
        this.select?.value?.forEach((x: string) => {
          if (x != 'View'&&x != 'Inventory') tabValue.push(row[x] || ' ')
        })
        data += tabValue.join('$$').replace(/[$$]+/g, '\t') + "\n";
      });
      return data;
    }
  
    RequestExport2Excel() {
      debugger;
      let ColumnMapping: any = []
      //let tempColumns:string =''
      let temp: any = {}
      this.gridFilter.forEach(x => {
        if (x.headerValue != 'View' && this.select.value.includes(x.headerValue)) {
          //console.log(`"${x.headerValue}":"${x.header}"`)
          //tempColumns +=`'${x.headerValue}':'${x.header}',`
          temp[x.headerValue] = x.header
          //ColumnMapping.push([[x.headerValue, x.header]].reduce((obj, d) => Object.assign(obj, { [d[0]]: d[1] }), {}))        
        }
      });
      //ColumnMapping.push(`{${tempColumns}}`)
      ColumnMapping.push(temp)
      //console.log(ColumnMapping,'columnMapping')
  
      const exportConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '300px', disableClose: true, data: {
          message: 'Do you want to Export this Report?'
        }
      });
      exportConfirm.afterClosed().subscribe(confirm => {
        this.isExportDisable = true;
        if (confirm) {
          let request = Utils.preparePyQuery(this.screenIdentifier, this.reportIdentifier, this.excelQueryObj, [{ "isExporttoExcel": "Y" }, { 'ColumnMapping': ColumnMapping }]);
          this.service.queryDetails(request).subscribe(x => {
            //update msg
            const excelDetail = this.dialog.open(ConfirmDialogComponent, {
              width: '680px', disableClose: true, data: {
                // message: `Add your content here use break for adding new line? <br/>
                message:
                  `Please Note the following:<br/>
                  1. Excel spreadsheets can take some time to produce and there may be delay of up to 15 minutes.<br/>
                  2. The background processing is performed in order of user requests.<br/>
                  3. The file name will be<strong> ${x.data.ExportData[0].FileName}</strong> .<br/>
                  4. The progress can be monitored by clicking on excel reports icon towards the right on top corner.<br/>
                  5. When spread sheet is available,clicking on the file name will allow to download to the local disk.<br/>
                  6. The previous week spread sheet will be deleted.<br/>`
                //  ${JSON.stringify(x.data.ExportData)}`
              }
            });
            excelDetail.afterClosed().subscribe();
          });
        }
      });
  
      //console.log(this.ColumnDetails, selectedColumns)
      //this.requestExport2Excel.emit(excelHeaderParams);
    }
  
    
    createProfile() {
      let selectedCols: string[] = [];
      this.select.options.forEach((item: MatOption) => {
        if (item.selected) {
          selectedCols.push(item.value)
        }
      });
  
      let dialogRef = this.dialog.open(ProfileCreationDialogComponent, {
        width: '250px',
        data: { selectedColsArray: selectedCols }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.isExportDisable = true;
        if (result != '') {
          debugger;
          var profileName = this.userDetails.username + '-' + result;
          var profile: FavoriteProfile = { reportname: this.reportIdentifier, favprofname: profileName, favprofileid: result, favcolumnlist: selectedCols.toString(), isdefaultprofile: 0, issharedprofile: 0 };
          let request = Utils.preparePyUICreate('ManageUsers', 'FavouriteProfile', 'ReportMenuItem', profile)
          this.service.uiApiDetails(request, WebMethods.UICREATE).subscribe(response => {
            if (response.Status[0].StatusCode === 'PY1000') {
              profile.favprofileid = response.Data[0].favprofileid;
              this.favProfile.push(profile);
              this.alertService.success("User Profile Created Successfully!", { autoClose: true, keepAfterRouteChange: false });
              this.selectedUserProfileId = profile.favprofileid;
              this.getSelectedProfile(this.selectedUserProfileId);
            }
          });
        }
      });
  
    }
  
    promoteProfile() {
      var selectedProfile = this.favProfile.find(x => x.favprofileid === this.selectedUserProfileId);
      const deleteConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px', disableClose: true, data: {
          message: !selectedProfile?.favprofname.startsWith('All') ? 'Do you want to promote this report to All Users?'
            : 'Do you want make this report for private use only?'
        }
      });
      deleteConfirm.afterClosed().subscribe(result => {
        if (result) {
          let selectedCols: string[] = [];
          var profileName: string = '';
          this.select.options.forEach((item: MatOption) => {
            if (item.selected) {
              selectedCols.push(item.value)
            }
          });
  
          if (selectedProfile?.favprofname.startsWith('All')) {
            profileName = selectedProfile?.favprofname.replace('All', this.userDetails.username);
          } else if (selectedProfile?.favprofname.startsWith(this.userDetails.username)) {
            profileName = selectedProfile?.favprofname.replace(this.userDetails.username, 'All');
          }
  
          var profile: FavoriteProfile = { reportname: this.reportIdentifier, favprofname: profileName, favprofileid: selectedProfile?.favprofileid, favcolumnlist: selectedCols.toString(), isdefaultprofile: 0, issharedprofile: 1 };
          let request = Utils.preparePyUIUpdate('ManageUsers', 'FavouriteProfile', 'favprofileid', profile)
          this.service.uiApiDetails(request, WebMethods.UIUPDATE).subscribe(response => {
            if (response.Status[0].StatusCode === 'PY1000') {
              this.favProfile = this.favProfile.filter(x => x.favprofileid != profile.favprofileid);
              profile.favprofname = profileName;
              this.favProfile.push(profile);
              this.alertService.success("User Profile Promoted Successfully!", { autoClose: true, keepAfterRouteChange: false });
              this.selectedUserProfileId = profile.favprofileid;
              this.getSelectedProfile(this.selectedUserProfileId);
            }
          });
        }
      });
    }
  
    deleteProfile() {
      const deleteConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '300px', disableClose: true, data: {
          message: 'Do you want to Delete this User profile?'
        }
      });
      deleteConfirm.afterClosed().subscribe(result => {
        if (result) {
          let data = {
            favprofileid: this.selectedUserProfileId
          }
          let request = Utils.preparePyUIDelete('ManageUsers', 'FavouriteProfile', 'favprofileid', data)
          this.service.uiApiDetails(request, WebMethods.UIDELETE).subscribe(result => {
            if (result.Status[0].StatusCode === 'PY1000') {
              this.alertService.success("User Profile Deleted Successfully!", { autoClose: true, keepAfterRouteChange: false });
              this.favProfile = this.favProfile.filter(x => x.favprofileid != this.selectedUserProfileId);
              this.selectedUserProfileId = this.favProfile.find(x => x.isdefaultprofile === 1)?.favprofileid ? this.favProfile.find(x => x.isdefaultprofile === 1)?.favprofileid : 0;
              this.getSelectedProfile(this.selectedUserProfileId);
            }
          });
        }
      });
    }
  
    loadFavProfile() {
      debugger;
      if (this.reportIdentifier) {
        let request = Utils.preparePyUIQuery('ManageUsers', 'FavouriteProfile', 'favprofileid', null, this.reportIdentifier)
        this.service.uiApiDetails(request, WebMethods.UIQUERY).subscribe(result => {
          if (result) {
            this.favProfile = result.Data;
            this.selectedUserProfileId = this.favProfile.find(x => x.isdefaultprofile === 1)?.favprofileid ? this.favProfile.find(x => x.isdefaultprofile === 1)?.favprofileid : 0;
            this.getSelectedProfile(this.selectedUserProfileId);
          }
        });
      }
      else {
        this.showFavCols = false;
      }
    }
  }
