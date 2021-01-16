import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('textarea') input;
  @ViewChild('upload') fileInput;

  str:string = '';

  constructor() { }

  selectTextarea() {
    setTimeout(() => {
      this.input.nativeElement.select();
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    if (history.state.str) {
      this.str = history.state.str;
    }
    setTimeout(() => {
      this.selectTextarea();
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

  downloadJson(filename, json) {
    this.download(filename, 'data:text/json;charset=utf-8,' + encodeURI(json));
  }

  uploadFile() {
    this.fileInput.nativeElement.click();
    
  }
  
  readFile() {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.str = String(event.target.result);
      this.selectTextarea();
    });
    reader.readAsText(this.fileInput.nativeElement.files[0]);
  }
}
