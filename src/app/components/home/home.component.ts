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
    setTimeout(() => {
      this.input.nativeElement.select();
    });
  }

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', text);
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  downloadCsv(filename ,json) {
    const obj = JSON.parse(json);
    const columns = Object.keys(obj[0]);

    let contents = columns.join(',') + '\r\n';;
    contents += obj.map(entry => {
      return Object.values(entry).join(',');
    }).join('\r\n');

    this.download(filename, 'data:text/csv;charset=utf-8,' + encodeURI(contents));
  };
}
