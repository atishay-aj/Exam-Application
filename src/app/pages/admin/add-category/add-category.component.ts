import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    "title":"",
    "description":""
  }

  constructor(private _category:CategoryService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(!this.category.title || !this.category.description){
      this.snackbar.open("Enter Details","close");
      return;
    }else{
      this._category.addcategory(this.category).subscribe({
        next:(data)=>{
          console.log(data);
          this.category.title="";
          this.category.description="";
          this.snackbar.open("Category saved","close");
          
        },
        error:(err)=>{
          this.snackbar.open("Error in saving category","close");
        }
      })
    }

  }

}
