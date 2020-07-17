import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { Course } from '../model/course';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    const courseRef = this.db.doc('/courses/UX5LiNUHnYeeOjY5KVQv')
      .snapshotChanges()
      .subscribe(snap => {
        const course: any = snap.payload.data();
        console.log(course.relatedCourseRef);
      });

    const ref = this.db.doc('courses/WKg5VNqhx5uLOjkWao9j')
      .snapshotChanges()
      .subscribe(doc => console.log('ref', doc.payload.ref));

  }

  save() {

    const firebaseCourseRef =
      this.db.doc('/courses/4FG5hvEFFb4lQk5srhkK').ref;

    const rxjsCourseRef =
      this.db.doc('/courses/7ncpZSHbFCOjOOPzCr8m').ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef, {titles: {description: 'Firebase Course'}});

    batch.update(rxjsCourseRef, {titles: {description: 'RxJs Course'}});

    const batch$ = of(batch.commit());

    batch$.subscribe();

  }

  async runTransaction() {

    const newCounter = await this.db.firestore
      .runTransaction(async trans => {

        console.log('Running transaction...');

        const courseRef = this.db.doc('/courses/i00po8m4wImf3H5pBYIB').ref;

        const snap = await trans.get(courseRef);

        const course = <Course> snap.data();

        const lessonsCount = course.lessonsCount + 1;

        trans.update(courseRef, {lessonsCount});

        return lessonsCount;

      });

      console.log('result lessons count = ' + newCounter);

  }

}
