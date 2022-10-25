import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { CompanyComponent } from './components/company/company.component';
import { CreateEditCompanyComponent } from './components/company/create-edit-company/create-edit-company.component';
import { SearchCompanyComponent } from './components/company/search-company/search-company.component';
import { UserComponent } from './components/user/user.component';
import { CreateEditUserComponent } from './components/user/create-edit-user/create-edit-user.component';
import { SearchUserComponent } from './components/user/search-user/search-user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DesignationComponent } from './components/settings/designation/designation.component';
import { DepartmentComponent } from './components/settings/department/department.component';
import { ListDepartmentComponent } from './components/settings/department/list-department/list-department.component';
import { CreateEditDepartmentComponent } from './components/settings/department/create-edit-department/create-edit-department.component';
import { ListDesignationComponent } from './components/settings/designation/list-designation/list-designation.component';
import { CreateEditDesignationComponent } from './components/settings/designation/create-edit-designation/create-edit-designation.component';
import { UserGrantAccessComponent } from './components/user-grant-access/user-grant-access.component';
import { GaCreateEditUserComponent } from './components/user-grant-access/ga-create-edit-user/ga-create-edit-user.component';
import { GaSearchUserComponent } from './components/user-grant-access/ga-search-user/ga-search-user.component';
import { TaggingComponent } from './components/settings/tagging/tagging.component';
import { ListTaggingComponent } from './components/settings/tagging/list-tagging/list-tagging.component';
import { CreateEditTaggingComponent } from './components/settings/tagging/create-edit-tagging/create-edit-tagging.component';
import { DocTypeCreationComponent } from './components/settings/doc-type-creation/doc-type-creation.component';
import { ListDocTypeCreationComponent } from './components/settings/doc-type-creation/list-doc-type-creation/list-doc-type-creation.component';
import { CreateEditDocTypeCreationComponent } from './components/settings/doc-type-creation/create-edit-doc-type-creation/create-edit-doc-type-creation.component';
import { SearchRightComponent } from './components/settings/search-right/search-right.component';
import { ListSearchRightComponent } from './components/settings/search-right/list-search-right/list-search-right.component';
import { CreateEditSearchRightComponent } from './components/settings/search-right/create-edit-search-right/create-edit-search-right.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjTypeCreationSaComponent } from './components/project/proj-type-creation-sa/proj-type-creation-sa.component';
import { ListProjTypeCreationComponent } from './components/project/proj-type-creation-sa/list-proj-type-creation/list-proj-type-creation.component';
import { CreateEditProjTypeCreationComponent } from './components/project/proj-type-creation-sa/create-edit-proj-type-creation/create-edit-proj-type-creation.component';
import { ProjHierarchyCreationSaComponent } from './components/project/proj-hierarchy-creation-sa/proj-hierarchy-creation-sa.component';
import { TreeViewComponent } from './components/project/proj-hierarchy-creation-sa/tree-view.component';
import { ProjTypeCreationAdminComponent } from './components/project/proj-type-creation-admin/proj-type-creation-admin.component';
import { TreeViewAdminComponent } from './components/project/proj-type-creation-admin/tree-view.component';
import { ProjCreationAdminComponent } from './components/project/proj-creation-admin/proj-creation-admin.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UnavailableComponent } from './components/unavailable/unavailable.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DocumentComponent } from './components/document/document.component';
import { UploadDocumentComponent } from './components/document/upload-document/upload-document.component';
import { SearchDocumentComponent } from './components/document/search-document/search-document.component';
import { LoginActivateGuard } from './services/login-activate.guard';
import { AuthActivateGuard } from './services/auth-activate.guard';
import { audit } from 'rxjs';




