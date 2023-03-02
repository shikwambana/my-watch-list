import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: AngularFirestore,
    public snackbar: MatSnackBar
  ) {}

  addObject(data: any, collection: string) {
    return this.firestore
      .collection(collection)
      .add(data)
      .then(
        (res) => {
          return true;
        },
        (err) => {
          return err;
        }
      );
  }

  fetchObject(
    uid: string,
    identifier: string,
    collection: string,
    arr?: boolean
  ) {
    return this.firestore
      .collection(collection)
      .ref.where(identifier, '==', uid)
      .get()
      .then((query) => {
        if (!query.empty) {
          if (arr) {
            let arr: unknown[] = [];
            const snapshot = query.docs;
            snapshot.forEach((element) => {
              arr.push(element.data());
            });

            return arr;
          } else {
            const snapshot = query.docs[0];
            const data = snapshot.data();
            return data;
          }
        } else {
          return 'no-data';
        }
      });
  }

  deleteObject(uid: any, identifier: string, imdbID: string, collection: string){

    return this.firestore.collection(collection)
    .ref.where(identifier, '==', uid).where('imdbID','==',imdbID)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
    
  }

  getUser() {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user') || '{}');
    } else {
      return null;
    }
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'close', {
      duration: 2000,
    });
  }
}
