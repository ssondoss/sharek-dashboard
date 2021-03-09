import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.css', '../app.component.css'],
})
export class ComplainsComponent implements OnInit {
  viewed = false;
  disabledNotes = true;
  disabledSelect = true;
  complains: Observable<any[]>;
  constructor(public firestore: AngularFirestore, private router: Router) {
    this.complains = firestore
      .collection('complaint-and-suggestions')
      .valueChanges();
  }

  viewing(): void {
    this.viewed = true;
  }
  editStatus(): void {
    this.disabledSelect = false;
  }
  confirmStatus(): void {
    this.disabledSelect = true;
  }
  confirmNotes(): void {
    this.disabledNotes = true;
  }
  editAditionalNotes(): void {
    this.disabledNotes = false;
  }

  getDate(date): any {
    return new Date(date);
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentSharekAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    }
  }

  onCityCahnged(value) {
    this.complains = this.firestore
      .collection('complaint-and-suggestions', (ref) =>
        ref.where('city', '==', value)
      )
      .valueChanges();
  }

  viewSelectChange(value) {
    if (value === 'false')
      this.complains = this.firestore
        .collection('complaint-and-suggestions', (ref) =>
          ref.where('viewed', '==', false)
        )
        .valueChanges();
    else
      this.complains = this.firestore
        .collection('complaint-and-suggestions', (ref) =>
          ref.where('viewed', '==', true)
        )
        .valueChanges();
  }

  onStatusSelectChanged(value) {
    this.complains = this.firestore
      .collection('complaint-and-suggestions', (ref) =>
        ref.where('status', '==', value)
      )
      .valueChanges();
  }

  onCategorySelectChanged(value) {
    this.complains = this.firestore
      .collection('complaint-and-suggestions', (ref) =>
        ref.where('category', '==', value)
      )
      .valueChanges();
  }

  onDateOrderSelectChage(value) {
    if (value == 'desc') {
      this.complains = this.firestore
        .collection('complaint-and-suggestions', (ref) =>
          ref.orderBy('date', 'desc')
        )
        .valueChanges();
    } else {
      this.complains = this.firestore
        .collection('complaint-and-suggestions', (ref) =>
          ref.orderBy('date', 'asc')
        )
        .valueChanges();
    }
  }
}