const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginActivateGuard]
  },
  {
    path: "forgotpassword",
    component: ForgotPasswordComponent,
    data: {
      title: "Forgot Password",
    },
  },
  { path: 'company',
    component: CompanyComponent,
    canActivate:[AuthActivateGuard],
    children: [
      {
        path: 'search-company',
        component: SearchCompanyComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path:  'create-edit-company',
        component: CreateEditCompanyComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path:  'create-edit-company/:id',
        component: CreateEditCompanyComponent,
        canActivateChild: [AuthActivateGuard]
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate:[AuthActivateGuard],
    children: [
      {
        path: 'search-user',
        component: SearchUserComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path:  'create-edit-user',
        component: CreateEditUserComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path:  'create-edit-user/:id',
        component: CreateEditUserComponent,
        canActivateChild: [AuthActivateGuard]
      }
    ]
  },
  {
    path: 'ga-user',
    component: UserGrantAccessComponent,
    canActivate:[AuthActivateGuard],
    children: [
      {
        path: 'ga-search-user',
        component: GaSearchUserComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path:  'ga-create-edit-user',
        component: GaCreateEditUserComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path:  'ga-create-edit-user/:id',
        component: GaCreateEditUserComponent,
        canActivateChild: [AuthActivateGuard]
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate:[AuthActivateGuard],
    children: [
      {
        path: 'designation',
        component: DesignationComponent,
        canActivate: [AuthActivateGuard],
        children: [
          {
            path: 'list-designation',
            component: ListDesignationComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-designation',
            component: CreateEditDesignationComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-designation/:id',
            component: CreateEditDesignationComponent,
            canActivateChild: [AuthActivateGuard]
          }
        ]
      },
      {
        path:  'department',
        component: DepartmentComponent,
        canActivate: [AuthActivateGuard],
        children: [
          {
            path: 'list-department',
            component: ListDepartmentComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-department',
            component: CreateEditDepartmentComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-department/:id',
            component: CreateEditDepartmentComponent,
            canActivateChild: [AuthActivateGuard]
          }
        ]
      },
      {
        path:  'tagging',
        component: TaggingComponent,
        canActivate:[AuthActivateGuard],
        children: [
          {
            path: 'list-tagging',
            component: ListTaggingComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-tagging',
            component: CreateEditTaggingComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-tagging/:id',
            component: CreateEditTaggingComponent,
            canActivateChild: [AuthActivateGuard]
          }
        ]
      },
      {
        path:  'doc-type-creation',
        component: DocTypeCreationComponent,
        canActivate:[AuthActivateGuard],
        children: [
          {
            path: 'list-doc-type-creation',
            component: ListDocTypeCreationComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-doc-type-creation',
            component: CreateEditDocTypeCreationComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-doc-type-creation/:id',
            component: CreateEditDocTypeCreationComponent,
            canActivateChild: [AuthActivateGuard]
          }
        ]
      },
      {
        path:  'search-right',
        component: SearchRightComponent,
        canActivate:[AuthActivateGuard],
        children: [
          {
            path: 'list-search-right',
            component: ListSearchRightComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-search-right',
            component: CreateEditSearchRightComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path:  'create-edit-search-right/:id',
            component: CreateEditSearchRightComponent,
            canActivateChild: [AuthActivateGuard]
          }
        ]
      }
    ]
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate:[AuthActivateGuard],
    children: [
      {
        path: 'proj-type-creation-sa',
        component: ProjTypeCreationSaComponent,
        canActivate:[AuthActivateGuard],
        children: [
          {
            path: 'list-proj-type-creation',
            component: ListProjTypeCreationComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path: 'create-edit-proj-type-creation',
            component: CreateEditProjTypeCreationComponent,
            canActivateChild: [AuthActivateGuard]
          },
          {
            path: 'create-edit-proj-type-creation/:id',
            component: CreateEditProjTypeCreationComponent,
            canActivateChild: [AuthActivateGuard] 
          }
        ]
      },
      {
        path: 'proj-hierarchy-creation-sa',
        component: ProjHierarchyCreationSaComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path: 'proj-type-creation-admin',
        component: ProjTypeCreationAdminComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path: 'proj-creation-admin',
        component: ProjCreationAdminComponent,
        canActivateChild: [AuthActivateGuard]
      }
    ]
  },
  {
    path:'document',
    component: DocumentComponent,
    canActivate:[AuthActivateGuard],
    children:[
      {
        path: 'upload-document',
        component: UploadDocumentComponent,
        canActivateChild: [AuthActivateGuard]
      },
      {
        path: 'search-document',
        component: SearchDocumentComponent,
        canActivateChild: [AuthActivateGuard]
      }
    ]
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  { path: "**", component: UnavailableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* Exporting the routing components :: redundency */
export const RoutingComponents = [
  BreadcrumbComponent,
  CompanyComponent,
  CreateEditCompanyComponent,
  SearchCompanyComponent,
  UserComponent,
  SearchUserComponent,
  CreateEditUserComponent,
  SettingsComponent,
  DesignationComponent,
  DepartmentComponent,
  ListDepartmentComponent,
  CreateEditDepartmentComponent,
  ListDesignationComponent,
  CreateEditDesignationComponent,
  UserGrantAccessComponent,
  GaCreateEditUserComponent,
  GaSearchUserComponent,
  TaggingComponent,
  ListTaggingComponent,
  CreateEditTaggingComponent,
  DocTypeCreationComponent,
  ListDocTypeCreationComponent,
  CreateEditDocTypeCreationComponent,
  SearchRightComponent,
  ListSearchRightComponent,
  CreateEditSearchRightComponent,
  ProjectComponent,
  ProjTypeCreationSaComponent,
  ListProjTypeCreationComponent,
  CreateEditProjTypeCreationComponent,
  ProjHierarchyCreationSaComponent,
  TreeViewComponent,
  ProjTypeCreationAdminComponent,
  TreeViewAdminComponent,
  ProjCreationAdminComponent,
  LoginComponent,
  ForgotPasswordComponent,
  UnavailableComponent,
  NavigationComponent,
  DocumentComponent,
  UploadDocumentComponent,
  SearchDocumentComponent
]
