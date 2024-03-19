import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width : '60%', height : '63%'
    });
  }


}
