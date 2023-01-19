import { DCMRequests } from 'src/app/_helper/index';

export class DCMUtils {
  static prepareQueryRequest(pageIdentifier: string, reportIdentifier: any, queryParams?: any): any {
    let transform = JSON.parse(JSON.stringify(DCMRequests.QUERY));
    transform.RequestParams[0] = reportIdentifier;
    transform.Data[0] = queryParams;
    return transform;
  }
}