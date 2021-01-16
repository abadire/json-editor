import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  columns: string[] = [];
  entries: object[] = [];

  constructor() { }

  ngOnInit(): void {
    if (history.state.str) {
      localStorage.setItem('jsonStr', history.state.str);
    }

    if (localStorage.getItem('jsonStr')) {
      this.entries = JSON.parse(localStorage.getItem('jsonStr'));
      this.columns = Object.keys(this.entries[0]);
    }
  }

  deleteEntry(idx) {
    this.entries.splice(idx, 1);
    localStorage.setItem('jsonStr', JSON.stringify(this.entries));
  }

  get jsonStr() {
    return {str: JSON.stringify(this.entries)};
  }
}
