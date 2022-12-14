import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';
import { IECONode, Orientation } from './econode';

@Component({
  selector: 'app-proj-hierarchy-creation-sa',
  templateUrl: './proj-hierarchy-creation-sa.component.html',
  styleUrls: ['./proj-hierarchy-creation-sa.component.css'],
})
export class ProjHierarchyCreationSaComponent implements OnInit {
  public data: IECONode = { data: null, designationName: '', idMain: '' };
  public dataArray: any[] = [];
  public urlHttpParams: any = {};
  public projHierarchyData: any[] = [];
  public showError: string = '';
  public showSuccess: string = '';
  public showSelectError: boolean = false;
  public singleNode: any = {};
  public projHierarchies: any[] = [];
  public projectHierarchy: any[] = [];
  public projHierarchyCreateForm: FormGroup;
  public designations: any[] = []; 
  public linkedToData: any[] = [];
  public closeModal: string = '';
  public selprojHierarchy: any = null;
  public projecTHierarchyId: number = 0;
  
  public min!: number;

  Orientation = Orientation;

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    public router: Router,
    private _fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.projHierarchyCreateForm = this._fb.group({
      id:[''],
      projectHierarchyName:['', Validators.required],
      projDesgn:['', Validators.required],
      level:['', Validators.required],
      linkedTo:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.setProjectHierarchies('');
    this.setDesignationData()
  }

  async setProjectHierarchies(pHId: any) {
    let url = 'get/project/hierarchy?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: pHId
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
    this.data = { data: null, designationName: '', idMain: '' };
    const formData = this.projHierarchyCreateForm.getRawValue();
    if(formData.projectHierarchyName == '') {
      this.showSelectError = true;
      return;
    } else {
      this.showSelectError = false
    }
    let url = 'get/project/hierarchy?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      projectHierarchyId: this.projecTHierarchyId
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
        this.dataArray.forEach((data) => data.idMain = data.id);
        let zeroElemnent = this.dataArray.filter((data) => data.linkedTo == 0)
        console.log(zeroElemnent)
        if(zeroElemnent.length == 0) {
          this.min = 1000;
          for(const node of this.dataArray) {
            if(node.linkedTo < this.min) {
                this.min = node.linkedTo;
            }    
          }
        }
        this.data = this.unflattenTree(this.dataArray, this.min);
        // this.data = this.printTree(this.unflattenTree(this.dataArray));
    }
  }

  unflattenTree(data: any, min = 1000 ) {
    const nodes: any = {};
    let root;
    for (const node of data) {
      nodes[node.id] = { children: [], ...nodes[node.id], ...node };
      if (node.linkedTo && node.linkedTo != min) {
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
  //     console.log(' '.repeat(level), root.designationName);
  //     root.children?.forEach((e: any) => this.printTree(e, gap, level + gap));
  //   }
  //   return root;
  // }

  async onSubmitProjHierarchyCreate() {
    this.projHierarchyData = [];
    let url = 'get/project/hierarchy?';
    const formData = this.projHierarchyCreateForm.getRawValue();
    let fetchedProjDesgnName = this.designations.filter((data) => data.id == formData.projDesgn);
    fetchedProjDesgnName = fetchedProjDesgnName[0].designationName;
    let postData = {
      id: this.projecTHierarchyId || '',
      companyName: this.userService.getCompanyName(),
      companyId: this.userService.getCompanyID(),
      projectHierarchyName: formData.projectHierarchyName,
      hierarchyDetailList: [
        {
          id: formData.id || '',
          designationId: formData.projDesgn,
          designationName: fetchedProjDesgnName,
          level: formData.level,
          linkedTo: formData.linkedTo
        }
      ]
    };
    let returnedAlerts: any = await this.postData(postData);
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
        let returnedStatus = await this.setProjectHierarchies(this.projecTHierarchyId);
        this.projectHierarchy = this.projHierarchies[0].hierarchyDetailList;
        this.projectHierarchy = this.projectHierarchy.sort((a: any,b: any) => 
        {
          if(a.level < b.level) { return -1; }
          if(a.level > b.level) { return 1; }
          return 0;
        })
      }
    }
  }

  postData(postData: any) {
    const formData = this.projHierarchyCreateForm.getRawValue();
    postData.hierarchyDetailList[0].linkedTo = parseInt(postData.hierarchyDetailList[0].linkedTo)
    console.log(postData)
    return new Promise((resolve, reject) => {
        try {
          this._beService.postMethod('project/hierarchy/save', postData)
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


  
  //post edit id to edit component
  postEditId(data: any) {
    this.projHierarchyCreateForm.patchValue({
      id: data.id,
      projDesgn: data.designationId,
      level: data.level
    })
    this.setLinkedToData();
  }

  // postDeleteId(data: any) {
  //   return
  //   this._beService.deleteMethod('delete'+data.id).subscribe({
  //     next: (resolvedData) => {
  //       if(resolvedData.status == 200) this.showSuccess = 'Hierarchy deleted successfully'
  //     },
  //     error: (errorData) => {
  //       if(errorData.status == 404) {
  //         this.showError = "Hierarchy Not Found";
  //       } else {
  //         this.showError = "Something went wrong";
  //       }
  //     },
  //   })

  // }

  setLevel(dataP: any) {
    alert("You are sure you want to add new entry");
    let levelFromChange = this.designations.filter((data: any) => data.id == dataP.target.value);
    levelFromChange = levelFromChange[0].level;
    this.projHierarchyCreateForm.patchValue({level: levelFromChange, id: ''})
    if(this.projecTHierarchyId) this.setLinkedToData()
  }

  async setLinkedToData() {
    this.linkedToData = [];
    const formData = this.projHierarchyCreateForm.getRawValue();
    let url = 'get/project/hierarchy/level?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
      level: formData.level,
      projectHierarchyId: this.projecTHierarchyId

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

  async triggerModal(content: any) {
    let returnedStatus = this.setProjectHierarchies('');
    this.selprojHierarchy = '';
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    modalRef.result.then((res) => {
      if(res) {
        this.projecTHierarchyId = res.id;
        this.projHierarchyCreateForm.patchValue({projectHierarchyName: res.projectHierarchyName, id: res.id})
        this.projectHierarchy = this.projHierarchies.filter((data: any) => data.id == res.id)
        this.projectHierarchy = this.projectHierarchy[0].hierarchyDetailList;
        this.projectHierarchy = this.projectHierarchy.sort((a: any,b: any) => 
        {
          if(a.level < b.level) { return -1; }
          if(a.level > b.level) { return 1; }
          return 0;
        })
        this.closeModal = `Closed with: ${res}`;
      }
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
    
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  setData(url: string, urlHttpParams: {}) {
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(url, 1, 100, urlHttpParams)
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

  resetForm() {
    this.projHierarchyCreateForm.reset();
    this.projecTHierarchyId = 0;
    this.projHierarchyCreateForm.patchValue({linkedTo: 0})
  }


  
  
}
