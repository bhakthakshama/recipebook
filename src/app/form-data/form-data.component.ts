import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {ApiService} from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {

  //displayedNames : String[] = ['foodname','timetaken','ingredients','rating','review']
  
  dataSource: any[]=[];

  recipeform !: FormGroup;
  action = "SAVE"

  constructor( private formB : FormBuilder,
               private api : ApiService,
               @Inject (MAT_DIALOG_DATA) public editData:any,
               private dialogRef : MatDialogRef<FormDataComponent>) { }

  ngOnInit(): void {
    this.recipeform = this.formB.group ({
      foodname : ['', Validators.required],
      timetaken : ['', Validators.required],
      ingredients : ['', Validators.required],
      rating : ['', Validators.required],
      review : ['', Validators.required]
    })

    if(this.editData)
    {
      this.action = "UPDATE"
      this.recipeform.controls['foodname'].setValue(this.editData.foodname);
      this.recipeform.controls['timetaken'].setValue(this.editData.timetaken);
      this.recipeform.controls['ingredients'].setValue(this.editData.ingredients);
      this.recipeform.controls['rating'].setValue(this.editData.rating);
      this.recipeform.controls['review'].setValue(this.editData.review);    
    }
  }

  addrecipe(recipe :any)
  {
    if(!this.editData)
    {
      if(this.recipeform.valid)
      {
        this.dataSource.push(recipe);
        this.api.uploadrecipe(recipe).subscribe(
          {
            next : (res) => {
              alert("Recipe added !")
              this.recipeform.reset()
              this.dialogRef.close('SAVE')
              //this.recipeform
            },
            error : (err) => {
              alert("Error while adding recipe.. Please check !")
              console.log(err);
            }
          }
        )
      }
      else {
        alert("recipe form is not valid");
      }
    }
    else
    {
      this.updaterecipe();
    }
  }

  updaterecipe()
  {
    
    this.api.updaterecipe(this.editData.id, this.recipeform.value).subscribe({
      next : (res) => {
        alert("Recipe updated successfully!");
        const index = this.dataSource.findIndex(recipe => recipe.id === this.editData.id);
      if (index !== -1) {
        this.dataSource[index] = res;
      }
        this.recipeform.reset();
        this.dialogRef.close('UPDATE')
        this.recipeform
      },
      error : (err) => {
        alert("Error while updating recipe... Please check !")
      }
    })  
  }

}
