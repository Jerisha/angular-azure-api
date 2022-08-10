import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FranchiseComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Action','usedOloFrnachise','olo','Company','Franchise','FranchiseTitle','used' ];
  columnsToDisplaysecondlevel = ['Action','usedOloFrnachise','olo','company','Franchise','FranchiseTitle','used'];
  columnsToDisplaythirdlevel = ['Action','usedOloFrnachise','olo','company','Franchise','FranchiseTitle','used'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnsToDisplayWithExpandtwo = [...this.columnsToDisplaysecondlevel, 'expand'];
  // columnsToDisplayWithExpandthree = [...this.columnsToDisplaythirdlevel, 'expand'];
  expandedElement: PeriodicElement | null;
  expandedElementtwo: PeriodicElement | null;
  expandedElementthree: PeriodicElement | null;
  datasourcetwo = ELEMENT_DATA_Two;
  datasourcethree=ELEMENT_DATA_Three;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  olo: string;
  Action: string;
  title: string; 
  company:string;
  franchise:string;
  franchisetitle:string;
  usedOloFrnachise: string;
  used:string;
  description: string;
}
export interface PeriodicElementtwo {
  olo: string;
  Action: string;
  title: string; 
  company:string;
  franchise:string;
  franchisetitle:string;
  usedOloFrnachise: string;
  used:string;
  description: string;
}
export interface PeriodicElementthree {
  olo: string;
  Action: string;
  title: string; 
  company:string;
  Franchise:string;
  franchisetitle:string;
  usedOloFrnachise: string;
  used:string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    title: '',
    used:'',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `ATC is a chemical element with usedOloFrnachise H and atomic number 1. With a standard
        atomic title of 1.008, ATC is the lightest element on the periodic table.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    title: '',
    used:'',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `BLG is a chemical element with usedOloFrnachise He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `BLB is a chemical element with usedOloFrnachise Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'BBLG BLG-CBL',
    description: `BLB is a chemical element with usedOloFrnachise Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'B',
    description: `BLB is a chemical element with usedOloFrnachise B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'N',
    description: `BLB is a chemical element with usedOloFrnachise N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'O',
    description: `BLB is a chemical element with usedOloFrnachise O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'F',
    description: `BLB is a chemical element with usedOloFrnachise F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    Action: '',
    olo: 'BLG',
    company:'',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'Ne',
    description: `Neon is a chemical element with usedOloFrnachise Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];
const ELEMENT_DATA_Two: PeriodicElementtwo[] = [
  {
    Action: '',
    olo: 'BLG',
    company:'ATC',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`, },
  {
    Action: '',
    olo: 'ATC',
    company:'ATC',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,  },
  {
    Action: '',
    olo: 'BLG',
    company:'ATC',
    franchise:'',
    franchisetitle:'',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,  },
];
const ELEMENT_DATA_Three: PeriodicElementthree[] = [
  {
    Action: '',
    olo: 'BLG',
    company:'ATC',
    Franchise:'CBL',
    franchisetitle:'Test-123',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`, },
  {
    Action: '',
    olo: 'ATC',
    company:'ATC',
    Franchise:'CBL',
    franchisetitle:'Test-123',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,  },
  {
    Action: '',
    olo: 'BLG',
    company:'ATC',
    Franchise:'CBL',
    franchisetitle:'Test-123',
    used:'',
    title: '',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,  },
];
