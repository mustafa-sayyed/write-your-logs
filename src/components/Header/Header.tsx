import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, LogoutBtn } from "../index";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/store/themeSlice";
import { Button } from "../ui/button";
import type { RootState } from "@/store/store";

function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Post",
      path: "/all-posts",
    },
    {
      name: "Add Post",
      path: "/add-post",
    },
  ];
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border/40 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60 flex items-center justify-center">
      <Container>
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-xl font-light tracking-tight italic">
            WYL - Write Your Logs
          </Link>
          <ul className="flex items-center gap-1">
            {authStatus ?
              <>
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="ml-2">
                  <LogoutBtn />
                </li>
              </>
            : <div className="flex items-center gap-2">
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            }
            <Button
              variant="outline"
              size="icon"
              className="ml-2 cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ?
                <Sun className="h-5 w-5" />
              : <Moon className="h-5 w-5" />}
            </Button>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
