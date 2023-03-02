import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore,public snackbar: MatSnackBar,) {}

  addObject(data: any, collection: string) {
      return this.firestore
        .collection(collection)
        .add(data)
        .then(
          (res) => {
            console.log(res);
            return true
          },
          (err) => {
            console.log(err);
            return err;
          }
        );
  }

  fetchObject(uid: string, identifier: string, collection: string) {
    return this.firestore
        .collection(collection)
        .ref.where(identifier, '==', uid)
        .get()
        .then((query) => {
          if (!query.empty) {
            const snapshot = query.docs[0];
            const data = snapshot.data();
            return data;
          }else{
            return 'no-data'
          }
        });
  }

  getUser(){
    if(sessionStorage.getItem('user')){
      return JSON.parse(sessionStorage.getItem('user') || '{}')
    }else{
      return null
    }
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'close', {
        duration: 2000
    })
}
}
