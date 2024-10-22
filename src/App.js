import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PhotoDetail from "./components/PhotoDetail";
import PhotoGallery from "./components/PhotoGallery";
import "./App.css";
import HomeScreen from "./components/HomeScreen";

const router = createBrowserRouter([
  {
    path: "/ia02-photo-gallery",
    element: <HomeScreen />,
  },
  {
    path: "/ia02-photo-gallery/photos",
    element: <PhotoGallery query="nature" />,
  },
  {
    path: "/ia02-photo-gallery/photos/:id",
    element: <PhotoDetail />,
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
