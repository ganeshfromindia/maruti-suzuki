/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import {
  /* catchError, */ debounceTime,
  delay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/services/backend.service';

interface SearchResult {
  gasudata: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}



const ALL_GA_SU_DATA: any[] = [
  {
    id: 1,
    companyName: 'Manoj',
    emailId: 'manoj@gmail.com'
  },
  {
    id: 2,
    companyName: 'Shinoj',
    emailId: 'shinoj@gmail.com'
  },
  {
    id: 3,
    companyName: 'Rakesh',
    emailId: 'rakesh@gmail.com'
  },
  {
    id: 4,
    companyName: 'Ahmed',
    emailId: 'ahmed@gmail.com'
  },
  {
    id: 5,
    companyName: 'Prakash',
    emailId: 'prakash@gmail.com'
  },
  {
    id: 6,
    companyName: 'Mahesh',
    emailId: 'mahesh@gmail.com'
  },
  {
    id: 7,
    companyName: 'Ajit',
    emailId: 'ajit@gmail.com'
  },
  {
    id: 8,
    companyName: 'Sanjay',
    emailId: 'sanjay@gmail.com'
  },
  {
    id: 9,
    companyName: 'Pramod',
    emailId: 'pramod]@gmail.com'
  },
  {
    id: 10,
    companyName: 'Nayan',
    emailId: 'nayan@gmail.com'
  },
  {
    id: 11,
    companyName: 'Lajpat',
    emailId: 'lajpat@gmail.com'
  },
  {
    id: 12,
    companyName: 'Prathmesh',
    emailId: 'prathamesh@gmail.com'
  },
  {
    id: 13,
    companyName: 'Kedar',
    emailId: 'kedar@gmail.com'
  },
  {
    id: 14,
    companyName: 'Jitendra',
    emailId: 'jitendra@gmail.com'
  },
  {
    id: 15,
    companyName: 'Vinod',
    emailId: 'vinod@gmail.com'
  },
  {
    id: 16,
    companyName: 'Ketan',
    emailId: 'ketan@gmail.com'
  },
  {
    id: 17,
    companyName: 'Pruthvi',
    emailId: 'pruthvi@gmail.com'
  },
  {
    id: 18,
    companyName: 'Muthoot',
    emailId: 'muthoot@gmail.com'
  },
  {
    id: 19,
    companyName: 'Bhupendra',
    emailId: 'bhupendra@gmail.com'
  },
  {
    id: 20,
    companyName: 'Chiranjeevi',
    emailId: 'chiranjeevi@gmail.com'
  }
]
// function to search the term
function matches(gasudata: any, term: string, pipe: PipeTransform) {
  return (
    gasudata.companyName.toLowerCase().includes(term.toLowerCase()) 
  );
}

@Injectable({ providedIn: 'root' })
export class GaSearchUserService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _searchSD$ = new Subject<void>();
  private _searchgauserdata$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public all_ga_su_data: any[] = [];
  public _all_ga_su_data: any[] = [];
  public totalP: number = 0;

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
  };

  constructor(
    private pipe: DecimalPipe,
    private http: HttpClient,
    private _beService: BackendService
  ) {
    
  }
  // search when page, pagesize is clicked or when initial data is set (fired only once)
  // here take(1) is used to prevent multiple observables to be fired unlike above search where it is needed
  setData(total: any) {
    this.totalP = total;
    this._searchSD$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        take(1),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._searchgauserdata$.next(result.allgasudata);
        this._total$.next(this.totalP);
      });
    this._searchSD$.next();
  }

  get gaUserAllData$() {
    return this._searchgauserdata$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<any> {
    const {  pageSize, page, searchTerm } =
      this._state;


    let allgasudata = this.all_ga_su_data;

    // 2. filter
    allgasudata = allgasudata.filter((gasudata) =>
      matches(gasudata, searchTerm, this.pipe)
    );

    const total = allgasudata.length;

    // 3. paginate
    // allgasudata = allgasudata.slice(0, 0 + pageSize); // this line not needed in actual case
    allgasudata = allgasudata.slice((page - 1) * parseInt(pageSize.toString()), (page - 1) * parseInt(pageSize.toString()) + parseInt(pageSize.toString()));
    
    return of({ allgasudata, total });
  }

  // set table data
  getTableData(
    page: number,
    pageSize: number,
    urlHttpParams: any
    
  ) {
    this.handleUpdateResponse('abc')
    // return new Promise((resolve, reject) => {
    //   try {
    //     this._beService
    //       .getMethod(
    //         'get/company-list?',
    //         page,
    //         pageSize,
    //         urlHttpParams
    //       )
    //       .subscribe({
    //         next: (resolvedData) => {
    //           this.handleUpdateResponse(resolvedData);
    //           let alertsFetched = this.handleAlerts(resolvedData, false);
    //           resolve(alertsFetched);
    //         },
    //         error: (errorData) => {
    //           this.handleErrorPost(errorData);
    //           let alertsFetched = this.handleAlerts(errorData, true);
    //           resolve(alertsFetched);
    //         },
    //       });
    //   } catch (e) {
    //     let alertsFetched = this.handleAlerts(e, true);
    //     reject(alertsFetched);
    //   }
    // });
  }

  // handle success response
  handleUpdateResponse(data: any) {
    this.all_ga_su_data = this._all_ga_su_data = ALL_GA_SU_DATA;
    this.setData(ALL_GA_SU_DATA.length)
    // this.all_ga_su_data = this._all_ga_su_data = data.payLoad;
    // this.setData(data.totalRow);
  }

  // handle error response
  handleErrorPost(data: any) {
    this.all_ga_su_data.length = this._all_ga_su_data.length = 0;
    this.setData(0);
    this._loading$.next(false);
  }

  // handle alert data to be shown in success or error case
  handleAlerts(data: any, status: boolean) {
    let alertsObj: any = {};
    alertsObj.data = data;
    alertsObj.status = status;
    return alertsObj;
  }
}
