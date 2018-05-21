import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class AuthenticationService {

    // constructor(private http: Http) {
    // }
    
    constructor(public afAuth: AngularFireAuth){
    }

    // login(email: string, password: string) {
    //     return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let user = response.json();
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }
    //         });
    // }

    login(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            resolve(res);
          }, err => reject(err))
        })
    }

    doRegister(value){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
            .then(res => {
                resolve(res);
            }, err => reject(err))
        })
    }

    logout(){
        this.afAuth.auth.signOut();
    }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    // }
}