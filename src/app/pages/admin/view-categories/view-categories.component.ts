import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  Categories:any = []

  constructor(private category: CategoryService, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.category.categories().subscribe({
      next: (data: any) => {
        this.Categories = data;
        console.log(this.Categories);

      },
      error:(err)=>{
        this.snackbar.open("Error in getting data","close");
      }
    })
  }

}
