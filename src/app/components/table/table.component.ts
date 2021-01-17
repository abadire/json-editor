import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  columns: string[] = [];

  entries: object[] = [];

  up = faArrowUp;

  down = faArrowDown;

  constructor(private router: Router) {}

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
    return { str: JSON.stringify(this.entries) };
  }

  moveDown(idx) {
    if (idx < this.entries.length - 1) {
      [this.entries[idx], this.entries[idx + 1]] = [this.entries[idx + 1], this.entries[idx]];
      localStorage.setItem('jsonStr', JSON.stringify(this.entries));
    }
  }

  moveUp(idx) {
    if (idx > 0) {
      [this.entries[idx], this.entries[idx - 1]] = [this.entries[idx - 1], this.entries[idx]];
      localStorage.setItem('jsonStr', JSON.stringify(this.entries));
    }
  }

  addEntry() {
    const obj = { ...this.entries[0] };
    Object.keys(obj).forEach((key) => { obj[key] = ''; });
    this.entries.push(obj);
    localStorage.setItem('jsonStr', JSON.stringify(this.entries));
    this.router.navigate([`table/edit/${this.entries.length - 1}`]);
  }
}
