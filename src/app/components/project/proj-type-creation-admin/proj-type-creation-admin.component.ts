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
  public srchTrmProjName: string = '';
  public srchTrmSimilarTo: string = '';
  public urlHttpParams: any = {};

  constructor(
    private _beService: BackendService,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
  }
  Orientation = Orientation;
  setTreeData() {
    this.data = {
      data: { id: 'Project Head' },
      designationName: 'Project Head',
      linkColor: '#4554a5',
      background: 'red',
      color: 'white',
      children: [
        {
          data: { id: 'Operations Controller Operations Controller' },
          designationName: 'Operations Controller Operations Controller',
          linkColor: '#4554a5',
          background: 'pink',
          color: 'white',
          children: [
            { data: { id: 'Operations Controller Operations Controller' },
              designationName: 'Operations Controller Operations Controller' 
            },
            {
              data: { id: 'Operations Controller' },
              designationName: 'Operations Controller',
              children: [
                { data: { id: 'Operations Controller' }, background: 'silver', designationName: 'Operations Controller' },
                { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
              ],
            },
          ],
        },
        { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
        {
          data: { id: 'Operations Controller' }, designationName: 'Operations Controller',
          linkColor: '#4554a5',
          background: 'orange',
          color: 'white',
          children: [
            { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
            {
              data: { id: 'Operations Controller' },
              designationName: 'Operations Controller',
              background: 'lightsteelblue',
              linkColor: '#4554a5',
              children: [
                { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
                { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
                { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
                {
                  data: { id: 'Operations Controller' },
                  designationName: 'Operations Controller',
                  background: 'black',
                  linkColor: '#4554a5',
                  children: [{ data: { id: 16 }, designationName: 'Operations Controller' }],
                },
                { data: { id: 'Operations Controller' }, designationName: 'Operations Controller' },
              ],
            },
          ],
        },
      ],
    };
    console.log(this.data)
  }

}
