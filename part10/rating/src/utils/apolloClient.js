import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import Config from '../config';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: `http://${Config.IP}:4000/graphql` }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
