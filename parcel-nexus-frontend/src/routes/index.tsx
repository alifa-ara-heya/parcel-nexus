import App from "@/App";
// import AdminLayout from "@/components/ui/layouts/AdminLayout";
import About from "@/pages/About";
// import Analytics from "@/pages/Analytics";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: 'about'
      }
    ]
  },
  {
    Component: LoginPage,
    path: "/login",
  },
  {
    Component: RegisterPage,
    path: "/register",
  },
  // {
  //   Component: AdminLayout,
  //   path: "/admin",
  //   children: [
  //     {
  //       Component: Analytics,
  //       path: 'analytics'
  //     }
  //   ]
  // }
]);