import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myname') input; 

  str:string = '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  constructor() { }

  ngOnInit(): void {
    localStorage.clear();
    if (history.state.str) {
      this.str = history.state.str;
    }
  }
  
  ngAfterViewChecked() {
    this.input.nativeElement.select();
  }
}
