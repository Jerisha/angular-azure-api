import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  columnsToDisplay = ['olo', 'title', 'usedOloFrnachise', 'Action'];
  columnsToDisplaysecondlevel = ['co', 'title', 'usedOloFrnachise', 'Action'];
  columnsToDisplaythirdlevel = ['Fran', 'title', 'usedOloFrnachise', 'Action'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnsToDisplayWithExpandtwo = [...this.columnsToDisplaysecondlevel, 'expand'];
  expandedElement: PeriodicElement | null;
  expandedElementtwo: PeriodicElement | null;
  datasourcetwo = ELEMENT_DATA_Two;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  olo: string;
  Action: string;
  title: string; 
  usedOloFrnachise: string;
  description: string;
}
export interface PeriodicElementtwo {
  co: string;
  Action: string;
  title: string; 
  usedOloFrnachise: string;
  description: string;
}
export interface PeriodicElementthree {
  Fran: string;
  Action: string;
  title: string; 
  usedOloFrnachise: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Action: '1',
    olo: 'ATC',
    title: '1.0079',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `ATC is a chemical element with usedOloFrnachise H and atomic number 1. With a standard
        atomic title of 1.008, ATC is the lightest element on the periodic table.`,
  },
  {
    Action: '2',
    olo: 'BLG',
    title: '4.0026',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `BLG is a chemical element with usedOloFrnachise He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    Action: '3',
    olo: 'BLB',
    title: '6.941',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `BLB is a chemical element with usedOloFrnachise Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    Action: '4',
    olo: 'BLB',
    title: '9.0122',
    usedOloFrnachise: 'BBLG BLG-CBL',
    description: `BLB is a chemical element with usedOloFrnachise Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    Action: '5',
    olo: 'BLB',
    title: '10.811',
    usedOloFrnachise: 'B',
    description: `BLB is a chemical element with usedOloFrnachise B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    Action: '6',
    olo: 'Carbon',
    title: '12.0107',
    usedOloFrnachise: 'C',
    description: `Carbon is a chemical element with usedOloFrnachise C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    Action: '7',
    olo: 'BLB',
    title: '14.0067',
    usedOloFrnachise: 'N',
    description: `BLB is a chemical element with usedOloFrnachise N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    Action: '8',
    olo: 'BLB',
    title: '15.9994',
    usedOloFrnachise: 'O',
    description: `BLB is a chemical element with usedOloFrnachise O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    Action: '9',
    olo: 'BLB',
    title: '18.9984',
    usedOloFrnachise: 'F',
    description: `BLB is a chemical element with usedOloFrnachise F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    Action: '10',
    olo: 'Neon',
    title: '20.1797',
    usedOloFrnachise: 'Ne',
    description: `Neon is a chemical element with usedOloFrnachise Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];
const ELEMENT_DATA_Two: PeriodicElementtwo[] = [
  {
    Action: '1',
    co: 'ATC',
    title: '1.0079',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `ATC is a chemical element with usedOloFrnachise H and atomic number 1. With a standard
        atomic title of 1.008, ATC is the lightest element on the periodic table.`,
  },
  {
    Action: '1',
    co: 'ATC',
    title: '1.0079',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `ATC is a chemical element with usedOloFrnachise H and atomic number 1. With a standard
        atomic title of 1.008, ATC is the lightest element on the periodic table.`,
  },
  {
    Action: '1',
    co: 'ATC',
    title: '1.0079',
    usedOloFrnachise: 'BLG BLG-CBL',
    description: `ATC is a chemical element with usedOloFrnachise H and atomic number 1. With a standard
        atomic title of 1.008, ATC is the lightest element on the periodic table.`,
  },
];
