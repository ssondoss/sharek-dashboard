import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-view-complain',
  templateUrl: './view-complain.component.html',
  styleUrls: ['./view-complain.component.css', '../app.component.css'],
})
export class ViewComplainComponent implements OnInit {
  disabledNotes = true;
  disabledSelect = true;
  complainId: any;
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  staus: any = '';
  notes: any;
  userDoc: AngularFirestoreDocument<any>;
  itemuser: Observable<any>;
  userId: any;
  user: Observable<any>;
  counter: AngularFirestoreDocument<any>;
  conterItem: any;
  solved: any;
  rejected: any;

  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.complainId = params['id'];
      console.log(this.complainId);
      this.complainId = this.complainId.trim();
      this.itemDoc = this.afs.doc<any>(
        'complaint-and-suggestions/' + this.complainId
      );
      this.item = this.itemDoc.valueChanges();
      this.itemDoc.update({ viewed: true });
      this.item.subscribe((event) => {
        this.userId = event.nationalID;
        console.log(this.userId);
        this.userDoc = this.afs.doc<any>('users/' + this.userId.trim());
        this.user = this.userDoc.valueChanges();
      });
    });
    this.counter = this.afs.doc<any>('count/counters');
    this.conterItem = this.counter.valueChanges();
    this.solved;
    this.conterItem.subscribe((event) => {
      this.solved = event.solved;
      this.rejected = event.rejected;
    });
  }
  editStatus(): void {
    this.disabledSelect = false;
  }
  async confirmStatus(): Promise<void> {
    if (this.staus != '') {
      console.log(this.staus);
      this.itemDoc.update({ status: this.staus });
    }

    if (this.staus == 'تم حلها') {
      this.counter.update({ solved: this.solved + 1 });
    } else if (this.staus == 'تم رفضها') {
      this.counter.update({ rejected: this.rejected + 1 });
    }

    this.disabledSelect = true;
  }
  onChangeStatus(value): void {
    console.log(value);
    this.staus = value;
  }
  confirmNotes(value): void {
    this.itemDoc.update({ adminNotes: value });
    this.disabledNotes = true;
  }
  editAditionalNotes(): void {
    this.disabledNotes = false;
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentSharekAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    }
  }

  getImageURL(image) {
    if (image != null) {
      const url =
        'https://firebasestorage.googleapis.com/v0/b/sharek-80e70.appspot.com/o/' +
        image.replace('/', '%2F') +
        '?alt=media&token=61d1edbd-d44f-4b91-a86d-dfa0d65fd29c';
      return url;
    } else return '';
  }
  getVideoURL(video) {
    if (video != null) {
      const url =
        'https://firebasestorage.googleapis.com/v0/b/sharek-80e70.appspot.com/o/' +
        video.replace('/', '%2F') +
        '?alt=media&token=61d1edbd-d44f-4b91-a86d-dfa0d65fd29c';
      return url;
    } else return '';
  }
  getAdminNotes(value): string {
    return value === undefined ? 'لا يوجد' : value;
  }

  getPointN(points: string, n) {
    let array = points.split(' , ');
    return array[n];
  }

  getMediaType(name: string) {
    if (name.includes('images')) return 'image';
    if (name.includes('video')) return 'video';
    else return 'other';
  }
}
