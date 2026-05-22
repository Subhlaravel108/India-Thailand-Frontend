
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  LogOut,
  LogIn,
  UserPlus,
  Calendar,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo } from "@/lib/global_variables";
import {
  clearAuthSession,
  getStoredUser,
  getUserInitials,
  isAuthenticated,
  type AuthUser,
} from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function UserAvatar({
  user,
  className = "h-9 w-9",
}: {
  user: AuthUser;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      {user.avatar ? (
        <AvatarImage src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
      ) : null}
      <AvatarFallback className="bg-blue-900 text-white text-sm font-semibold">
        {getUserInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}

type HeaderProps = {
  /** Slim header for dashboard — hides top contact bar */
  compact?: boolean;
};

const Header = ({ compact = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const syncAuthState = useCallback(() => {
    const authed = isAuthenticated();
    setLoggedIn(authed);
    setUser(authed ? getStoredUser() : null);
  }, []);

  useEffect(() => {
    syncAuthState();
  }, [pathname, syncAuthState]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    clearAuthSession();
    setLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = (href: string) =>
    `relative py-1 text-sm font-medium transition-colors ${
      isActive(href)
        ? "text-blue-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-orange-500"
        : "text-gray-600 hover:text-blue-900"
    }`;

  const BookNowButton = ({ className = "" }: { className?: string }) => (
    <Link href="/book-now" onClick={closeMenu}>
      <Button
        size="sm"
        className={`bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-sm ${className}`}
      >
        <Calendar className="h-4 w-4 mr-1.5 hidden sm:inline" />
        Book Now
      </Button>
    </Link>
  );

  const UserMenu = ({ mobile = false }: { mobile?: boolean }) => {
    if (!user) return null;

    if (mobile) {
      return (
        <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <UserAvatar user={user} className="h-11 w-11" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <Link href="/dashboard" onClick={closeMenu}>
          <Button variant="outline" className="w-full justify-start">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            My Dashboard
          </Button>
        </Link>
        </div>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full ring-2 ring-transparent hover:ring-blue-100 focus:outline-none focus-visible:ring-blue-300 transition-shadow"
            aria-label="Account menu"
          >
            <UserAvatar user={user} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3 py-1">
              <UserAvatar user={user} className="h-10 w-10" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              My Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/book-now" className="cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" />
              Book a trip
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const GuestActions = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={
        mobile
          ? "flex flex-col gap-2 pt-3 border-t border-gray-100"
          : "flex items-center gap-2"
      }
    >
      <Link href="/login" onClick={closeMenu} className={mobile ? "w-full" : ""}>
        <Button
          variant="ghost"
          size="sm"
          className={
            mobile
              ? "w-full justify-start text-gray-700 hover:text-blue-900 hover:bg-blue-50"
              : "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
          }
        >
          <LogIn className="h-4 w-4 mr-2" />
          Login
        </Button>
      </Link>
      <Link href="/register" onClick={closeMenu} className={mobile ? "w-full" : ""}>
        <Button
          size="sm"
          variant="outline"
          className={
            mobile
              ? "w-full border-blue-900 text-blue-900 hover:bg-blue-50"
              : "border-blue-900 text-blue-900 hover:bg-blue-50"
          }
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Register
        </Button>
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {!compact && (
      <div className="hidden lg:block bg-blue-900 text-white">
        <div className="container mx-auto flex justify-between items-center gap-4 px-4 py-2 text-xs">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${contactInfo.phones[0]}`}
              className="flex items-center gap-1.5 hover:text-orange-200 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{contactInfo.phones[0]}</span>
            </a>
            <a
              href={`mailto:${contactInfo.emails[0]}`}
              className="flex items-center gap-1.5 hover:text-orange-200 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span>{contactInfo.emails[0]}</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-blue-100">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate max-w-md">{contactInfo.location}</span>
          </div>
        </div>
      </div>
      )}

      <nav className="container mx-auto px-4">
        <div className="flex h-16 lg:h-[4.25rem] items-center justify-between gap-3">
          <Link href="/" className="shrink-0 flex items-center">
            <img
              src="/tour-logo.png"
              alt={contactInfo.websiteName}
              className="h-12 w-auto sm:h-14 object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-7 flex-1 justify-center max-w-2xl mx-auto">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {loggedIn && user ? <UserMenu /> : <GuestActions />}
            <BookNowButton />
          </div>

          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {loggedIn && user && (
              <Link href="/dashboard" className="lg:hidden">
                <UserAvatar user={user} className="h-9 w-9 ring-2 ring-blue-100" />
              </Link>
            )}
            <BookNowButton className="!px-3 !text-xs sm:!text-sm" />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/30 lg:hidden z-40"
            aria-hidden
            onClick={closeMenu}
          />
          <div className="lg:hidden fixed left-0 right-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white border-b border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                {loggedIn && user ? (
                  <UserMenu mobile />
                ) : (
                  <GuestActions mobile />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
