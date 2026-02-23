import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { Spinner } from "./components/ui/spinner";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("User not found: ", err);
      })
      .finally(() => setLoading(false));
      const existingTheme = localStorage.getItem("theme");
      if (existingTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-2 text-lg min-h-screen bg-background text-foreground">
        <Spinner className="size-6" />
        <div className="">Loading......</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default App;
