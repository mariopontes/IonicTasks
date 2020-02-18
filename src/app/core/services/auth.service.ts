import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User, AuthProvider, AuthOptions } from './auth.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.authState = this.angularFireAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState.pipe(
      map(user => user !== null)
    )
  }

  authenticate({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {

    let operation: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInPopup(provider)
    } else {
      operation = isSignIn ? this.signIn(user) : this.signUp(user);
    }

    return operation;
  }


  logout(): Promise<any> {
    return this.angularFireAuth.auth.signOut();
  }

  private signIn({ email, password }: User): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  private signUp({ email, password, name }: User): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => credentials.user
        .updateProfile({ displayName: name, photoURL: null })
        .then(() => credentials)
      )
  }

  private signInPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider
        break;
    }

    return this.angularFireAuth.auth.signInWithPopup(signInProvider)
  }
}
