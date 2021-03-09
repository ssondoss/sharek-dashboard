import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore, private router: Router) {
    this.items = firestore.collection('users').valueChanges();
    // this.items.forEach((x) => console.log(x));
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentSharekAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('currentSharekAdmin');
    this.router.navigate(['/login']);
  }
}
