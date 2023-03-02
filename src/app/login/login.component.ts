import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
  };
  constructor(private fb: FirebaseService, private route: Router) {}

  ngOnInit(): void {}

  signin(name: string, email: string) {
    this.user = {
      name: name,
      email: email,
      joined: new Date(),
      uid: this.generateUid(),
    };

    this.fb.fetchObject(email, 'email', 'users').then(
      (res) => {

        //user not registered
        if (res == 'no-data') {
          this.fb.addObject(this.user, 'users').then((res) => {
            sessionStorage.setItem('user', JSON.stringify(res));
            this.fb.openSnackBar('Registration Successful');
            this.goFindMovies();
          });
        } else {
          this.fb.openSnackBar('Login Successful');
          sessionStorage.setItem('user', JSON.stringify(res));
          this.goFindMovies();
        }
      },
      (err) => {
        this.fb.openSnackBar('An Error Occurred');

        console.log(err);
      }
    );
  }

  goFindMovies() {
    this.route.navigate(['/find']);
  }

  generateUid(): string {
    return 'xxxx-xx'.replace(/[x]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      return r.toString(16);
    });
  }
}
