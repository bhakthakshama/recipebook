import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './dialog/dialog.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'recipebook';

  constructor (private dialog : MatDialog) {}

  ngOnInit(): void {

  }
  }

