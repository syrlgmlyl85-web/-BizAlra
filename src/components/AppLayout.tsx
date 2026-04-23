import { ReactNode, useState } from "react";
import BottomNav from "./BottomNav";
import CookieSettings from "./CookieSettings";
import { LanguageToggle } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { Menu, X, Home, Wand2, User, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/create", icon: Wand2, label: t("nav.create") },
    { to: "/dashboard", icon: User, label: t("nav.dashboard") },
    { to: "/support", icon: HelpCircle, label: t("nav.support") },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
      >
        דלג לתוכן העיקרי / Skip to main content
      </a>

      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-3 right-3 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 shadow-sm hover:shadow-md transition-all"
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
        >
          {menuOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-primary" />}
        </button>
      </div>

      {/* Mobile side menu - Deep Navy sidebar */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm" onClick={closeMenu}>
          <div className="fixed right-0 top-0 h-full w-64 bg-primary shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-primary-foreground/20">
                <h2 className="text-lg font-semibold text-primary-foreground">תפריט</h2>
                <button onClick={closeMenu} className="p-1 text-primary-foreground hover:text-accent transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent transition-all"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Language toggle — floating top corner */}
      <div className="fixed top-3 left-3 z-50">
        <LanguageToggle />
      </div>
      <main id="main-content" className="flex-1 pb-20">{children}</main>
      <footer className="bg-card border-t border-border py-3 px-4 text-center">
        <div className="flex justify-center items-center gap-4">
          <Link to="/accessibility" className="text-xs text-muted-foreground hover:text-accent transition-colors font-medium">
            הצהרת נגישות
          </Link>
          <CookieSettings />
        </div>
      </footer>
      <BottomNav />
    </div>
  );
};

export default Layout;
