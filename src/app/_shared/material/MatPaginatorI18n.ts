import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorI18n extends MatPaginatorIntl {
  // itemsPerPageLabel = 'Show';
  // nextPageLabel = 'Next page';
  // previousPageLabel = 'Previous page';
  getRangeLabel = (page: number, pageSize: number, totalResults: number) => {
    if (!totalResults) { return 'No result'; }
    totalResults = Math.max(totalResults, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    let totalPages = Math.ceil(totalResults / pageSize)
    let pageNumber = `${this.numberWithCommas(page + 1)} of ${this.numberWithCommas(totalPages)}`;
    const endIndex =
      startIndex < totalResults ?
        Math.min(startIndex + pageSize, totalResults) :
        startIndex + pageSize;

    //return `Page ${pageNumber}, Records: ${startIndex + 1} - ${endIndex} of ${totalResults}`;
    return `Page ${pageNumber}, Records: ${this.numberWithCommas(totalResults)}`;
  }

  numberWithCommas(number: any) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}