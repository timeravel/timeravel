import { Injectable } from '@angular/core';

import { User } from '../../../model/user'

import { AuthService } from '../auth.service'

import {GapiServiceStub} from '../../googleapi/test/stub-gapi.service'

const dummyTestUser: any = require('../../../../assets/test/unit/dummyTestUser.json');


@Injectable()

export class AuthServiceStub implements AuthService {

    gapiServiceInstance: GapiServiceStub;
    signedInUser: User;

    constructor() {
        this.gapiServiceInstance = new GapiServiceStub();
        var user: User = new User();
        this.signedInUser = new User();
        user.token = dummyTestUser.token;
        user.pictureUrl = dummyTestUser.pictureUrl;
        user.name = dummyTestUser.name;
        user.email = dummyTestUser.email;
        this.signInUser(user);
    }

    isUserSignedIn() {
        var isSignedIn: boolean = this.signedInUser.token && (this.signedInUser.token != "0");
        return isSignedIn;
    }

    signInUser(user: User) {
        this.changeUser(user);
    }

    changeUser(user: User) {
        this.signedInUser.email = user.email;
        this.signedInUser.name = user.name;
        this.signedInUser.token = user.token;
        this.signedInUser.pictureUrl = user.pictureUrl;
    }

    signOutUser() {
        var user: User = new User();
        this.changeUser(user);
    }

    logout() {
        this.signOutUser();
        this.gapiServiceInstance.logout();
    }

    /**
     * draws the google login button on the component passed as parameter
     * @param component the component on which the google login button shall be drawn
     */
    drawSignInButton(component) {
        this.gapiServiceInstance.drawSignInButton(component,this.signedInUser);
    }

}