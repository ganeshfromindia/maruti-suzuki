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
  scdata: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}




const ALL_SC_DATA: any[] = [
  {
    id: 1,
    companyName: 'Manoj',
    city: 5245,
    contactDetails: 10079,
    contactPerson: '25000',
   
  },
  {
    id: 2,
    companyName: 'Shinoj',
    city: 7415,
    contactDetails: 40026,
    contactPerson: '12530',
    
  },
  {
    id: 3,
    companyName: 'Rakesh',
    city: 6742,
    contactDetails: 6941,
    contactPerson: '41526',
   
  },
  {
    id: 4,
    companyName: 'Ahmed',
    city: 4253,
    contactDetails: 90122,
    contactPerson: '14526',
    
  },
  {
    id: 5,
    companyName: 'Prakash',
    city: 7491,
    contactDetails: 10811,
    contactPerson: '14200',
   
  },
  {
    id: 6,
    companyName: 'Mahesh',
    city: 4863,
    contactDetails: 120107,
    contactPerson: '32500',
    
  },
  {
    id: 7,
    companyName: 'Ajit',
    city: 7859,
    contactDetails: 140067,
    contactPerson: '46230',
    
  },
  {
    id: 8,
    companyName: 'Sanjay',
    city: 6523,
    contactDetails: 159994,
    contactPerson: '24150',
    
  },
  {
    id: 9,
    companyName: 'Pramod',
    city: 6248,
    contactDetails: 189984,
    contactPerson: '32784',
   
  },
  {
    id: 10,
    companyName: 'Nayan',
    city: 8642,
    contactDetails: 201797,
    contactPerson: '18596',
   
  },
  {
    id: 11,
    companyName: 'Lajpat',
    city: 7452,
    contactDetails: 10125,
    contactPerson: '14520',
    
  },
  {
    id: 12,
    companyName: 'Prathmesh',
    city: 9452,
    contactDetails: 44152,
    contactPerson: '48526',
   
  },
  {
    id: 13,
    companyName: 'Kedar',
    city: 6415,
    contactDetails: 67463,
    contactPerson: '41526',
    
  },
  {
    id: 14,
    companyName: 'Jitendra',
    city: 4163,
    contactDetails: 98415,
    contactPerson: '14526',
   
  },
  {
    id: 15,
    companyName: 'Vinod',
    city: 6342,
    contactDetails: 107416,
    contactPerson: '14526',
    
  },
  {
    id: 16,
    companyName: 'Ketan',
    city: 8415,
    contactDetails: 128421,
    contactPerson: '74500',
   
  },
  {
    id: 17,
    companyName: 'Pruthvi',
    city: 1203,
    contactDetails: 149526,
    contactPerson: '48950',
    
  },
  {
    id: 18,
    companyName: 'Muthoot',
    city: 9125,
    contactDetails: 157406,
    contactPerson: '74150',
   
  },
  {
    id: 19,
    companyName: 'Bhupendra',
    city: 6341,
    contactDetails: 188014,
    contactPerson: '52630',
    
  },
  {
    id: 20,
    companyName: 'Chiranjeevi',
    city: 6521,
    contactDetails: 206251,
    contactPerson: '65210',
   
  }
]

// function to search the term
function matches(scdata: any, term: string, pipe: PipeTransform) {
  return (
    scdata.companyName.toLowerCase().includes(term.toLowerCase()) 
  );
}

@Injectable({ providedIn: 'root' })
export class SearchCompanyService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _searchSD$ = new Subject<void>();
  private _searchcompanydata$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public all_sc_data: any[] = [];
  public _all_sc_data: any[] = [];
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
        this._searchcompanydata$.next(result.allscdata);
        this._total$.next(this.totalP);
      });
    this._searchSD$.next();
  }

  get companyAllData$() {
    return this._searchcompanydata$.asObservable();
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

    let allscdata = this.all_sc_data;

    // 2. filter
    allscdata = allscdata.filter((scdata) =>
      matches(scdata, searchTerm, this.pipe)
    );

    const total = allscdata.length;
    // 3. paginate
    // allscdata = allscdata.slice(0, 0 + pageSize); // this line not needed in actual case
    allscdata = allscdata.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ allscdata, total });
  }

  // set table data
  getTableData(
    page: number,
    pageSize: number,
    
  ) {
    this.handleUpdateResponse('abc')
    // return new Promise((resolve, reject) => {
    //   try {
    //     this._beService
    //       .getMethod(
    //         'get/advanceExpense/request/list?',
    //         page,
    //         pageSize
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
    this.all_sc_data = this._all_sc_data = ALL_SC_DATA;
    this.setData(ALL_SC_DATA.length)
    // this.all_sc_data = this._all_sc_data = data.payLoad;
    // this.setData(data.totalRow);
  }

  // handle error response
  handleErrorPost(data: any) {
    this.all_sc_data.length = this._all_sc_data.length = 0;
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
