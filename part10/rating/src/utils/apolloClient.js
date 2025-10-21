import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import Config from '../config';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: Config.APOLLO_URI }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
