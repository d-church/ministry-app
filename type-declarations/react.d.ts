declare module "react" {
  import * as React from "react";

  // TODO: remove this when react/types is updated
  function use<T>(promise: Promise<T>): T;
}

export default React;