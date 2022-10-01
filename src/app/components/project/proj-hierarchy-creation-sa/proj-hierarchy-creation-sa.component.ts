import { Component, OnInit } from '@angular/core';
import { IECONode, Orientation } from './econode';

@Component({
  selector: 'app-proj-hierarchy-creation-sa',
  templateUrl: './proj-hierarchy-creation-sa.component.html',
  styleUrls: ['./proj-hierarchy-creation-sa.component.css']
})
export class ProjHierarchyCreationSaComponent implements OnInit {

  public data:IECONode = {data: null};
  public srchTrmProjName: string = '';
  public srchTrmProjDesgn: string = '';
  public srchTrmLevel: string = '';
  public srchTrmLnkdTo: string = '';
  constructor() { }

  ngOnInit(): void {
    console.log(this.data.data);
  }
  Orientation=Orientation;

  setData() {
    this.data={data:{id:"Project Head"},linkColor:"#4554a5",background:"red",color:"white",children:[
      {data:{id:"Operations Controller Operations Controller"},linkColor:"#4554a5",background:"pink",color:"white",children:[
        {data:{id:"Operations Controller Operations Controller"}},
        {data:{id:"Operations Controller"},children:[
          {data:{id:"Operations Controller"},background:"silver"},
          {data:{id:"Operations Controller"}}
        ]}
      ]},
      {data:{id:"Operations Controller"}},
      {data:{id:"Operations Controller"},linkColor:"#4554a5",background:"orange",color:"white",children:[
        {data:{id:"Operations Controller"}},
        {data:{id:"Operations Controller"},background:"lightsteelblue",linkColor:"#4554a5",children:[
          {data:{id:"Operations Controller"}},
          {data:{id:"Operations Controller"}},
          {data:{id:"Operations Controller"}},
          {data:{id:"Operations Controller"},background:"black",linkColor:"#4554a5",children:[{data:{id:16}}]},
          {data:{id:"Operations Controller"}},
        ]},
      ]}
    ]}
    
  }
}
