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
import { ProjTypeCreationComponent } from './components/project/proj-type-creation/proj-type-creation.component';
import { ListProjTypeCreationComponent } from './components/project/proj-type-creation/list-proj-type-creation/list-proj-type-creation.component';
import { CreateEditProjTypeCreationComponent } from './components/project/proj-type-creation/create-edit-proj-type-creation/create-edit-proj-type-creation.component';




const routes: Routes = [
  { path: 'company',
    component: CompanyComponent,
    children: [
      {
        path: 'search-company',
        component: SearchCompanyComponent
      },
      {
        path:  'create-edit-company',
        component: CreateEditCompanyComponent
      },
      {
        path:  'create-edit-company/:id',
        component: CreateEditCompanyComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'search-user',
        component: SearchUserComponent
      },
      {
        path:  'create-edit-user',
        component: CreateEditUserComponent
      },
      {
        path:  'create-edit-user/:id',
        component: CreateEditUserComponent
      }
    ]
  },
  {
    path: 'ga-user',
    component: UserGrantAccessComponent,
    children: [
      {
        path: 'ga-search-user',
        component: GaSearchUserComponent
      },
      {
        path:  'ga-create-edit-user',
        component: GaCreateEditUserComponent
      },
      {
        path:  'ga-create-edit-user/:id',
        component: GaCreateEditUserComponent
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'designation',
        component: DesignationComponent,
        children: [
          {
            path: 'list-designation',
            component: ListDesignationComponent
          },
          {
            path:  'create-edit-designation',
            component: CreateEditDesignationComponent
          },
          {
            path:  'create-edit-designation/:id',
            component: CreateEditDesignationComponent
          }
        ]
      },
      {
        path:  'department',
        component: DepartmentComponent,
        children: [
          {
            path: 'list-department',
            component: ListDepartmentComponent
          },
          {
            path:  'create-edit-department',
            component: CreateEditDepartmentComponent
          },
          {
            path:  'create-edit-department/:id',
            component: CreateEditDepartmentComponent
          }
        ]
      },
      {
        path:  'tagging',
        component: TaggingComponent,
        children: [
          {
            path: 'list-tagging',
            component: ListTaggingComponent
          },
          {
            path:  'create-edit-tagging',
            component: CreateEditTaggingComponent
          },
          {
            path:  'create-edit-tagging/:id',
            component: CreateEditTaggingComponent
          }
        ]
      },
      {
        path:  'doc-type-creation',
        component: DocTypeCreationComponent,
        children: [
          {
            path: 'list-doc-type-creation',
            component: ListDocTypeCreationComponent
          },
          {
            path:  'create-edit-doc-type-creation',
            component: CreateEditDocTypeCreationComponent
          },
          {
            path:  'create-edit-doc-type-creation/:id',
            component: CreateEditDocTypeCreationComponent
          }
        ]
      },
      {
        path:  'search-right',
        component: SearchRightComponent,
        children: [
          {
            path: 'list-search-right',
            component: ListSearchRightComponent
          },
          {
            path:  'create-edit-search-right',
            component: CreateEditSearchRightComponent
          },
          {
            path:  'create-edit-search-right/:id',
            component: CreateEditSearchRightComponent
          }
        ]
      }
    ]
  },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: 'proj-type-creation',
        component: ProjTypeCreationComponent,
        children: [
          {
            path: 'list-proj-type-creation',
            component: ListProjTypeCreationComponent
          },
          {
            path: 'create-edit-proj-type-creation',
            component: CreateEditProjTypeCreationComponent,
          },
          {
            path: 'create-edit-proj-type-creation/:id',
            component: CreateEditProjTypeCreationComponent, 
          }
        ]
      }
    ]
  },
  {
    path: "",
    redirectTo: "/company",
    pathMatch: "full",
  },
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
  ProjTypeCreationComponent,
  ListProjTypeCreationComponent,
  CreateEditProjTypeCreationComponent
]
