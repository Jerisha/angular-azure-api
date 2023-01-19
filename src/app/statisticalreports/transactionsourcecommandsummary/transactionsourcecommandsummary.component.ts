import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';



@Component({
  selector: 'app-transactionsourcecommandsummary',
  templateUrl: './transactionsourcecommandsummary.component.html',
  styleUrls: ['./transactionsourcecommandsummary.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TransactionsourcecommandsummaryComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
  data: User[] = USERS;
  olocompanyfranchise: string;
  olo: string;
  company: string;
  Franchise:string;
  FranchiseTitle:string;
  used:string;
  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ['Action','Expand','olocompanyfranchise', 'olo', 'company', 'Franchise', 'FranchiseTitle','used'];
  innerDisplayedColumns = ['Action','Expand','olocompanyfranchise', 'olo', 'company', 'Franchise', 'FranchiseTitle','used'];
  innerInnerDisplayedColumns = ['Action','Expand','olocompanyfranchise', 'olo', 'company', 'Franchise', 'FranchiseTitle','used'];
 
  expandedElements: any[] = [];
  step: number;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    USERS.forEach(user => {
      if (
        user.addresses &&
        Array.isArray(user.addresses) &&
        user.addresses.length
      ) {
        this.usersData = [
          ...this.usersData,
          { ...user, addresses: new MatTableDataSource(user.addresses) }
        ];
      } else {
        this.usersData = [...this.usersData, user];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<
          Address
        >).filter = filterValue.trim().toLowerCase())
    );
  }

  toggleRow(element: User) {
    element.addresses &&
    (element.addresses as MatTableDataSource<Address>).data.length
      ? this.toggleElement(element)
      : null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<
          Address
        >).sort = this.innerSort.toArray()[index])
    );
  }

  isExpanded(row: User): string {
    const index = this.expandedElements.findIndex(x => x.olocompanyfranchise == row.olocompanyfranchise);
    if (index !== -1) {
      return 'expanded';
    }
    return 'collapsed';
  }
  setStep(index: number) {
    this.step = index;
    }
  setAddressDetails(section: string, element: any) {
    // console.log(element.details.postcode);
    
    }
  toggleElement(row: User) {
    const index = this.expandedElements.findIndex(x => x.olocompanyfranchise == row.olocompanyfranchise);
    if (index === -1) {
      this.expandedElements.push(row);
    } else {
      this.expandedElements.splice(index, 1);
    }

    //console.log(this.expandedElements);

  }
  expandedElement: PeriodicElement | null | undefined;
}


export interface User {
  olocompanyfranchise: string;
  olo: string;
  company: string;
  Franchise:string;
  FranchiseTitle:string;
  used:string;
  addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Comment{
  olocompanyfranchise: string;
  olo: string;
  company: string;
  Franchise:string;
  FranchiseTitle:string;
  used:string
}

export interface Address {
  olocompanyfranchise: string;
  olo: string;
  company: string;
  Franchise:string;
  FranchiseTitle:string;
  used:string;
  comments?: Comment[] | MatTableDataSource<Comment>;
}

const USERS: User[] = [
  {
    olocompanyfranchise: 'ATC',
    olo: 'ATC',
    company: '',
    FranchiseTitle:'',
    Franchise:'',
    used:'3',
    addresses: [
      {
        olocompanyfranchise: 'ATC-ATC',
        olo: '',
        company: 'ATC',
        FranchiseTitle:'',
        Franchise:'',
        used:'3',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: '',
            company: '',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: '',
            company: '',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },{
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: '',
            company: '',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC-ATC',
        olo: '',
        company: 'ATC',
        FranchiseTitle:'',
        Franchise:'',
        used:'',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          }
        ]
      }
    ]
  },
 
  {
    olocompanyfranchise: 'ATC',
    olo: 'ATC',
    company: '',
    FranchiseTitle:'',
    Franchise:'',
    used:'3',
    addresses: [
      {
        olocompanyfranchise: 'ATC-ATC',
        olo: 'ATC',
        company: 'ATC',
        FranchiseTitle:'',
        Franchise:'',
        used:'3',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },{
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        olo: 'ATC',
        company: '',
        FranchiseTitle:'',
        Franchise:'',
        used:'',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATC',
    olo: 'ATC',
    company: '',
    FranchiseTitle:'',
    Franchise:'',
    used:'3',
    addresses: [
      {
        olocompanyfranchise: 'ATC-ATC',
        olo: 'ATC',
        company: 'ATC',
        FranchiseTitle:'',
        Franchise:'',
        used:'3',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },{
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC-ATC',
        olo: 'ATC',
        company: 'ATC',
        FranchiseTitle:'',
        Franchise:'',
        used:'',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            olo: 'ATC',
            company: 'ATC',
            FranchiseTitle:'Title',
            Franchise:'QWE',
            used:'1'
          }
        ]
      }
    ]
  }
];
interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
  }
  const ele: PeriodicElement[] = [];
