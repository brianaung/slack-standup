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

export type Foo = {
  __typename?: "Foo";
  id: Scalars["String"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createFoo: Foo;
};

export type Query = {
  __typename?: "Query";
  sayHi?: Maybe<Scalars["String"]["output"]>;
};

export type SayHiQueryVariables = Exact<{ [key: string]: never }>;

export type SayHiQuery = { __typename?: "Query"; sayHi?: string | null };

export const SayHiDocument = gql`
  query SayHi {
    sayHi
  }
`;

/**
 * __useSayHiQuery__
 *
 * To run a query within a React component, call `useSayHiQuery` and pass it any options that fit your needs.
 * When your component renders, `useSayHiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSayHiQuery({
 *   variables: {
 *   },
 * });
 */
export function useSayHiQuery(
  baseOptions?: Apollo.QueryHookOptions<SayHiQuery, SayHiQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SayHiQuery, SayHiQueryVariables>(
    SayHiDocument,
    options
  );
}
export function useSayHiLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SayHiQuery, SayHiQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SayHiQuery, SayHiQueryVariables>(
    SayHiDocument,
    options
  );
}
export type SayHiQueryHookResult = ReturnType<typeof useSayHiQuery>;
export type SayHiLazyQueryHookResult = ReturnType<typeof useSayHiLazyQuery>;
export type SayHiQueryResult = Apollo.QueryResult<
  SayHiQuery,
  SayHiQueryVariables
>;
