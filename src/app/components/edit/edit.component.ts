import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  row: number = 0;
  columns: string[] = [];
  entries: object = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.row = +params.get('row');
    });

    this.entries = JSON.parse(localStorage.getItem('jsonStr'));
    this.columns = Object.keys(this.entries[0]);
  }

  routeToTable() {
    const str = JSON.stringify(this.entries);
    this.router.navigate(['/table'], {state: {str}});
  }
}
