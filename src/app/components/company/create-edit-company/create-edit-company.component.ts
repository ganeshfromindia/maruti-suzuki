import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.css']
})
export class CreateEditCompanyComponent implements OnInit {
  public value: string = ''

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.value = this.route.snapshot.params['id'];
  }

}
