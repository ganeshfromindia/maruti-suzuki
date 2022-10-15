import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  /** CONSTRUCTOR ::
   * The constructor function is a default function that runs when the component is loaded. The private
   * variable _http is of type HttpClient. We are injecting the HttpClient into this component by
   * adding it into the constructor's parameter
   * @param {HttpClient} _http - HttpClient - This is the HttpClient service that we're injecting into
   * our service.
   */
  constructor(private _http: HttpClient) {}

  private _headers(): { headers: HttpHeaders } {
    const httpOptionsSamrx: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return httpOptionsSamrx;
  }

  /** PAGINATION-AUTOMATION ::
   * A function that returns a HttpParams object.
   * @param {number} [pageNumber] - The current page number, starting from 0
   * @param {number} [pageSize] - The number of records per page
   * @returns a HttpParams object with the pageNumber and pageSize appended to it.
   */
  private _pageAuto(pageNumber?: number, pageSize?: number, paramsOptional?: any) {
    let pageAuto: HttpParams = new HttpParams();
    if (pageNumber !== undefined) pageAuto = pageAuto.append("pageNumber", pageNumber);
    if (pageSize !== undefined) pageAuto = pageAuto.append("pageSize", pageSize);
    if (paramsOptional !== undefined)
      for (let key in paramsOptional)
        if (!!paramsOptional[key] || paramsOptional[key] === false)
          pageAuto = pageAuto.append(key, paramsOptional[key]);

    return pageAuto;
  }

  /** ERROR-HANDLER ::
   * If the error is a client-side error, log it to the console. If it's a server-side error, log it to
   * the console and return an error message to the user
   * @param {HttpErrorResponse} error - HttpErrorResponse
   * @returns An observable with a user-facing error message.
   */
  private _errorHandler(error: HttpErrorResponse) {
    return throwError(() => error); // Return an observable with a user-facing error message.
  }

  /** POST-METHOD ::
   * This function takes in a url, a body, and an optional httpHeaderOptional object. If the
   * httpHeaderOptional object is not passed in, the function will use the default headers. The
   * function then returns an observable of the response
   * @param {string} url - The url of the endpoint you want to hit.
   * @param {any} body - The body of the request.
   * @param [httpHeaderOptional] - This is an optional parameter. If you want to pass any custom
   * headers, you can pass it here.
   * @returns Observable<any>
   */
  public postMethod(apiUrl: string, body: object, httpHeaderOptional?: { headers: HttpHeaders }): Observable<any> {
    // httpHeaderOptional = httpHeaderOptional || this._headers();
    return this._http.post(`${environment.base_url}` + apiUrl, body, httpHeaderOptional).pipe(
      map((response) => response),
      catchError(this._errorHandler)
    );
  }

  /** GET-METHOD ::
   * This function is used to make a GET request to the API
   * @param {string} apiUrl - The API URL to be called.
   * @param {number} [pageNumber] - The page number of the data you want to get.
   * @param {number} [pageSize] - number - The number of items to be displayed per page.
   * @param {HttpParams | any} [paramsOptional] - This is an optional parameter. If you want to pass
   * any parameters to the API, you can pass it here.
   * @returns An observable of type any.
   */
  public getMethod(
    apiUrl: string,
    pageNumber?: number,
    pageSize?: number,
    paramsOptional?: HttpParams | any
  ): Observable<any> {
    let apiParams: HttpParams = this._pageAuto(pageNumber, pageSize, paramsOptional);

    return this._http.get(`${environment.base_url}` + apiUrl, { params: apiParams }).pipe(
      map((response) => response),
      catchError(this._errorHandler)
    );
  }

  /** UPDATE-METHOD ::
   * It takes in an API URL, a body object, and an optional HTTP header object, and returns an
   * observable of the response
   * @param {string} apiUrl - The API URL that you want to call.
   * @param {object} body - object - The body of the request.
   * @param [httpHeaderOptional] - This is an optional parameter. If you want to pass any custom
   * headers, you can pass it here.
   * @returns Observable<any>
   */
  public updateMethod(apiUrl: string, body: object, httpHeaderOptional?: { headers: HttpHeaders }): Observable<any> {
    return this._http.put(`${environment.base_url}` + apiUrl, body, httpHeaderOptional).pipe(
      map((response) => response),
      catchError(this._errorHandler)
    );
  }

  /** DELETE-METHOD ::
   * This function is used to make a delete request to the server
   * @param {string} apiUrl - The API URL that you want to call.
   * @param {any} [deleteId] - This is the first parameter that you want to pass to the API.
   * @returns The response from the API.
   */
  public deleteMethod(apiUrl: string, deleteId?: any): Observable<any> {
    let httpHeaderOptional = new HttpParams().append("id", deleteId);

    return this._http.delete(`${environment.base_url}` + apiUrl, { params: httpHeaderOptional }).pipe(
      map((response) => response),
      catchError(this._errorHandler)
    );
  }

  getImage(apiUrl: string): Observable<File> {
    let theImage: Observable<any> = this._http.get(`${environment.base_url}image?fileName=${apiUrl}`, {
      responseType: "blob",
    });
    return theImage;
  }
}
