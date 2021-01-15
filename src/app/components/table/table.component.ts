import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  columns: string[];
  entries: object[];
  e: any;

  constructor() { }

  ngOnInit(): void {
    console.log(history.state.str);
    this.entries = JSON.parse(history.state.str);
    this.columns = Object.keys(this.entries[0]);
  }
}
