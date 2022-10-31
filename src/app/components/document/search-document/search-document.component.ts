import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.css'],
})
export class SearchDocumentComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;

  public urlHttpParams: any = {};
  public tags: any[] = [];
  public docTypes: any[] = [];
  public projects: any[] = [];
  public userAllData: any[] = [];
  public documents: any[] = [];
  public documentsList: any[] = [];
  public showError: string = '';
  public showSuccess: string = '';
  public documentSearchForm: FormGroup;

  public closeModal: string = '';
  public docuName: string = '';
  public currentDocumentName: string = '';
  public linkedDocumentName: string = '';
  public documentStatus: string = '';

  public modalRef!: NgbModalRef;

  constructor(
    private router: Router,
    private _beService: BackendService,
    private userService: UserService,
    private _fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.documentSearchForm = this._fb.group({
      documentName: [''],
      documentId: [''],
      createdBy: [''],
      startTime: [''],
      endTime: [''],
      taggingHead: this._fb.array([]),
    });
  }

  ngOnInit(): void {
    this.setDocTypes(1, 100);
    this.setTaggingData(1, 100);
    this.setProjects(1, 100);
    this.setUserData(1, 100);
    this.setDocumentListData(1, 100);
    this.projects = [
      { id: 1, projectName: 'Mumbai Nagpur Highway' },
      { id: 2, projectName: 'Kandla Port Extn' },
      { id: 3, projectName: 'Madurai Power Plant' },
      { id: 4, projectName: 'Shikrapur Mining Modification' },
      { id: 5, projectName: 'Sutlej Dam' },
    ];
  }

  async setDocTypes(page: number, pageSize: number) {
    this.docTypes = [];
    let url = 'common/get/document/type?';
    this.urlHttpParams = {
      adminId: this.userService.getUserId(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
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
        this.docTypes = returnedAlerts.data.payLoad;
    }
  }

  async setTaggingData(page: number, pageSize: number) {
    this.tags = [];
    let url = 'common/get/tagging/head?';
    this.urlHttpParams = {
      adminId: this.userService.getUserId(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
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
        this.tags = returnedAlerts.data.payLoad;
      this.tags.forEach((o, i) => {
        const control = new FormControl(); // if first item set to true, else false
        (this.documentSearchForm.get('taggingHead') as FormArray).push(control);
      });
    }
  }

  async setProjects(page: number, pageSize: number) {
    return;
    this.projects = [];
    let url = 'common/get/tagging/head?';
    this.urlHttpParams = {
      adminId: this.userService.getUserId(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
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
        this.projects = returnedAlerts.data.payLoad;
    }
  }

  async setUserData(page: number, pageSize: number) {
    this.userAllData = [];
    let url = 'auth/get/user-list?';
    this.urlHttpParams = {
      userName: '',
      companyId: this.userService.getCompanyID(),
      emailId: '',
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
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
        this.userAllData = returnedAlerts.data.payLoad;
    }
  }

  async setDocumentListData(page: number, pageSize: number) {
    this.documents = [];
    let url = 'get/document/list?';
    this.urlHttpParams = {
      companyId: this.userService.getCompanyID(),
    };
    let returnedAlerts: any = await this.setData(
      page,
      pageSize,
      url,
      this.urlHttpParams
    );
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
        this.documents = returnedAlerts.data.payLoad;
    }
  }
  setData(page: number, pageSize: number, url: string, httpParams: any) {
    return new Promise((resolve, reject) => {
      try {
        this._beService.getMethod(url, page, pageSize, httpParams).subscribe({
          next: (resolvedData) => {
            let alertsFetched = this.userService.handleAlerts(
              resolvedData,
              false
            );
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
    });
  }

  onChange(id: string, data: any, index: number) {
    const tagsArray: FormArray = this.documentSearchForm.get(
      'taggingHead'
    ) as FormArray;

    if (data.target.checked) {
      tagsArray.at(index).patchValue(id);
    } else {
      tagsArray.at(index).patchValue(false);
    }
  }

  async onSubmitDocumentSearch() {
    const formData = this.documentSearchForm.getRawValue();
    formData.taggingHead = formData.taggingHead.filter(
      (data: any) => data != false
    );
    formData.taggingHead = formData.taggingHead.filter(
      (data: any) => data != null
    );
    let returnedAlerts: any = await this.postData(formData);
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
        this.documentsList = returnedAlerts.data.payLoad;
    }
  }

  postData(formData: any) {
    formData.startTime = new Date(formData.startTime).getTime();
    formData.endTime = new Date(formData.endTime).getTime();
    formData.companyId = this.userService.getCompanyID();
    this.urlHttpParams = {
      companyId: formData.companyId,
      documentName: formData.documentName,
      createdBy: formData.createdBy,
      documentId: formData.documentId,
      endTime: formData.endTime,
      startTime: formData.startTime,
      taggingHead: formData.taggingHead,
    };
    return new Promise((resolve, reject) => {
      try {
        this._beService
          .getMethod(
            'get/document/list?',
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

  downloadFile(filePath: any) {
    // let fileName = filePath.split('/').slice(-1).pop()
    let fileName = filePath.split('/').pop();
    this._beService
      .getMethodForFileDownload('view-file?filePath=' + filePath)
      .subscribe({
        next: (res) => {
          let fileNameP: string = !!fileName ? fileName : '';
          let blob: Blob = res.body as Blob;
          let a = document.createElement('a');
          a.download = fileNameP;
          a.href = window.URL.createObjectURL(blob);
          a.click();
          a.remove();
          // const blob = new Blob([data]);
          // const url= window.URL.createObjectURL(blob);
          // window.open(url);
        },
        error: (errorData) => {
          this.showError = 'Something went wrong';
          setTimeout(() => {
            this.showError = '';
          }, 5000);
        },
      });
  }

  async processDocuemnt(documentName: string) {
    this.userAllData = [];
    let url = 'common/process/document?';
    this.urlHttpParams = {
      documentName: documentName,
    };
    let returnedAlerts: any = await this.setData(0, 0, url, this.urlHttpParams);
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
        this.showSuccess = 'Document processed successfully';
      setTimeout(() => {
        this.showSuccess = '';
      }, 3000);
      this.onSubmitDocumentSearch();
    }
  }
  resetForm() {
    this.documentSearchForm.reset();
    this.documentSearchForm.patchValue({
      documentId: '',
      createdBy: '',
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  async triggerModal(
    content: any,
    data: any,
    documentName: string,
    docStatus: string
  ) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modalRef.result.then(
      (res) => {
        this.onSubmitDocumentSearch();
        if (res) {
          this.onSubmitDocumentSearch();  
          this.closeModal = `Closed with: ${res}`;
        }
      },
      (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
    this.currentDocumentName = data;
    this.linkedDocumentName = documentName;
    this.documentStatus = docStatus;
  }

  async postDocFB(documentName: string, currentDocumentName: string) {
    let url = 'save/backward/forward/document?currentDocument=' + currentDocumentName + '&type=' + this.documentStatus + '&documentName=' + documentName;
    let returnedAlerts: any = await this.updateData(url);
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
      this.modalRef.close();
      
    }
  }

  updateData(url: string) {
    return new Promise((resolve, reject) => {
      try {
        this._beService.updateMethod(url, {}).subscribe({
          next: (resolvedData) => {
            let alertsFetched = this.userService.handleAlerts(
              resolvedData,
              false
            );
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
    });
  }
}
