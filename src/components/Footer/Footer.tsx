import { Link } from "react-router-dom";
import { Github, PenSquare, Twitter } from "lucide-react";
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
                A modern blogging platform for writers, thinkers, and creators.
                Share your stories with the world.
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
                  href="https://github.com/mustafa-sayyed/wyl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/_mustafa_sayyed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
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
