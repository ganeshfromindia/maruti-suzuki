import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public urlHttpParams: any = {};
  public projHierarchyData: any[] = [];
  public showError: string = '';
  public showSelectError: boolean = false;
  public singleNode: any = {};
  public projHierarchies: any[] = [];
  public projHierarchyCreateForm: FormGroup;
  public designations: any[] = []; 
  public linkedToData: any[] = []; 
  Orientation = Orientation;

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    public router: Router,
    private _fb: FormBuilder
  ) {
    this.projHierarchyCreateForm = this._fb.group({
      projectHierarchyData:['select', Validators.required],
      projDesgn:[null, Validators.required],
      level:['', Validators.required],
      linkedTo:[null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.setProjectHierarchies();
    this.setDesignationData()
  }

  async setProjectHierarchies() {
    let url = 'get/project/hierarchy?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: ''
    };
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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
        this.projHierarchies = returnedAlerts.data.payLoad;
    }
  }

  async setDesignationData() {
    this.designations = [];
    let url = 'get/designation-list?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID()
    };
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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
      if(returnedAlerts.data.status == 200) this.designations = returnedAlerts.data.payLoad;
    }
  }

  async setTreeData() {
    this.data = { data: null, designationName: '' };
    const formData = this.projHierarchyCreateForm.getRawValue();
    if(formData.projectHierarchyData == 'select') {
      this.showSelectError = true;
      return;
    } else {
      this.showSelectError = false
    }
    let url = 'get/project/hierarchy?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: formData.projectHierarchyData.id
    };
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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
        this.data = this.unflattenTree(this.dataArray);
      //this.data = this.printTree(this.unflattenTree(this.dataArray));
    }
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

  // printTree(root: any, gap = 4, level = 0) {
  //   if (root) {
  //     console.log(' '.repeat(level), root.name);
  //     root.children?.forEach((e: any) => this.printTree(e, gap, level + gap));
  //   }
  //   return root;
  // }

  async onSubmitProjHierarchyCreate() {
    this.projHierarchyData = [];
    let url = 'get/project/hierarchy?';
    const formData = this.projHierarchyCreateForm.getRawValue();
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: formData.projectHierarchyData,
    };
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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

  setData(url: string, urlHttpParams: {}) {
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(url, 1, 10, urlHttpParams)
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

  setLevel(dataP: any) {
    let levelFromChange = this.designations.filter((data: any) => data.id == dataP.target.value);
    levelFromChange = levelFromChange[0].level;
    this.projHierarchyCreateForm.patchValue({level: levelFromChange})
    this.setLinkedToData()
  }

  async setLinkedToData() {
    this.linkedToData = [];
    const formData = this.projHierarchyCreateForm.getRawValue();
    let url = 'get/project/hierarchy/level?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      level: formData.level,
      projectHierarchyId: formData.projectHierarchyData.id

    };
    let returnedAlerts: any = await this.setData(url, this.urlHttpParams);
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
      if(returnedAlerts.data.status == 200) this.linkedToData = returnedAlerts.data.payLoad;
    }
  }


  
  
}
