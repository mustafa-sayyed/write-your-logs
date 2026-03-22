import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";
import { Container } from "../index";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <PenSquare className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">
                  <span className="text-primary">WYL</span>
                  <span className="text-muted-foreground font-normal text-sm ml-1">
                    Write Your Logs
                  </span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                A modern blogging platform for writers, thinkers, and creators. Share your
                stories with the world.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-posts"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-post"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Write
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4">Connect</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/mustafa-sayyed/write-your-logs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>
                <a
                  href="https://x.com/_sayyed_mustafa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-border/40">
          <div className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} WYL - Write Your Logs. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
