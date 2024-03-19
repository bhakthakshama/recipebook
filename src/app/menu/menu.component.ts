import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormDataComponent } from '../form-data/form-data.component';
import { ApiService } from '../service/api.service';
import {MatAccordion} from '@angular/material/expansion';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dataSource: any[]=[];

  displayedItems: any[] = [];
  @ViewChild(MatAccordion) accordion !: MatAccordion;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService) { }
  
  ngOnInit(): void {
    this.getAllRecipes();
   }

  currentlyOpenPanel: number | null = null;

  togglePanel(panelIndex: number) {
    if (this.currentlyOpenPanel === panelIndex) {
      this.currentlyOpenPanel = null; // Close the currently open panel if clicked again
    } else {
      this.currentlyOpenPanel = panelIndex; // Open the clicked panel
    }
  }

  applyFilter(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.displayedItems = this.dataSource.filter(recipe =>
      recipe.foodname.toLowerCase().includes(filterValue)
    );
    //this.applySorting();
  }


  getAllRecipes() {
    this.api.getrecipe().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.displayedItems = [...this.dataSource];
        // console.log("Fetched recipes:", this.dataSource);
        // console.log("DisplayedItems : "+this.displayedItems);
       // this.applySorting();
      },
      error: (err) => {
        alert("Error while retrieving the employee records.. Please check !");
      }
    });
  }

  // applySorting() {
  //   // if (this.sort && this.dataSource) {
  //   //   console.log(this.dataSource.sort +""+ this.sort);
  //   // }
  //   if (this.sort && this.displayedItems && this.displayedItems.length > 0) {
  //   if (this.sort.active && this.sort.direction) {
  //     this.displayedItems = this.displayedItems.sort((a, b) => {
  //       const isAsc = this.sort.direction === 'asc';
  //       let valueA = a[this.sort.active];
  //       let valueB = b[this.sort.active];

  //       // Handle cases where sorting column values might be null or undefined
  //       if (!valueA) valueA = '';
  //       if (!valueB) valueB = '';

  //       return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
  //     });
  //   }
  // }
  // }

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
