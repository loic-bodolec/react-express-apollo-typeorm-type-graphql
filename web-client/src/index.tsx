import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getMainDefinition } from '@apollo/client/utilities';
import { API_PORT } from './config';

const GRAPHQL_ENDPOINT = '/graphql';

const httpLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
});

const webSocketProtocolAndHost = API_PORT
  ? `ws://localhost:${API_PORT}`
  : `${document.location.origin.replace('http', 'ws')}${GRAPHQL_ENDPOINT}`;

const wsLink = new WebSocketLink({
  uri: `${webSocketProtocolAndHost}${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
