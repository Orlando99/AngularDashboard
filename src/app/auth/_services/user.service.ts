import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { AuthenticationService } from ".";

@Injectable()
export class UserService {
    // constructor(private http: Http) {
    // }

    // verify() {
    //     return this.http.get('/api/verify ', this.jwt()).map((response: Response) => response.json());
    // }

    // forgotPassword(email: string) {
    //     return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    // }

    // getAll() {
    //     return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    // }

    // getById(id: number) {
    //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // create(user: User) {
    //     return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    // }

    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    // delete(id: number) {
    //     return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // private helper methods

    // private jwt() {
    //     // create authorization header with jwt token
    //     // let currentUser = firebase.auth().currentUser;
    //     // if (currentUser) {
    //         let headers = new Headers({ 'Authorization': 'Bearer '});
    //         return new RequestOptions({ headers: headers });
    //     // }
    // }

    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth
    ){
    }

    getCurrentUser(){
      return new Promise<any>((resolve, reject) => {
        var user = firebase.auth().onAuthStateChanged(function(user){
          if (user) {
            resolve(user);
          } else {
            reject('No user logged in');
          }
        })
      })
    }

    // updateCurrentUser(value){
    //     return new Promise((resolve, reject) => {
    //       var user = firebase.auth().currentUser;
    //       user.updateProfile({
    //         displayName: value.name,
    //         photoURL: user.photoURL
    //       }).then(res => {
    //         resolve(res)
    //       }, err => reject(err))
    //     })
    // }
}