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

export type UpdateUserRoleMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  role: Scalars["String"]["input"];
}>;

export type UpdateUserRoleMutation = {
  __typename?: "Mutation";
  updateUserRole: {
    __typename?: "User";
    userId: string;
    username: string;
    role: string;
    image?: string | null;
  };
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: "Query";
  getAllUsers: Array<{
    __typename?: "User";
    userId: string;
    username: string;
    role: string;
    image?: string | null;
  }>;
};

export const UpdateUserRoleDocument = gql`
  mutation UpdateUserRole($id: String!, $role: String!) {
    updateUserRole(id: $id, role: $role) {
      userId
      username
      role
      image
    }
  }
`;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<
  UpdateUserRoleMutation,
  UpdateUserRoleMutationVariables
>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserRoleMutation,
    UpdateUserRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserRoleMutation,
    UpdateUserRoleMutationVariables
  >(UpdateUserRoleDocument, options);
}
export type UpdateUserRoleMutationHookResult = ReturnType<
  typeof useUpdateUserRoleMutation
>;
export type UpdateUserRoleMutationResult =
  Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserRoleMutation,
  UpdateUserRoleMutationVariables
>;
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    getAllUsers {
      userId
      username
      role
      image
    }
  }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
