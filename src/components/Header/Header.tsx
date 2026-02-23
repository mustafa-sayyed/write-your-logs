import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, LogoutBtn } from "../index";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/store/themeSlice";
import { Button } from "../ui/button";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: authStatus,
    },
    {
      name: "All Post",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <header className="h-16 bg-card flex items-center justify-center">
      <Container>
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold italic">
            <Link to="/">Write Your Thoughts</Link>
          </div>
          <ul className="flex items-center gap-6">
            {navItems.map((item, index) =>
              item.active ?
                <li key={index} className="hover:underline underline-offset-2">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              : null,
            )}
          </ul>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ?
                <Sun />
              : <Moon />}
            </Button>
            {authStatus && <LogoutBtn />}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
