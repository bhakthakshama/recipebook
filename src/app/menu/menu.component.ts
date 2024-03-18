import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormDataComponent } from '../form-data/form-data.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //curPanelIndex : number | null = null;

  //curPanelIndex : boolean[] = [];

  dataSource: any[]=[];

  constructor(private dialog : MatDialog, private api : ApiService) { }

  currentlyOpenPanel: number | null = null;

  togglePanel(panelIndex: number) {
    if (this.currentlyOpenPanel === panelIndex) {
      this.currentlyOpenPanel = null; // Close the currently open panel if clicked again
    } else {
      this.currentlyOpenPanel = panelIndex; // Open the clicked panel
    }
  }

  // togglePanel(id : number)
  // {
    // if(this.curPanelIndex === id)
    // {
    //   this.curPanelIndex = null;
    // }
    // else{
    //   this.curPanelIndex = id;
    // }

    //console.log("toggle id : " +id);
    //this.curPanelIndex[id] = !this.curPanelIndex[id];
    //this.curPanelIndex = this.curPanelIndex === id ? null : id;

  // }

  // expandPanel(index : number) : boolean
  // {
  //   return this.curPanelIndex[index];
  //   return this.curPanelIndex === index;
  // }

  ngOnInit(): void {
   this.getAllRecipes();
  }

  getAllRecipes() {
    this.api.getrecipe().subscribe({
      next: (res) => {
        this.dataSource = res;
        //this.curPanelIndex = new Array(this.dataSource.length).fill(false);
      },
      error: (err) => {
        alert("Error while retrieving the employee records.. Please check !");
      }
    });
  }

  newrecipe()
  {
      this.dialog.open(FormDataComponent, {
        width : '35%' , height : '75%',
      }).afterClosed().subscribe(
        val => {
          if(val === 'SAVE')
          {
            this.getAllRecipes();
          }
        },
        error => { console.log(error)}
      )
  }

  updaterecipe(recipe :any)
  {
    this.dialog.open(FormDataComponent, {
      width : '35%', height : '75%',data : recipe
    }).afterClosed().subscribe(
      val => {
        if(val === 'UPDATE')
        {
          this.getAllRecipes();
        }
      },
      error => { console.log(error)}
    )
  }

  deleterecipe(id : number)
  {
    const confirmmsg = confirm("Are you sure you want to delete this recipe ? ");
    if(confirmmsg)
    {
      this.api.deleterecipe(id).subscribe({
        next : (res) => {
          alert("Recipe deletion successful");
          this.getAllRecipes();
        },
        error : (err) => {
          alert("Error while deleting the recipe... Please check")
        }
      })
    }
  }

}
