import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient,private route:Router) { }

  /**
   * getCurrentUser
   */
  public   getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
      
  }

  public generateToken(loginData:any) {
    return this.http.post(`${baseUrl}/generate-token`,loginData)

  }

  public async setToken(token:any) {
   localStorage.setItem("token", token);
    return true;
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn() {
    let token=localStorage.getItem("token");
    if(token==undefined || token=='' || token==null){
      return false;
    }else{
      return true;
    }
  }

  /**
   * logout
   */
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  /**
   * getToken
   */
  public getToken() {
    return localStorage.getItem("token");
  }

  /**
   * setUser
   */
  public async setUser(user: any) {
    localStorage.setItem("user",JSON.stringify(user));
  }

  /**
   * getUser
   */
  public getUser() {
    let user= localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }

  /**
   * getUserRole
   */
  public getUserRole() {
    
    let user=this.getUser();
    return user.authorities[0].authority;
  }

}
