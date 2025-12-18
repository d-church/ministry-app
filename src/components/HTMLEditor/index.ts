import { lazy } from "react";

const HTMLEditor = lazy(() => import("./HTMLEditor"));

export default HTMLEditor;
export type { HTMLEditorEditorMode } from "./types";
