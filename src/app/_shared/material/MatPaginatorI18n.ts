import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorI18n extends MatPaginatorIntl {
  itemsPerPageLabel = 'Records per page';
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  getRangeLabel = (page: number, pageSize: number, totalResults: number) => {
    if (!totalResults) { return 'No result'; }
    totalResults = Math.max(totalResults, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < totalResults ?
        Math.min(startIndex + pageSize, totalResults) :
        startIndex + pageSize; return `${startIndex + 1} - ${endIndex} of ${totalResults}`
      ;
  }
}