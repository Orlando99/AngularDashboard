import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from "@firebase/app";
import { FirebaseAuth } from "@firebase/auth-types";
import { auth } from "firebase/app";

@Injectable()
export class AuthGuard implements CanActivate {

    // constructor(private _router: Router, private _userService: UserService) {
    // }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // let currentUser = firebase.auth().currentUser;
        // return this._userService.verify().map(
        //     data => {
        //         if (data !== null) {
        //             // logged in so return true
        //             return true;
        //         }
        //         // error when verify so redirect to login page with the return url
        //         // this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return true;
        //     },
        //     error => {
        //         // error when verify so redirect to login page with the return url
        //         // this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         // return false;
        //         return true;
        //     });
    // }
    
    constructor(
        public afAuth: AngularFireAuth,
        public userService: UserService,
        private router: Router
    ) {}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return new Promise((resolve, reject) => {
                this.userService.getCurrentUser()
                .then(user => {
                    return resolve(true);
                }, err => {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return resolve(false);
                })
            })
    }
}