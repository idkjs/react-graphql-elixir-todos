type t =
  | HomeRoute
  | LoginRoute
  | SignupRoute
  | NotFoundRoute

let fromString = x =>
  switch x {
  | list{"home","/"} => HomeRoute
  | list{"login"} => LoginRoute
  | list{"sign-up"} => SignupRoute
  | _ => NotFoundRoute
  }

let toString = x =>
  switch x {
  | LoginRoute => "/login"
  | SignupRoute => "/sign-up"
  | HomeRoute => "/"
  | NotFoundRoute => "/404"
  }

let go = route => route->toString->RescriptReactRouter.push
