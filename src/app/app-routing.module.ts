import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { CompanyComponent } from './components/company/company.component';
import { CreateEditCompanyComponent } from './components/company/create-edit-company/create-edit-company.component';
import { SearchCompanyComponent } from './components/company/search-company/search-company.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'company',
    component: CompanyComponent,
    children: [
      {
        path: 'search-company',
        component: SearchCompanyComponent,
      },
      {
        path:  'create-edit-company',
        component: CreateEditCompanyComponent
      },
    ]
  },
  {
    path: 'user',
    component: UserComponent
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
  SearchCompanyComponent
]
