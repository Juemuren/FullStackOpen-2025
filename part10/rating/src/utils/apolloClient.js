import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

import Config from '../config';

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async (preContext) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...preContext.headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.log(error);
      return { headers: preContext.headers };
    }
  });

  const httpLink = new HttpLink({ uri: Config.APOLLO_URI });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
