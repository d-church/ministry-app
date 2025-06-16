import { createRoot } from "react-dom/client";

import App from "./bootstrap";

const rootContainer = document.getElementById("root")!;

createRoot(rootContainer).render(<App />);
