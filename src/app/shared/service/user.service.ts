import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  of,
  timer
} from 'rxjs';
import {
  User,
} from '../models/user.model';
import {
  SearchUser,
} from '../models/searchUser.model';
import {
  tap,
  switchMap,
  map
} from 'rxjs/operators';
import { MessageUser } from "../models/messageUser";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  public newsfeed: BehaviorSubject<MessageUser> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
  }

  searchUser(data: Object):Observable<Array<SearchUser>> {
      //console.log(data);
      return this.http.post<Array<SearchUser>>('api/user/search', data);
  };

  reloadNewsFeed(): Observable<MessageUser> {
    //timer(1000, 300000).pipe()
      return this.http.get<MessageUser>('api/user/newsfeed')
  };

  // fonction pour envoyer un message 
  public sendMessage(message: MessageUser): Observable<MessageUser> {
    
      return this.http.post<MessageUser>('api/user/message', message);
  };
  
  // fonction pour recevoir les informations de l'utilisateur
  public getCurrentUser(): Observable<User> {
    if (this.currentUser.value) {
      return this.currentUser;
    } else {
      return this.http.get<User>('api/user/current').pipe(
        tap((user: User) => {
          console.log(user)
          this.currentUser.next(user)
        }), switchMap(() => {
          return this.currentUser
        })
      );
    };
  };

  // fonction pour déconnecter 
  public disconnect() {
    this.currentUser.next(null);
  };

}
