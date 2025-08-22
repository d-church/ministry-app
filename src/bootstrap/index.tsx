/// <reference types="../../type-declarations/global.d.ts" />
import "core-js";
import { Suspense } from "react";

import "../style/tailwind.css";
import "../style/style.scss";

import "./i18n";
import Router from "../Router";
import AppInitializer from "../components/AppInitializer";
import { LoadingSpinner } from "../components/common";

export default () => (
  <Suspense fallback={<LoadingSpinner fullHeight centered />}>
    <AppInitializer>
      <Router />
    </AppInitializer>
  </Suspense>
);
