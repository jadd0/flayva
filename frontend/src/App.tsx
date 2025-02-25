<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b6100fd (Added HomePage and a Sidebar removed Test.tsx from main route)
import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { queryClient } from "@lib/query";
import { Toaster } from "@components/ui/sonner";
import { Login } from "./pages/Login";
=======
>>>>>>> 8f2fef4 (Added HomePage and a Sidebar removed Test.tsx from main route)
import { Routes, Route, useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useMe } from "./hooks/auth.hooks";

/* Pages */
<<<<<<< HEAD
=======
import { Routes, Route, useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useMe } from "./hooks/auth.hooks";

/* Pages */
>>>>>>> 4407f90 (improved client side routing)
import HomePage from "@/pages/Home.page";
import AppSidebar from "@/components/layout/Sidebar";
import FeedPage from "./pages/Feed.page";
import LoginPage from "./pages/Login.page";
import LogoutPage from "./pages/Logout.page";
import CreatePostPage from "./pages/Create-post.page";
<<<<<<< HEAD

/**
 * Routes that should not show the sidebar
 */
const HIDE_SIDEBAR_ROUTES = ["/login"];

/**
 * A router that protects the routes it wraps by checking if the user is authenticated.
 *
 */
function AuthenticatedRouter() {
  const { data, isPending } = useMe();

  if (isPending) return "loading..."; // TODO: better loading view

  if (!data?.authenticated || !data.user) return <Navigate to="/login" />;

  return <Outlet />;
}

/**
 * A router that protects the routes it wraps by checking if the user is unauthenticated.
 *
 */
function UnauthenticatedRouter() {
  const { data, isPending } = useMe();

  if (isPending) return "loading..."; // TODO: better loading view

  if (data?.authenticated || data?.user) return <Navigate to="/feed" />;

  return <Outlet />;
}

/**
 * The main application component.
 */
=======
import { Test } from "@/components/Test";
import { AuthTest } from "@pages/AuthTest";
import  HomePage  from "@pages/HomePage";
=======
>>>>>>> 4407f90 (improved client side routing)

/**
 * Routes that should not show the sidebar
 */
const HIDE_SIDEBAR_ROUTES = ["/login"];

<<<<<<< HEAD
>>>>>>> b6100fd (Added HomePage and a Sidebar removed Test.tsx from main route)
=======
/**
 * A router that protects the routes it wraps by checking if the user is authenticated.
 *
 */
function AuthenticatedRouter() {
  const { data, isLoading } = useMe();

  if (isLoading) return "loading..."; // TODO: better loading view

  if (!data?.authenticated || !data.user) return <Navigate to="/login" />;

  return <Outlet />;
}

/**
 * A router that protects the routes it wraps by checking if the user is unauthenticated.
 *
 */
function UnauthenticatedRouter() {
  const { data, isLoading } = useMe();

  if (isLoading) return "loading..."; // TODO: better loading view

  if (data?.authenticated || data?.user) return <Navigate to="/feed" />;

  return <Outlet />;
}

/**
 * The main application component.
 */
>>>>>>> 4407f90 (improved client side routing)
function App() {
  const { pathname } = useLocation();

  const shouldShowSidebar = useMemo(() => !HIDE_SIDEBAR_ROUTES.includes(pathname), [pathname]);

  return (
<<<<<<< HEAD
    <div className="w-screen h-screen flex flex-row flex-nowrap justify-start">
=======
<<<<<<< HEAD
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
      <Routes>
        <Route path="/auth" element={<AuthTest />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
=======
=======
>>>>>>> 4407f90 (improved client side routing)
    <div className="w-screen h-screen flex flex-row flex-nowrap justify-center">
>>>>>>> 6df387d (improved client side routing)
      {shouldShowSidebar && <AppSidebar />}
<<<<<<< HEAD
      <main className="grow bg-amber-200 h-screen flex flex-col flex-nowrap overflow-x-hidden overflow-y-auto">
=======
<<<<<<< HEAD
      <main className="max-w-7xl border-x-2 border-red-800 border h-screen flex flex-col flex-nowrap overflow-auto">
=======
      <main className="grow bg-amber-200 h-screen flex flex-col flex-nowrap overflow-x-hidden overflow-y-auto">
>>>>>>> a4635a5 (uncomment out routing)
>>>>>>> 96bd7cf (uncomment out routing)
        <Routes>
          <Route index element={<HomePage />} />
          <Route element={<AuthenticatedRouter />}>
            <Route path="/post" element={<CreatePostPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Route>
          <Route element={<UnauthenticatedRouter />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<div>404 - Not found</div>} />
        </Routes>
      </main>
    </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 4407f90 (improved client side routing)
=======
>>>>>>> 4407f90 (improved client side routing)
>>>>>>> 6df387d (improved client side routing)
  );
}

export default App;
