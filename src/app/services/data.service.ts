import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserService } from "./user.service";
import { throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Observable, of, forkJoin } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";

interface responseGet {
  timestamp?: string;
  status?: number;
  message?: string;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(() => new Error(error.error));
  }

  public sendGetRequest(url: any, param?: any) {
    let httpOptions: any = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    if (param) {
      httpOptions["params"] = param;
    }

    return this.httpClient.get<responseGet>(environment.base_url + url, httpOptions).pipe(catchError(this.handleError));
  }

  public sendPostRequest(url: any, body: any, param?: any) {
    let httpOptions: any = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    if (param) {
      httpOptions["params"] = param;
    }

    return this.httpClient
      .post<responseGet>(environment.base_url + url, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public sendPostImgRequest(url: any, body: any, param?: any) {
    let httpOptions: any = {
      headers: new HttpHeaders(),
    };
    if (param) {
      httpOptions["params"] = param;
    }
    // console.log("u", url, body, httpOptions);

    return this.httpClient.post(environment.base_url + url, body, httpOptions); //.pipe(catchError(this.handleError));
  }

  public sendPutImgRequest(url: any, body: any, param?: any) {
    let httpOptions: any = {
      headers: new HttpHeaders(),
    };
    if (param) {
      httpOptions["params"] = param;
    }
    console.log("u", url, body, httpOptions);

    return this.httpClient.put(environment.base_url + url, body, httpOptions).pipe(catchError(this.handleError));
  }

  public sendPutRequest(url: any, body: any, param?: any) {
    let httpOptions: any = {
      headers: new HttpHeaders(),
    };
    if (param) {
      httpOptions["params"] = param;
    }
    return this.httpClient.put(environment.base_url + url, body, httpOptions).pipe(catchError(this.handleError));
  }

  public sendDeleteRequest(url: any, param?: any) {
    let httpOptions: any = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    if (param) {
      httpOptions["params"] = param;
    }

    return this.httpClient.delete(environment.base_url + url, httpOptions).pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<any> {
    if (!email || !password) {
      return of(null);
    }
    const body = { userName: email, password: password };
    return this.httpClient.post(environment.base_url + "jmc/api/v1/login", body).pipe(catchError(this.handleError));
  }

  forJoinGetSTRPolyLine(urlParamsList: Array<string>): Observable<any> {
    //let newUrl : string = `${environment.snapToRoadUrl}` + urlparams + `${environment.apiKey}`;
    var snapToRoadMultiRequest: Array<Observable<any>> = [];
    urlParamsList.forEach((element) => {
      var request = this.httpClient.get(
        `${environment.snapToRoadUrl}` + element + "&interpolate=true" + `${environment.apiKey}`
      );
      snapToRoadMultiRequest.push(request);
    });

    return forkJoin(snapToRoadMultiRequest);
  }

  getPDF(url: any, param?: any): Observable<Blob> {
    var main_url = environment.base_url + url;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      responseType: "blob",
    });

    let httpOptions = {
      headers: new HttpHeaders(),
      responseType: "blob" as "json",
      params: {},
    };

    if (param) {
      httpOptions.params = param;
    }

    return this.httpClient.get<Blob>(main_url, httpOptions);
  }

  getPdf2(url: any) {
    var main_url = url;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      responseType: "blob",
    });

    let httpOptions = {
      headers: new HttpHeaders(),
      responseType: "blob" as "json",
    };

    return this.httpClient.get<Blob>(main_url, httpOptions);
  }

  getAddress(lat: number, lng: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let url: string =
        `${environment.googleBaseUrl}` + "latlng=" + lat + "," + lng + "&key=" + `${environment.MAP_API_KEY}`;
      this.httpClient.get(url).subscribe((resp) => {
        // console.log("re", resp);
        resolve(resp);
        // INFO: Below logic to handle OVER_QUERY_LIMIT error
        // if(resp['status'] == "OVER_QUERY_LIMIT"){
        //  setTimeout(()=>{
        //      this.getAddress(lat, lng);
        //   },500)
        // }else{
        // resolve(resp);
        //  }
      });
    });
  }

  getData(url: string, fileName: String): Observable<string> {
    return this.httpClient
      .get(url, { responseType: "blob" })
      .pipe(switchMap((response) => this.readFile(response, fileName)));
  }

  private readFile(blob: Blob, fileName: String): Observable<string> {
    return Observable.create((obs: any) => {
      const reader = new FileReader();

      reader.onerror = (err) => obs.error(err);
      reader.onabort = (err) => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      var file = new Blob([blob], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);

      // if you want to open PDF in new tab
      // window.open(fileURL);
      var a = document.createElement("a");
      a.href = fileURL;
      a.target = "_blank";
      a.download = String(fileName);
      document.body.appendChild(a);
      a.click();

      return reader.readAsDataURL(blob);
    });
  }

  getRandomData() {
    return this.httpClient.get("https://jsonplaceholder.typicode.com/todos");
  }
}
