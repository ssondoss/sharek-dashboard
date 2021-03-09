import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phone-address',
  templateUrl: './phone-address.component.html',
  styleUrls: ['./phone-address.component.css', '../app.component.css'],
})
export class PhoneAddressComponent implements OnInit {
  phoneAddressForm: FormGroup;
  phones: Observable<any[]>;
  private itemDoc: AngularFirestoreDocument<any>;
  constructor(
    public firestore: AngularFirestore,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.phones = firestore.collection('phone-book').valueChanges();
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentSharekAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    }
    this.phoneAddressForm = this.formBuilder.group({
      category: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      contactName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
    });
  }
  delete(id: string): void {
    this.itemDoc = this.firestore.doc<any>('phone-book/' + id.trim());
    this.itemDoc.delete();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'تم الحذف ',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  add(): void {
    console.log('add');
    let id = this.makeId(20);
    this.itemDoc = this.firestore.doc<any>('phone-book/' + id);
    this.itemDoc.set({
      id: id,
      category: this.phoneAddressForm.controls['category'].value,

      name: this.phoneAddressForm.controls['contactName'].value,
      phone: this.phoneAddressForm.controls['phoneNumber'].value,
    });
    this.phoneAddressForm = this.formBuilder.group({
      category: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      contactName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
    });

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'تم الاضافة ',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  makeId(length): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
