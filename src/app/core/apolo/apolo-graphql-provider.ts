import { Apollo, APOLLO_OPTIONS, provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from '../../../environments/environment.development';

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {

  const httpLink = inject(HttpLink);
  // Create a WebSocket link:
  const ws = new GraphQLWsLink(
    createClient({
      url: environment.graphqlUrl,
    }),
  );

  const http=httpLink.create({
    uri:environment.graphqlUrl
  })

  // Using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // Split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache(),
    // other options...
  };

  return {
    link: httpLink.create({uri:environment.graphqlUrl} ),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
