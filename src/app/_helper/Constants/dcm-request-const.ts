export const DCMRequests = {
    QUERY : {
        "RequestType": "QUERY",
        "UserParams": [
          {
            "UserID": "test@vodafone.com",
            "Destination": "DCM"
          }
        ],
        "RequestParams": [
          {
            "ReportIdenitifer": "SearchViewExtract",
            "SubReportName": "SearchViewExtract",
            "RecordIdentifier": "number_range",
            "PageNumber": 1,
            "RecordsPerPage": 500,
            "IsRemoveCache": 1,
            "IsExportToExcel": "N" 
          }
        ],
        "Data": [
          {
            "number_range": "1234",
            "number_range_type": "GEO"
          }
        ]
      }
}