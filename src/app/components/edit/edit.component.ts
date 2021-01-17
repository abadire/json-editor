import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  row = 0;

  columns: string[] = [];

  entries: object = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.row = +params.get('row');
    });

    this.entries = JSON.parse(localStorage.getItem('jsonStr'));
    this.columns = Object.keys(this.entries[0]);
  }

  get jsonStr() {
    return {
      str: JSON.stringify(this.entries),
    };
  }
}
