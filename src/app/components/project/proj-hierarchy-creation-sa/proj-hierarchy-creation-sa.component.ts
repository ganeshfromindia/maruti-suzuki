import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';
import { IECONode, Orientation } from './econode';

@Component({
  selector: 'app-proj-hierarchy-creation-sa',
  templateUrl: './proj-hierarchy-creation-sa.component.html',
  styleUrls: ['./proj-hierarchy-creation-sa.component.css'],
})
export class ProjHierarchyCreationSaComponent implements OnInit {
  public data: IECONode = { data: null, designationName: '' };
  public dataArray: any[] = [];
  public dataConcated: any = {};
  public srchTrmProjHierarchyName: string = '';
  public srchTrmProjDesgn: string = '';
  public srchTrmLevel: string = '';
  public srchTrmLnkdTo: string = '';
  public urlHttpParams: any = {};
  public projHierarchyData: any[] = [];
  public showError: string = '';

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {}
  Orientation = Orientation;

  async setTreeData() {
    this.setSearchData();
    this.data = { data: null, designationName: '' };
    let returnedAlerts: any = await this.setTreeAPIData();
    if (returnedAlerts.flag) {
      if (returnedAlerts.data.status == 404) {
        this.showError = 'Data Not Found';
      } else {
        this.showError = 'Something went wrong';
      }
      setTimeout(() => {
        this.showError = '';
      }, 5000);
    } else {
      if (returnedAlerts.data.status == 200)
        this.dataArray = returnedAlerts.data.payLoad[0].hierarchyDetailList;
      this.data = this.printTree(this.unflattenTree(this.dataArray));
      console.log(this.data);
    }
    // this.data = {
    //   data: { id: 'Project Head' },
    //   linkColor: '#4554a5',
    //   background: 'red',
    //   color: 'white',
    //   children: [
    //     {
    //       data: { id: 'Operations Controller Operations Controller' },
    //       linkColor: '#4554a5',
    //       background: 'pink',
    //       color: 'white',
    //       children: [
    //         { data: { id: 'Operations Controller Operations Controller' } },
    //         {
    //           data: { id: 'Operations Controller' },
    //           children: [
    //             { data: { id: 'Operations Controller' }, background: 'silver' },
    //             { data: { id: 'Operations Controller' } },
    //           ],
    //         },
    //       ],
    //     },
    //     { data: { id: 'Operations Controller' } },
    //     {
    //       data: { id: 'Operations Controller' },
    //       linkColor: '#4554a5',
    //       background: 'orange',
    //       color: 'white',
    //       children: [
    //         { data: { id: 'Operations Controller' } },
    //         {
    //           data: { id: 'Operations Controller' },
    //           background: 'lightsteelblue',
    //           linkColor: '#4554a5',
    //           children: [
    //             { data: { id: 'Operations Controller' } },
    //             { data: { id: 'Operations Controller' } },
    //             { data: { id: 'Operations Controller' } },
    //             {
    //               data: { id: 'Operations Controller' },
    //               background: 'black',
    //               linkColor: '#4554a5',
    //               children: [{ data: { id: 16 } }],
    //             },
    //             { data: { id: 'Operations Controller' } },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // };
  }

  unflattenTree(data: any) {
    const nodes: any = {};
    let root;

    for (const node of data) {
      nodes[node.id] = { children: [], ...nodes[node.id], ...node };

      if (node.linkedTo) {
        nodes[node.linkedTo] = { children: [], ...nodes[node.linkedTo] };
        nodes[node.linkedTo].children.push(nodes[node.id]);
      } else {
        root = nodes[node.id];
      }
    }

    return root;
  }

  printTree(root: any, gap = 4, level = 0) {
    if (root) {
      console.log(' '.repeat(level), root.name);
      root.children?.forEach((e: any) => this.printTree(e, gap, level + gap));
    }
    return root;
  }

  async setSearchData() {
    this.projHierarchyData = [];
    let returnedAlerts: any = await this.setData();
    if (returnedAlerts.flag) {
      if (returnedAlerts.data.status == 404) {
        this.showError = 'Data Not Found';
      } else {
        this.showError = 'Something went wrong';
      }
      setTimeout(() => {
        this.showError = '';
      }, 5000);
    } else {
      // if(returnedAlerts.data.status == 200) this.projHierarchyData = returnedAlerts.data.payLoad;
      if (returnedAlerts.data.status == 200) {
        this.projHierarchyData = [
          { id: 1, designation: 'Project Head', level: 1 },
          { id: 2, designation: 'Operations Manager', level: 2 },
          { id: 3, designation: 'Accounts Head', level: 3 },
          { id: 4, designation: 'Finance Manager', level: 4 },
        ];
      }
    }
  }

  setData() {
    // this.urlHttpParams = {
    //   projName: this.srchTrmProjHierarchyName,
    //   projDesgn: this.srchTrmProjDesgn,
    //   level: this.srchTrmLevel,
    //   linkedTo: this.srchTrmLnkdTo,
    // };
    this.urlHttpParams = {
      companyName: 'locate',
      adminEmailId: '',
    };
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod('get/company-list?', 1, 10, this.urlHttpParams)
          .subscribe({
            next: (resolvedData) => {
              let alertsFetched = this.userService.handleAlerts(
                resolvedData,
                false
              );
              resolve(alertsFetched);
            },
            error: (errorData) => {
              let alertsFetched = this.userService.handleAlerts(
                errorData,
                true
              );
              resolve(alertsFetched);
            },
          });
      } catch (e) {
        let alertsFetched = this.userService.handleAlerts(e, true);
        reject(alertsFetched);
      }
    });
  }
  //post edit id to edit component
  postEditId(data: any) {
    let url = `company/create-edit-company/${data.id}`;
    this.router.navigateByUrl(url, { state: { data: data } });
  }

  setTreeAPIData() {
    this.urlHttpParams = {
      companyId: 2 || this.userService.getCompanyID(),
      projectHierarchyId: this.srchTrmProjHierarchyName,
    };
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(
            'get/project/hierarchy?',
            undefined,
            undefined,
            this.urlHttpParams
          )
          .subscribe({
            next: (resolvedData) => {
              let alertsFetched = this.userService.handleAlerts(
                resolvedData,
                false
              );
              resolve(alertsFetched);
            },
            error: (errorData) => {
              let alertsFetched = this.userService.handleAlerts(
                errorData,
                true
              );
              resolve(alertsFetched);
            },
          });
      } catch (e) {
        let alertsFetched = this.userService.handleAlerts(e, true);
        reject(alertsFetched);
      }
    });
  }
}
