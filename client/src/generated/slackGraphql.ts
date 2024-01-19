import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: "Mutation";
  updateUserRole: User;
};

export type MutationUpdateUserRoleArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  getAllUsers: Array<User>;
  getStandupEditHistory?: Maybe<Array<Maybe<Standup>>>;
  getStandupsFromDate?: Maybe<Array<Maybe<StandupUserList>>>;
  getUser: User;
};

export type QueryGetStandupEditHistoryArgs = {
  standupId: Scalars["String"]["input"];
};

export type QueryGetStandupsFromDateArgs = {
  endTs?: InputMaybe<Scalars["Float"]["input"]>;
  startTs?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type Standup = {
  __typename?: "Standup";
  id: Scalars["String"]["output"];
  standupId: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
  ts: Scalars["Float"]["output"];
  userId: Scalars["String"]["output"];
};

export type StandupUserList = {
  __typename?: "StandupUserList";
  image?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<Scalars["String"]["output"]>;
  standupId: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
  ts: Scalars["Float"]["output"];
  userId: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type Subscription = {
  __typename?: "Subscription";
  messageAdded?: Maybe<Standup>;
};

export type User = {
  __typename?: "User";
  image?: Maybe<Scalars["String"]["output"]>;
  role: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type GetStandupEditHistoryQueryVariables = Exact<{
  standupId: Scalars["String"]["input"];
}>;

export type GetStandupEditHistoryQuery = {
  __typename?: "Query";
  getStandupEditHistory?: Array<{
    __typename?: "Standup";
    text: string;
    ts: number;
  } | null> | null;
};

export type GetStandupsFromDateQueryVariables = Exact<{
  startTs?: InputMaybe<Scalars["Float"]["input"]>;
  endTs?: InputMaybe<Scalars["Float"]["input"]>;
}>;

export type GetStandupsFromDateQuery = {
  __typename?: "Query";
  getStandupsFromDate?: Array<{
    __typename?: "StandupUserList";
    standupId: string;
    userId: string;
    text: string;
    ts: number;
    username: string;
    role?: string | null;
    image?: string | null;
  } | null> | null;
};

export type MessageAddedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MessageAddedSubscription = {
  __typename?: "Subscription";
  messageAdded?: {
    __typename?: "Standup";
    id: string;
    standupId: string;
    userId: string;
    text: string;
    ts: number;
  } | null;
};

export const GetStandupEditHistoryDocument = gql`
  query GetStandupEditHistory($standupId: String!) {
    getStandupEditHistory(standupId: $standupId) {
      text
      ts
    }
  }
`;

/**
 * __useGetStandupEditHistoryQuery__
 *
 * To run a query within a React component, call `useGetStandupEditHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStandupEditHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStandupEditHistoryQuery({
 *   variables: {
 *      standupId: // value for 'standupId'
 *   },
 * });
 */
export function useGetStandupEditHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetStandupEditHistoryQuery,
    GetStandupEditHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetStandupEditHistoryQuery,
    GetStandupEditHistoryQueryVariables
  >(GetStandupEditHistoryDocument, options);
}
export function useGetStandupEditHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStandupEditHistoryQuery,
    GetStandupEditHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetStandupEditHistoryQuery,
    GetStandupEditHistoryQueryVariables
  >(GetStandupEditHistoryDocument, options);
}
export type GetStandupEditHistoryQueryHookResult = ReturnType<
  typeof useGetStandupEditHistoryQuery
>;
export type GetStandupEditHistoryLazyQueryHookResult = ReturnType<
  typeof useGetStandupEditHistoryLazyQuery
>;
export type GetStandupEditHistoryQueryResult = Apollo.QueryResult<
  GetStandupEditHistoryQuery,
  GetStandupEditHistoryQueryVariables
>;
export const GetStandupsFromDateDocument = gql`
  query GetStandupsFromDate($startTs: Float, $endTs: Float) {
    getStandupsFromDate(startTs: $startTs, endTs: $endTs) {
      standupId
      userId
      text
      ts
      username
      role
      image
    }
  }
`;

/**
 * __useGetStandupsFromDateQuery__
 *
 * To run a query within a React component, call `useGetStandupsFromDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStandupsFromDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStandupsFromDateQuery({
 *   variables: {
 *      startTs: // value for 'startTs'
 *      endTs: // value for 'endTs'
 *   },
 * });
 */
export function useGetStandupsFromDateQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetStandupsFromDateQuery,
    GetStandupsFromDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetStandupsFromDateQuery,
    GetStandupsFromDateQueryVariables
  >(GetStandupsFromDateDocument, options);
}
export function useGetStandupsFromDateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStandupsFromDateQuery,
    GetStandupsFromDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetStandupsFromDateQuery,
    GetStandupsFromDateQueryVariables
  >(GetStandupsFromDateDocument, options);
}
export type GetStandupsFromDateQueryHookResult = ReturnType<
  typeof useGetStandupsFromDateQuery
>;
export type GetStandupsFromDateLazyQueryHookResult = ReturnType<
  typeof useGetStandupsFromDateLazyQuery
>;
export type GetStandupsFromDateQueryResult = Apollo.QueryResult<
  GetStandupsFromDateQuery,
  GetStandupsFromDateQueryVariables
>;
export const MessageAddedDocument = gql`
  subscription MessageAdded {
    messageAdded {
      id
      standupId
      userId
      text
      ts
    }
  }
`;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >(MessageAddedDocument, options);
}
export type MessageAddedSubscriptionHookResult = ReturnType<
  typeof useMessageAddedSubscription
>;
export type MessageAddedSubscriptionResult =
  Apollo.SubscriptionResult<MessageAddedSubscription>;
