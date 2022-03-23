
import { Component,  OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder} from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-report-reference-main',
  templateUrl: './report-reference-main.component.html',
  styleUrls: ['./report-reference-main.component.css'],
  animations: [
    trigger('toggleMenu', [
    state('collapsed', style({ height: '0px' , width: '0px', padding: '0px', display: 'none', })),
    state('expanded', style({ maxHeight: '100px' })),
    transition('expanded => collapsed', animate('500ms ease-in')),
    transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
    ],
})
export class ReportReferenceMainComponent implements OnInit, AfterViewInit{

  reportNames!: string[];
  title:string="";
  reportName:string="";  
  showRighPane:boolean=false;

  isShow:boolean =false;
  showMenu: string = 'expanded';



  onMenuClicked(){
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    this.showRighPane =true;
    this.isShow =true;
  }


constructor(private cdr: ChangeDetectorRef,   
    private formBuilder: FormBuilder,
    private reportReferenceService: ReportReferenceService,
    
  ) { }
  ngAfterViewInit(): void { 
    this.cdr.detectChanges(); 
  }
  ngOnInit(): void { 
    // this.isShow=true;
    this.reportNames =this.reportReferenceService.reportNames;  
    
  }  

ngAfterViewChecked() 
  {
    this.cdr.detectChanges();
  }  
  
}