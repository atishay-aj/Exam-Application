import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

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
    if (!this.user.username) {
      alert("please enter details");
      return;
    }
    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        alert("success")
      },
      error:(err)=>{
        console.log(err);
        alert("something went wrong")
        
      }
    })

  }

}
