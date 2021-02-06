import React, { useEffect, useState } from "react";
import { ApolloLink, ApolloProvider, NormalizedCacheObject } from "@apollo/react-hooks";

import { HttpLink, ApolloClient, InMemoryCache, from } from "@apollo/client";
import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import { decode } from "jsonwebtoken";
import { decodeJwt } from "../src/Jwt.bs";

import HomePage from "./home";

import LoginPage from "./login";
import SignupPage from "./sign-up";

export function TodoApp() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const history = useHistory();

  function login(token?: string) {
    // Token exists
    console.log("token: " + token);
    if (token) localStorage.setItem("auth-token", token);
    else if (!localStorage.getItem("auth-token")) return;
    let testJwt = decodeJwt(localStorage.getItem("auth-token"));
    console.log("testJwt: " + testJwt);
    // Token is valid
    const { exp } = decode(localStorage.getItem("auth-token")) as {
      exp: number;
    };
    console.log("exp: " + exp);
    if (Date.now() > exp * 1000) {
      localStorage.removeItem("auth-token");
      return;
    }

    const auth = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers }) => ({
        headers: {
          authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          ...headers,
        },
      }));
      return forward(operation);
    });

    const http = new HttpLink({ uri: "/api" });
    const link = from([auth, http]);

    setClient(
      new ApolloClient({
        link,
        cache: new InMemoryCache({
          typePolicies: {
            Folder: {
              fields: {
                items: {
                  merge(_existing, incoming) {
                    return incoming;
                  },
                },
              },
            },
            User: {
              fields: {
                folders: {
                  merge(_existing, incoming) {
                    return incoming;
                  },
                },
              },
            },
          },
        }),
      })
    );
    history.push("/home");
  }
  useEffect(login, []);

  return (
    <Switch>
      <Route path="/login">
        <LoginPage onLogin={login} />
      </Route>
      <Route path="/sign-up">
        <SignupPage onLogin={login} />
      </Route>
      <Route path="/home">
        {client ? (
          <ApolloProvider client={client}>
            <HomePage logout={() => (localStorage.removeItem("auth-token"), setClient(null))} />
          </ApolloProvider>
        ) : (
            <Redirect to={"/login"} />
          )}
      </Route>
      <Route path="/">
        <Redirect to={client ? "/home" : "/login"} />
      </Route>
    </Switch>
  );
}
