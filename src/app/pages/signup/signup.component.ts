import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService,private snack :MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: ''

  }

  ngOnInit(): void {
  }
  formSubmit() {
    if (!this.user.username || !this.user.password  || !this.user.firstname  || !this.user.lastname  || !this.user.email  || !this.user.phone ) {
      // alert("please enter details");
      this.snack.open("please enter details","close",{
      duration:3000
      })
      return;
    }
    this.userService.addUser(this.user).subscribe({
      next: (data:any) => {
        console.log(data);
        alert(data.message)
      },
      error:(err)=>{
        console.log(err);
        alert("something went wrong")
        
      }
    })

  }

}
