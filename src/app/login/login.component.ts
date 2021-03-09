import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  constructor(
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
    let user = JSON.parse(localStorage.getItem('currentSharekAdmin'));
    console.log(user);
    if (user != null && user != undefined && user != {}) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.itemDoc = this.afs.doc<any>(
      'admins/' + this.loginForm.controls['email'].value
    );
    this.item = this.itemDoc.valueChanges();
    this.item.subscribe((event) => {
      console.log(event);
      if (event != undefined) {
        if (event.password == this.loginForm.controls['password'].value) {
          localStorage.setItem('currentSharekAdmin', JSON.stringify(event));
          this.router.navigate(['/']);
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'خطأ في اسم المستخدم او كلمة السر',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'خطأ في اسم المستخدم او كلمة السر',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
