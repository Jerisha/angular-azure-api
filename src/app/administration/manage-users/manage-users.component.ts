import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { Tab } from 'src/app/uicomponents/models/tab';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import { Select } from 'src/app/uicomponents/models/select';

export class TodoItemNode {
  children: TodoItemNode[] = [];
  label: string ;
  id:number;
  isChecked: boolean;
  isPlanType: boolean;
  claimId: number;


}

export class TodoItemFlatNode {
  label: string ;
  level: number;
  expandable: boolean ;
   id:number ;
  isChecked: boolean ;
   isPlanType: boolean ;
   claimId: number;
}
const TREE_DATA = [
  {
    name: 'Process Management',
    id:111,
    isChecked:true, 
     isPlanType: true,
     claimId:11111,
    children: [
      {
        name: 'Solicited/Internal Discrepancy Process',
        id:22,
        isChecked:true, 
         isPlanType: true,
         claimId:11111,
     
      },
      {
        name: 'Solicited Resolution Report',
        id:22,
        isChecked:true, 
         isPlanType: true,
         claimId:11111,
     
      },
      {
        name: 'Solicited Actions Report',
        id:22,
        isChecked:true, 
         isPlanType: true,
         claimId:11111,
     
      },
      {
        name: 'Unsolicited Process',
        id:22,
        isChecked:true, 
         isPlanType: true,
         claimId:11111,
     
      },
      {
        name: 'Unsolicited Actions Report',
        id:22,
        isChecked:true, 
         isPlanType: true,
         claimId:11111,
     
      },


    ]
  },
  {
    name: 'Record Creation',
    id:66,
    isChecked:false,
     isPlanType: true, 
     claimId:33333,
    children: [
      {
        name: 'Create Record',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Create Internal Cease',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },

    ]
  },
  {
    name: 'Audit Process Management',
    id:66,
    isChecked:false,
     isPlanType: true, 
     claimId:33333,
    children: [
      {
        name: 'Full Audit Details',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Audit Discrepancy Report',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'External Audit Details',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Full Audit History',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Audit User Action Summary',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Saparateinternal Audit',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      }
    ]
  },
  {
    name: 'Audit Process Management',
    id:66,
    isChecked:false,
     isPlanType: true, 
     claimId:33333,
    children: [
      {
        name: 'Full Audit Details',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Audit Discrepancy Report',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'External Audit Details',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Full Audit History',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Audit User Action Summary',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Saparateinternal Audit',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      }
    ]
  },
  {
    name: 'Inventory Records',
    id:66,
    isChecked:false,
     isPlanType: true, 
     claimId:33333,
    children: [
      {
        name: 'InFlight Records',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Telephone Range Report',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Transaction Details Records',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Full Audit History',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Audit User Action Summary',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Saparateinternal Audit',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      }
    ]
  },
  {
    name: 'Statistical Reports',
    id:66,
    isChecked:false,
     isPlanType: true, 
     claimId:33333,
    children: [
      {
        name: 'Transaction Trend for Source & Command',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
     
  
    ]
  },
  {
    name: 'Administration',
    id:66,
    isChecked:false,
     isPlanType: true, 
     claimId:33333,
    children: [
      {
        name: 'Audit Status Tracker',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Audit Data Files',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Restore Solicited Errors',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Data Correction Summary',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },

      {
        name: 'Unresolved Transaction',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Unresolved Errors',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      },
      {
        name: 'Manage Users',
        id:77,
        isChecked:false,
         isPlanType: true,
        claimId:44444444,
      }
      
    ]
  },
    {
      name: 'Configurational Reference Data',
      id:66,
      isChecked:false,
       isPlanType: true, 
       claimId:33333,
      children: [
        {
          name: 'Reference List',
          id:77,
          isChecked:false,
           isPlanType: true,
          claimId:44444444,
        }]
      
  },
  
];
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const item = obj[key];
      const node = new TodoItemNode();
      node.label = obj[key].name;
      node.id = obj[key].id;
      node.isChecked=  obj[key].isChecked;
 node.claimId=  obj[key].claimId;
 node.isPlanType=  obj[key].isPlanType;

      if (item != null) {
        if (typeof item === 'object'  && item.children!= undefined) { 
       

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
      parent.children.push({label: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.label = name;
    this.dataChange.next(this.data);
  }
}
/** Flat to-do item node with expandable and level information */


const ELEMENT_DATA = [
  {UserName:"Test User",Profile:"Custom",Active:"Yes",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"Admin User",Profile:"Admin",Active:"Yes",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"Admin User",Profile:"SuperAdmin",Active:"Yes",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"Admin User",Profile:"Custom",Active:"Yes",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"Admin User",Profile:"SuperAdmin",Active:"Yes",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"Test User",Profile:"SuperAdmin",Active:"Yes",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  
]
const UserOfReports = [{
  UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" }


]

const StartUpUserMessages = [{
  EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"}
];
const UserAccessDetails = [
  {UserName:"kashnji3",Profile:"Requester",Active:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"kashnji3",Profile:"Requester",Active:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"kashnji3",Profile:"Requester",Active:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"kashnji3",Profile:"Requester",Active:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"kashnji3",Profile:"Requester",Active:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {UserName:"kashnji3",Profile:"Requester",Active:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  ]
const UserProfiles = [
  {"ProfileName":"New","Description":"New Profile","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Test","Description":"Test Profile","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Requestor","Description":"Requestor Profile","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Administrator","Description":"Admin of OSN2","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Super Admin","Description":"Can view and perform all operations","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  ]
  
  const FilterListItems: Select[] = [
    { view: 'Amdocs SOM', viewValue: 'StartTelephoneNumber', default: true },
    { view: 'ONNET', viewValue: 'EndTelephoneNumber', default: false },
    { view: 'Ring Central', viewValue: 'Source', default: false },
    { view: 'Audit', viewValue: 'Command', default: false },
    { view: 'EDGE', viewValue: 'ErrorType', default: false },
    { view: 'ONNET', viewValue: 'ResolutionType', default: false },
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
      state('collapsed', style({ height: '0px' , width: '0px', padding: '0px', display: 'none', })),
      state('expanded', style({ minHeight: '50px' })),
      transition('expanded => collapsed', animate('500ms ease-in')),
      transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
  ],
  providers: [ChecklistDatabase]
})

export class ManageUsersComponent implements OnInit {
  isShow: boolean = false;
  showMenu: string = 'expanded';
  btAuditFileDetailsTable!: TableItem;
  tabs: Tab[] = [];
  tabsLeft: Tab[] = [];
  record:any;
  eventName:string ='Create';
  thisForm!: FormGroup;
  showDetails: boolean = false;
  referenceForm!: FormGroup;
  referenceUsernameform!: FormGroup;
  StartupUsermsgsForm!:FormGroup;
  UserProfileForm!:FormGroup;
  UserEditForm!:FormGroup;
  Header:string='';
  Acessrights: Access[] = [
    {value: '1', viewValue: 'Admin'},
    {value: '2', viewValue: 'SuperAdmin'},
    {value: '3', viewValue: 'Custom'}
  ];  
  filterItems: Select[] = FilterListItems;
  btAuditFileDetailsTableDetails: any = [
    { headerValue: 'ACTID', header: 'ACTID', showDefault: true, isImage: false },
    { headerValue: 'FileName',
    r: 'File Name', showDefault: true, isImage: false },
    { headerValue: 'CreatedOn', header: 'Created On', showDefault: true, isImage: false },
    { headerValue: 'DownloadFile', header: 'Download File', showDefault: true, isImage: true },

  ]
  selectedTab: number = 0;
  selectedTabLeft: number = 0;
  UserDetailsForm:boolean=false;
  StartupForm:boolean=false;
  UserProfilesForm:boolean=false;
  UserEditProfilesForm:boolean=false;
  isLeftPanel =false;
  datauserreports:any=UserOfReports;
  userreportscolums:any=['UserId','EmailAddress','MenuGroup','ReportName'];
  data0:any =  ELEMENT_DATA;
  displayedColumns0:any =['Actions','UserName','Profile','Active','EmailAddress','Country','TelephoneNo','Y/W/ID','CreatedOn','CreatedBy'];
  startupusermsgs:any=StartUpUserMessages;
  startupusermsgscols=['Actions','EmailAddress','ShowFrom','ExpiryDate','Message'];
  userprofilesdata:any=UserProfiles;
  userprofilescols=["Actions","ProfileName","Description","CreatedOn","CreatedBy"];
  displayedColumns1:any =['Actions','Menu Group','Screen Name','Access Level'];
 
  
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

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private database: ChecklistDatabase,private formBuilder: FormBuilder) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel,this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }
  //this.datasource.data=
   checkAll(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {

    if(this.treeControl.dataNodes[i].isChecked)
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      this.treeControl.expand(this.treeControl.dataNodes[i])
    }
  }

   GetCheckAll(){

    console.log( this.dataSource.data );
      // if( this.treeFlattener.flattenNodes[0].check) console.log(this.treeControl.dataNodes[i].id);
 
     
    // for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
     
    //   if(this.treeControl.dataNodes[i].isChecked) console.log(this.treeControl.dataNodes[i].id);

    // if(this.treeControl.dataNodes[i].isChecked){
    //   console.log('---------------------------------------------');
    //     console.log(this.treeControl.dataNodes[i].id);
    //     console.log(this.treeControl.dataNodes[i].claimId);

    // }
   // }
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.label === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.label === node.label
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.label = node.label;
    flatNode.level = level;
    flatNode.id=node.id;
     flatNode.isChecked = node.isChecked;
     flatNode.claimId = node.claimId;
     flatNode.isPlanType = node.isPlanType;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
     this.checklistSelection.isSelected(child))
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
  
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    node.isChecked ?  node.isChecked=false:node.isChecked=true; 
    this.checkAllParentsSelection(node);
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
    const descAllSelected = descendants.every(child =>
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
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }

  ngOnInit(): void {
    // this.thisForm =  this.formBuilder.group({
    //   UserId: new FormControl({ value: 'ashok' }'')
    // })
    this.isLeftPanel=false;
   
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {
    this.isShow = false;
    this.showMenu = 'expanded';
    }
  }
  removeTabLeftPanel(index: number) {
    this.tabsLeft.splice(index, 1);
    this.showDetails = this.tabsLeft.length > 0 ? true : false;
    if(this.tabsLeft.length == 0) {
    //this.isShow = false;
    this.showMenu = 'expanded';
  this.isLeftPanel=false;
    }

  }

  getFileDetailsLeftPanel(fileType: string) {
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
    else if (fileType === 'UserOfReports'){
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'User Of Reports'
        });
        
      }
    }
    else if (fileType === 'StartUpUserMessages'){
      if (!this.tabs.find(x => x.tabType == 2)) {
        this.tabs.push({
          tabType: 2,
          name: 'Start Up User Messages'
        });
        
      }
    }
    else if (fileType === 'UserProfiles'){
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


  getFileDetails(fileType: string) {
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (fileType === 'UserAccessDetails') {
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'User Access Details'
        });
        this.btAuditFileDetailsTable = {
          data: of({datasource:ELEMENT_DATA,
            totalrecordcount: 100,
            totalpages:1,
            pagenumber:1}),
          Columns: this.btAuditFileDetailsTableDetails,
          selectCheckbox: true,
          imgConfig: [{ headerValue: 'DownloadFile', icon: 'save_alt', route: '', tabIndex: 1 }]
        }
      }
    }
    else if (fileType === 'UserOfReports'){
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'User Of Reports'
        });
        
      }
    }
    else if (fileType === 'StartUpUserMessages'){
      if (!this.tabs.find(x => x.tabType == 2)) {
        this.tabs.push({
          tabType: 2,
          name: 'News Update'
        });
        
      }
    }
    else if (fileType === 'UserProfiles'){
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

  btnClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';

  }
  onCancel(){
    this.isLeftPanel = false;
  }
  onEditUserprofile(record:any,event:Event)
  {
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
    else{
    this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 1);
    }
    
    this.Header="User Profiles";
    this.UserDetailsForm=false;
    this.UserEditProfilesForm=false;
    this.StartupForm=false;
    this.UserProfilesForm=true;

    this.isLeftPanel =true;
    this.UserProfileForm = this.formBuilder.group({
      ProfileName: new FormControl({ }),
      Description: new FormControl({}),
      UserProfile: new FormControl({})

    });
    this.record = record;
    this.eventName ='Update';
    for (let field in this.UserProfileForm.controls) 
    {      
        let control = this.UserProfileForm.get(field);    
        control?.setValue(record[field]);
        console.log(record[field]);
    }
    event.stopPropagation();
  }
  onSelectEvent(value: any){

    if(value=='3')
    {
    this.onEditUserprofileAceess('Create');
    }
  }
  // onEdituserDetails(record:any,event:Event){   
  //   this.Header="User Access Details";
  //   this.UserDetailsForm=true;
  //   this.StartupForm=false;
  //   this.UserProfilesForm=false;
  //   this.isLeftPanel =true;
  //   console.log('Edit Record');
  //   this.eventName="Update";
  //   debugger
  //   this.referenceForm = this.formBuilder.group({
      
  //     UserID: new FormControl({ value:''}),
  //     //AddressLine1: new FormControl({ value:''}),
  //     //AddressLine2: new FormControl({ value:''}),
  //     //PostCode: new FormControl({ value:''}),
  //     UserProfile: new FormControl({ value:''}),
  //     YID: new FormControl({ value:''}),
  //     FirstName: new FormControl({ value:''}),
  //     EmailAddress: new FormControl({ value:''}),
  //     TelephoneNo: new FormControl({ value:''}),
  //     Country: new FormControl({ value:''})
  //   });
   
  //     this.record = record;
  //     this.eventName ='Update'
  //     //this.showDataform =true; 
  //     //this.cdr.detectChanges();
  //     for (let field in this.referenceForm.controls) 
  //     {      
  //         let control = this.referenceForm.get(field);    
  //         control?.setValue(record[field]);
  //         console.log(record[field]);
  //     }
      
  //     //this.referenceForm.markAsUntouched();
      
  // }
  onreturnform()
  {
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find(x => x.tabType == 2)) {
      this.tabsLeft.push({
        tabType: 2,
        name: 'Add Profile'
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else{
    this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 2);
    }
    this.Header="User Access Details";
    this.UserDetailsForm=true;
    this.UserEditProfilesForm=false;
    
    this.StartupForm=false;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    console.log('Edit Record');
    this.eventName="Update";
  }
  onEditUserprofileAceess(Actiontype:string)
  {
    this.isShow = true;
    this.showMenu = 'collapsed';
    let name='Profile';
    if(Actiontype=='Create')
  {
    name='Add Prfile'
  }
    if (!this.tabsLeft.find(x => x.tabType == 2)) {
      this.tabsLeft.push({
        tabType: 2,
        name: name
      });
      this.showDetails = true;
      this.selectedTabLeft = this.tabsLeft.length;
    }
    else{
    this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 2);
    }
    this.Header="User Profiles";
    this.UserDetailsForm=false;
    this.StartupForm=false;
    this.UserEditProfilesForm=true;
    this.isLeftPanel =true;
    this.UserEditForm = this.formBuilder.group({
      
      ProfileName: new FormControl(),
      Description: new FormControl(),
      UserProfile: new FormControl()

    });
  if(Actiontype=='Create')
  {
    this.eventName ='Create';
  }
  else{
    this.eventName ='Update';
  }
  
  }



  onEditUsermsgs(record:any,event:Event)
  {
    this.tabsLeft.splice(0);
    this.Header="Start Up User Messages";
    console.log(JSON.stringify(record));
    this.UserDetailsForm=false;
    this.StartupForm=true;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    this.StartupUsermsgsForm = this.formBuilder.group({
      ShowFrom: new FormControl(),
      Message: new FormControl(),
      ExpiryDate: new FormControl(),
      EmailAddress: new FormControl()
    });
    this.record = record;
    console.log('usermsgs'+this.record);
    this.eventName ='Update';
    for (let field in this.StartupUsermsgsForm.controls) 
    {      
        let control = this.StartupUsermsgsForm.get(field);    
        control?.setValue(record[field]);
        console.log(record[field]);
    }

  }
  changeevent(event:any) {
    console.log('event called',event);
  }

  onEdituserDetails(record:any,event:Event){   
    this.isShow = true;
    this.showMenu = 'collapsed';
    if (!this.tabsLeft.find(x => x.tabType == 0)) {
      this.tabsLeft.push({
        tabType: 0,
        name: 'Create'
      });
      this.showDetails = true;
    this.selectedTabLeft = this.tabsLeft.length;
    }
    else{
      this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 0);
    }
   


    this.Header="User Access Details";
    this.UserDetailsForm=true;
    this.StartupForm=false;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    console.log('Edit Record');
    this.eventName="Update";
    debugger
    this.referenceForm = this.formBuilder.group({
      
      UserID: new FormControl({ value:''}),
      //AddressLine1: new FormControl({ value:''}),
      //AddressLine2: new FormControl({ value:''}),
      //PostCode: new FormControl({ value:''}),
      UserProfile: new FormControl({ value:''}),
      YID: new FormControl({ value:''}),
      FirstName: new FormControl({ value:''}),
      EmailAddress: new FormControl({ value:''}),
      TelephoneNo: new FormControl({ value:''}),
      Country: new FormControl({ value:''})
    });
   
      this.record = record;
      this.eventName ='Update'
      //this.showDataform =true; 
      //this.cdr.detectChanges();
      for (let field in this.referenceForm.controls) 
      {      
          let control = this.referenceForm.get(field);    
          control?.setValue(record[field]);
          console.log(record[field]);
      }
      
      //this.referenceForm.markAsUntouched();
      
  }
  onCreateUserProfiles()
  {
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
    else{
      this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 1);
      }
   
    this.Header="User Profiles";
    this.UserDetailsForm=false;
    this.StartupForm=false;
    this.UserProfilesForm=true;
    this.isLeftPanel =true;
    this.UserProfileForm = this.formBuilder.group({
      ProfileName: new FormControl(),
      Description: new FormControl(),
      UserProfile: new FormControl()
    });
    this.eventName="Create";
  }
  onCreateuserMsgs()
  {
    this.Header="Start Up User Messages";
    this.UserDetailsForm=false;
    this.StartupForm=true;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    this.StartupUsermsgsForm = this.formBuilder.group({
      ShowFrom: new FormControl(),
      Message: new FormControl(),
      ExpiryDate: new FormControl(),
      EmailAddress: new FormControl()
    });
    this.eventName="Create";
  }

onVerifyUserName()
{
  this.isShow = true;
  this.showMenu = 'collapsed';
  if (!this.tabsLeft.find(x => x.tabType == 3)) {
    this.tabsLeft.push({
      tabType: 3,
      name: 'Check'
    });
    this.showDetails = true;
  this.selectedTabLeft = this.tabsLeft.length;
  }
  else{
    this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 3);
  }
  this.isLeftPanel =true;
  this.referenceUsernameform = this.formBuilder.group({
      
    UserID: new FormControl()
  });
}



  onCreateuserDetails()
{
  debugger
  if (this.tabsLeft.find(x => x.tabType == 3)) {
    let index:number = this.tabsLeft.findIndex(x => x.tabType == 3);
    this.tabsLeft.splice(index) ;
  }
  this.isShow = true;
  this.showMenu = 'collapsed';
  if (!this.tabsLeft.find(x => x.tabType == 0)) {
    this.tabsLeft.push({
      tabType: 0,
      name: 'Create'
    });
    this.showDetails = true;
  this.selectedTabLeft = this.tabsLeft.length;
  }
  else{
    this.selectedTabLeft = this.tabsLeft.findIndex(x => x.tabType == 0);
  }
  this.Header="User Access Details";
  this.UserDetailsForm=true;
  this.StartupForm=false;
  this.UserProfilesForm=false;
  this.isLeftPanel =true;
  this.referenceForm = this.formBuilder.group({
      
    UserID: new FormControl(),
   // AddressLine1: new FormControl(),
   // AddressLine2: new FormControl(),
   // PostCode: new FormControl(),
    UserProfile: new FormControl(),
    YID: new FormControl(),
    FirstName: new FormControl(),
    TelephoneNo:new FormControl(),
    EmailAddress: new FormControl(),
    Country: new FormControl()
  });
  this.eventName="Create";
}
onSubmit(){
 // alert("Create/Edit Completed..");
  this.isLeftPanel =false;
 // this.showDetailsForm=true;
}
onDeleteRecord(record:any,event:any){    
  alert("Delete starts..."+JSON.stringify(this.record));
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

}
