import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';
import { IECONode, Orientation } from './econode';

@Component({
  selector: 'app-proj-type-creation-admin',
  templateUrl: './proj-type-creation-admin.component.html',
  styleUrls: ['./proj-type-creation-admin.component.css']
})
export class ProjTypeCreationAdminComponent implements OnInit {

  public data: IECONode = { data: null, designationName: '' };
  public dataArray: any[] = [];
  public srchTrmProjName: string = '';
  public srchTrmSimilarTo: string | any = '';
  public urlHttpParams: any = {};
  public showError: string = '';
  public showSuccess: string = '';
  public projHierarchies: any[] = []; 
  public Orientation = Orientation;
  public projHierarchy: any = {};
  public showSelectError: boolean = false;
  public singleNode: any = {};

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    public router: Router
    ) {}
    
  ngOnInit(): void {
    this.setProjHierarchies();
    this.projHierarchy = 'select'
  }

  async setProjHierarchies() {
    this.projHierarchies = []
    let returnedAlerts: any = await this.setPHData();
    if(returnedAlerts.flag) {
      if(returnedAlerts.data.status == 404) {
        this.showError = "Data Not Found";
      } else {
        this.showError = "Something went wrong"
      }
      setTimeout(() => {
        this.showError = ''
      },5000)
    } else {
      if(returnedAlerts.data.status == 200) this.projHierarchies = returnedAlerts.data.payLoad;
      
    }
  }
  setPHData() {
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: ''  
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
              let alertsFetched = this.userService.handleAlerts(resolvedData, false);
              resolve(alertsFetched);
            },
            error: (errorData) => {
              let alertsFetched = this.userService.handleAlerts(errorData, true);
              resolve(alertsFetched);
            },
          });
      } catch (e) {
        let alertsFetched = this.userService.handleAlerts(e, true);
        reject(alertsFetched);
      }
    }) 
  }

  compareFn(itemOne: any, itemTwo: any): boolean {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }

  setProjectHierarchy() {
    this.srchTrmSimilarTo = this.projHierarchy
  }
  setTreeData() {
    if(this.srchTrmSimilarTo == 'select') {
      this.showSelectError = true;
      return;
    } else {
      this.showSelectError = false
    }

    this.dataArray = this.srchTrmSimilarTo.hierarchyDetailList;
    this.data = this.unflattenTree(this.dataArray);
  }

  unflattenTree(data: any) {
    const nodes: any = {};
    let root;
    for (const node of data) {
      nodes[node.id] = { children: [], ...nodes[node.id], ...node };
      if (node.linkedTo) {
        nodes[node.linkedTo] = { children: [], ...nodes[node.linkedTo] };
        nodes[node.linkedTo].children.push(nodes[node.id]);
        this.singleNode = nodes[node.linkedTo]
      } else {
        root = nodes[node.id];
      }
    }
    return root || this.singleNode.children[0];
  }

}
