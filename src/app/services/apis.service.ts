import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

export class AuthInfo {
  constructor(public $uid: string) {}

  isLoggedIn() {
    return !!this.$uid;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  static UNKNOWN_USER = new AuthInfo(null);
  db = firebase.firestore();
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(
    ApisService.UNKNOWN_USER
  );
  constructor(
    private fireAuth: AngularFireAuth,
    private adb: AngularFirestore,
    private http: HttpClient
  ) {}

  checkAuth() {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem('uid', user.uid);
          resolve(user);
        } else {
          this.logout();
          localStorage.clear();
          resolve(false);
        }
      });
    });
  }

  checkEmail(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth
        .fetchSignInMethodsForEmail(email)
        .then((info: any) => {
          resolve(info);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  register(emails: string, pwd: string, fnames: string, lnames): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth
        .createUserWithEmailAndPassword(emails, pwd)
        .then((res) => {
          if (res.user) {
            this.db.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: emails,
              fname: fnames,
              lname: lnames,
              type: 'venue',
              status: 'active',
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch((err) => {
          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(err);
        });
    });
  }

  createAdminProfile(emails: string, pwd: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth
        .createUserWithEmailAndPassword(emails, pwd)
        .then((res) => {
          if (res.user) {
            this.db.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: emails,
              type: 'admin',
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch((err) => {
          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(err);
        });
    });
  }

  createVenue(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('venue')
        .doc(informations.uid)
        .set(informations)
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  alerts(title, message, type) {
    Swal.fire(title, message, type);
  }

  login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user) {
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch((err) => {
          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(err);
        });
    });
  }

  createUser(
    email: string,
    password: string,
    firstname: string,
    surname: string,
    profilePic: string,
    phone: string,
    position: string
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user) {
            this.db.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: email,
              firstname: firstname,
              surname: surname,
              profilePic: profilePic,
              fcm_token: '',
              phone: phone,
              position: position,
              status: 'active',
              type: 'user',
              id: res.user.uid,
              onlineStatus: 'active',
            });
            resolve(res.user);
          }
        })
        .catch((err) => {
          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(err);
        });
    });
  }

  logout(): Promise<void> {
    this.authInfo$.next(ApisService.UNKNOWN_USER);
    // this.db.collection('users').doc(localStorage.getItem('uid')).update({ "fcm_token": firebase.firestore.FieldValue.delete() })
    return this.fireAuth.auth.signOut();
  }

  getProfile(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('users')
        .doc(id)
        .get()
        .subscribe(
          (profile: any) => {
            resolve(profile.data());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getAdmin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('users', (ref) => ref.where('type', '==', 'admin'))
        .get()
        .subscribe(
          async (review) => {
            let data = review.docs.map((element) => {
              let item = element.data();
              item.id = element.id;
              return item;
            });
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getCurrecySymbol() {
    return environment.general.symbol;
  }

  getVenues(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('venue')
        .get()
        .subscribe(
          (venue) => {
            let data = venue.docs.map((element) => {
              let item = element.data();
              item.id = element.id;
              return item;
            });
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('users')
        .get()
        .subscribe(
          (users) => {
            let data = users.docs.map((element) => {
              let item = element.data();
              item.id = element.id;
              return item;
            });
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  sendNotification(msg, title) {
    const body = {
      app_id: environment.onesignal.appId,
      included_segments: ['Active Users', 'Inactive Users"'],
      headings: { en: title },
      contents: { en: msg },
      data: { task: msg },
    };
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${environment.onesignal.restKey}`),
    };
    return this.http.post(
      'https://onesignal.com/api/v1/notifications',
      body,
      header
    );
  }

  getVenueDetails(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('venue')
        .doc(id)
        .get()
        .subscribe(
          (venue: any) => {
            resolve(venue.data());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getMyProfile(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('users')
        .doc(id)
        .get()
        .subscribe(
          (users: any) => {
            resolve(users.data());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  addLocation(id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('locations')
        .doc(id)
        .set(param)
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  getLocations(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('locations')
        .get()
        .subscribe(
          (venue: any) => {
            let data = venue.docs.map((element) => {
              let item = element.data();
              item.id = element.id;
              return item;
            });
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getMessages(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('messages')
        .doc(id)
        .collection('chats')
        .get()
        .subscribe(
          (messages: any) => {
            console.log(messages);
            let data = messages.docs.map((element) => {
              let item = element.data();
              item.id = element.id;
              return item;
            });
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getMyAddress(uid: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('address')
        .doc(uid)
        .collection('all')
        .get()
        .then(
          (data) => {
            var users = data.docs.map((doc) => {
              var item = doc.data();
              item.id = doc.id;
              return item;
            });
            resolve(users);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  updateVenue(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('venue')
        .doc(informations.uid)
        .update(informations)
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateLocation(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('locations')
        .doc(informations.id)
        .update(informations)
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteLocation(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('locations')
        .doc(informations.id)
        .delete()
        .then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateProfile(uid, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('users')
        .doc(uid)
        .update(param)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getMyReviews(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb
        .collection('reviews', (ref) => ref.where('id', '==', id))
        .get()
        .subscribe(
          async (review) => {
            let data = review.docs.map((element) => {
              let item = element.data();
              item.id = element.id;
              if (item && item.vid) {
                item.vid.get().then(function (doc) {
                  item.vid = doc.data();
                });
              }

              return item;
            });
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
