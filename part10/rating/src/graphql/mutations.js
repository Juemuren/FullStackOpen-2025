import { gql } from '@apollo/client';

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      createdAt
      rating
      text
      userId
      user {
        username
      }
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
