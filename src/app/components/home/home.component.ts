import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { downloadCsv, downloadJson } from '../../../shared/download.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('textarea') input;

  @ViewChild('upload') fileInput;

  str = '';

  downloadCsv: (filename: string, text: string) => void = downloadCsv;

  downloadJson: (filename: string, text: string) => void = downloadJson;

  selectTextarea() {
    setTimeout(() => {
      this.input.nativeElement.select();
    });
  }

  constructor(private router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.str = history.state.str;
        this.selectTextarea();
      }
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    if (history.state.str) {
      this.str = history.state.str;
    }
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
