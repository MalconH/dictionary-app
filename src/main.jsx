import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { WordError } from "./components/WordError";
import "./index.css";
import Root from "./routes/root";
import { Words, loader as wordsLoader } from "./routes/Words";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/word/:word",
          element: <Words />,
          errorElement: <WordError />,
          loader: wordsLoader,
        },
      ],
    },
  ],
  {
    basename: "/dictionary-app",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
