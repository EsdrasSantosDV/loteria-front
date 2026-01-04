/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from './../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApolloService {


  constructor(private apollo: Apollo) { }


  getUsers(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
          query {
            allUsers {
              id
              name
              email
            }
          }
        `,
        context: {
          uri: environment.graphqlUrl,
        },
      })
      .valueChanges.pipe(map((result: any) => result.data.allUsers));
  }

}
