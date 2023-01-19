import { MatPaginatorIntl } from "@angular/material/paginator"

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    getRangeLabel=(page:number, pageSize:number, length:number)=>{
      return ''
  
    }
  }