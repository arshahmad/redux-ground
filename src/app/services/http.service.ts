import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()

export class HttpService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) {
  }

  get(url: string, params?: any): Observable<any> {
    const data = {params}
    return this.httpClient.get(this.baseUrl + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  errorHandler(response: any) {
 const error = response.error;
 const keys = Object.keys(error);
 const key = keys[0]
 let message = error[key]
    if (response.status === 401) {
// auth token delete
      // redirect to login page
    }
    if (error[key] instanceof Array) {
    message = error[key][0];
    }
    if(key === "isTrusted") {
      //when internet fails
    } else {
      message = key + " : " + message;
    }
    //call toaster service and show error msg
    return throwError({messages: message, error: error});
  }
}
