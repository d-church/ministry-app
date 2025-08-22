/// <reference types="../../type-declarations/global.d.ts" />
import "core-js";
import { Suspense } from "react";

import Router from "../Router";

import { LoadingSpinner } from "../components/common";

import AppInitializer from "./AppInitializer";
import "./i18n";

import "../style/tailwind.css";
import "../style/style.scss";

export default () => (
  <Suspense fallback={<LoadingSpinner fullHeight centered />}>
    <AppInitializer>
      <Router />
    </AppInitializer>
  </Suspense>
);
