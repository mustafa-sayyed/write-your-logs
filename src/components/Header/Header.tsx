import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, LogoutBtn } from "../index";
import {
  Moon,
  Sun,
  Menu,
  X,
  PenSquare,
  Home,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import { toggleTheme } from "@/store/themeSlice";
import { Button } from "../ui/button";
import type { RootState } from "@/store/store";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Explore",
      path: "/all-posts",
      icon: BookOpen,
    },
    {
      name: "Write",
      path: "/add-post",
      icon: PenSquare,
    },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ?
            "h-14 border-b border-border/60 bg-background/95 backdrop-blur-xl shadow-sm"
          : "h-16 border-b border-border/40 bg-background/80 backdrop-blur-lg"
        }`}
      >
        <Container className="h-full">
          <nav className="flex justify-between items-center h-full">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight italic"
            >
              <span className="text-primary">WYL</span>
              <span className="text-muted-foreground font-normal text-sm ml-1.5">
                Write Your Logs
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {authStatus ?
                <>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive ?
                            "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="w-px h-6 bg-border mx-2" />
                  <LogoutBtn />
                </>
              : <div className="flex items-center gap-2">
                  <Button asChild>
                    <Link to="/signup" className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Get Started
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
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
            </div>

            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === "light" ?
                  <Sun className="h-5 w-5" />
                : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ?
                  <X className="h-5 w-5" />
                : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-14 left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              {authStatus ?
                <>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive ?
                            "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="h-px bg-border my-2" />
                  <div className="px-4">
                    <LogoutBtn />
                  </div>
                </>
              : <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <UserPlus className="w-5 h-5" />
                    Get Started
                  </Link>
                </div>
              }
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Header;
