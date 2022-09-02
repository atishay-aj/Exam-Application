import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  loginData = {
    username: "",
    password: ""
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login");
    if (!this.loginData.username || !this.loginData.password) {
      // alert("please enter details");
      this.snack.open("please enter details", "close", {
        duration: 3000
      })
      return;
    }
    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log("success");
        console.log(data);
        this.login.setToken(data.token);
        this.login.getCurrentUser().subscribe((user) => {
          this.login.setUser(user);

          if (this.login.getUserRole() == "ADMIN") {
            this.router.navigate(['/admin']);
            // window.location.href="/admin";
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == "NORMAL") {

            this.router.navigate(['/user']);
            // window.location.href="/user";
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }

        })

      }, error: (err) => {
        console.log("error");

        console.log(err);
        this.snack.open("Invalid Username password", "close");
      }
    })
  }

}
