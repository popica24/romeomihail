import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleWhatsAppClick } from "../helpers/WhatsAppClick";

interface MenuItem {
  label: string;
  href?: string;
  badge?: string;
  submenu?: SubMenuItem[];
  action?: () => void;
}

interface SubMenuItem {
  label: string;
  href?: string;
  badge?: string;
  items?: SubMenuItemItem[];
}

interface SubMenuItemItem {
  label: string;
  badge?: string;
  href: string;
  className?: string;
}

const menuItems: MenuItem[] = [
  {
    label: "ALBUME",
    submenu: [
      {
        label: "NUNTA",
        items: [
          { label: "ALEX & MARIA", badge: "NOU", href: "#" },
          { label: "ION & IOANA", badge: "NOU", href: "#" },
          { label: "GEORGE & ALEXANDRA", href: "#" },
          {
            label: "VEZI MAI MULT",
            href: "/albume/nunta",
            className: "underline underline-offset-2",
          },
        ],
      },
      {
        label: "BOTEZ",
        items: [
          { label: "PARASCHIV", href: "#" },
          { label: "ALEXANDRU", href: "#" },
          { label: "ANDREI", href: "#" },
          {
            label: "VEZI MAI MULT",
            href: "/albume/botez",
            className: "underline underline-offset-2",
          },
        ],
      },
      {
        label: "TRASH THE DRESS",
        items: [
          { label: "MARIA", badge: "NOU", href: "#" },
          { label: "IOANA", href: "#" },
          { label: "ALEXANDRA", href: "#" },
          {
            label: "VEZI MAI MULT",
            href: "/albume/trash-the-dress",
            className: "underline underline-offset-2",
          },
        ],
      },
    ],
  },
  {
    label: "PRETURI",
    href: "/preturi",
    submenu: [],
  },
  {
    label: "PREMII",
    href: "/premii",
    submenu: [],
  },
  {
    label: "DESPRE MINE",
    href: "/despre-mine",
  },
  {
    label: "CONTACT",
    action: handleWhatsAppClick,
  },
];

interface NavbarProps {
  items?: MenuItem[];
  logo?: React.ReactNode;
  logoScrolled?: React.ReactNode;
  className?: string;
}

const Navbar = ({
  items = menuItems,
  logo,
  logoScrolled,
  className = "",
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMenus({});
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const navHeight = navRef.current.offsetHeight;
      setScrolled(window.scrollY >= navHeight);
    };

    // Run once on mount to get initial state (in case page loads mid-scroll)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (menuLabel: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }));
  };

  const hasSubmenu = (item: MenuItem) =>
    item.submenu && item.submenu.length > 0;

  const renderBadge = (badge?: string) => {
    if (!badge) return null;
    return (
      <span className="bg-[#6F8584] text-white text-xs px-2 py-0.5 tracking-wider">
        {badge}
      </span>
    );
  };

  const renderChevronDown = (isOpen?: boolean) => (
    <svg
      className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const renderChevronRight = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Desktop Dropdown
  const renderDesktopDropdown = (item: MenuItem) => {
    if (!hasSubmenu(item)) return null;

    return (
      <div className="absolute left-0 mt-2 w-80 bg-white text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
        <div className="p-8 space-y-4">
          {item.submenu!.map((subItem, subIndex) => (
            <div key={subIndex}>
              <div className="flex items-center justify-between">
                <Link
                  to={subItem.href || "#"}
                  className="text-sm tracking-wider hover:text-gray-600 cursor-pointer"
                >
                  {subItem.label}
                </Link>
                <div className="flex items-center space-x-2">
                  {renderBadge(subItem.badge)}
                  {subItem.items && renderChevronRight()}
                </div>
              </div>
              {subItem.items && (
                <div className="ml-6 mt-2 space-y-2">
                  {subItem.items.map((nestedItem, nestedIndex) => (
                    <div
                      key={nestedIndex}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={nestedItem.href}
                        className={`block text-sm tracking-wider hover:text-gray-600 cursor-pointer ${nestedItem.className || ""}`}
                      >
                        {nestedItem.label}
                      </Link>
                      {renderBadge(nestedItem.badge)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mobile Submenu
  const renderMobileSubmenu = (item: MenuItem) => {
    if (!hasSubmenu(item)) return null;

    const isOpen = openMenus[item.label];

    return (
      isOpen && (
        <div className="mt-4 ml-4 space-y-4">
          {item.submenu!.map((subItem, subIndex) => (
            <div key={subIndex}>
              <div className="flex items-center justify-between">
                <Link to={subItem.href || "#"} className="text-sm">
                  {subItem.label}
                </Link>
                <div className="flex items-center space-x-2">
                  {renderBadge(subItem.badge)}
                  {subItem.items && renderChevronDown()}
                </div>
              </div>
              {subItem.items && (
                <div className="ml-4 mt-2 space-y-2">
                  {subItem.items.map((nestedItem, nestedIndex) => (
                    <div
                      key={nestedIndex}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={nestedItem.href}
                        className={`block text-sm text-gray-700 ${nestedItem.className || ""}`}
                      >
                        {nestedItem.label}
                      </Link>
                      {renderBadge(nestedItem.badge)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-40
        ${className}
        transition-colors duration-300 ease-in-out
        ${scrolled ? "bg-white text-black shadow-sm" : "bg-transparent text-white"}
      `}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16 space-x-8 text-xs tracking-wider">
            {scrolled ? (
              <Link to="/" className="mr-auto">
                {logoScrolled}
              </Link>
            ) : (
              <Link to="/" className="mr-auto">
                {logo}
              </Link>
            )}

            {items.map((item, index) => (
              <div key={index} className="relative group">
                {hasSubmenu(item) ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 transition-colors ${
                        scrolled ? "hover:text-gray-600" : "hover:text-gray-300"
                      }`}
                    >
                      <span>{item.label}</span>
                      {renderChevronDown()}
                    </button>
                    {renderDesktopDropdown(item)}
                  </>
                ) : (
                  <Link
                    to={item.href || "#"}
                    onClick={item.action || (() => {})}
                    className={`transition-colors ${
                      scrolled ? "hover:text-gray-600" : "hover:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-center h-16 px-4">
          {scrolled ? (
            <Link to="/" className="mr-auto">
              {logoScrolled}
            </Link>
          ) : (
            <Link to="/" className="mr-auto">
              {logo}
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none ms-auto"
            aria-label="Toggle menu"
          >
            {!isMobileMenuOpen ? (
              <div className="space-y-1.5">
                <div
                  className={`w-8 h-0.5 ${scrolled ? "bg-black" : "bg-white"} transition-colors`}
                ></div>
                <div
                  className={`w-8 h-0.5 ${scrolled ? "bg-black" : "bg-white"} transition-colors`}
                ></div>
                <div
                  className={`w-8 h-0.5 ${scrolled ? "bg-black" : "bg-white"} transition-colors`}
                ></div>
              </div>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white text-black z-50 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end items-center h-16 border-b border-gray-200 me-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-6 text-sm tracking-wider">
                {items.map((item, index) => (
                  <div key={index}>
                    {hasSubmenu(item) ? (
                      <>
                        <button
                          onClick={() => toggleMenu(item.label)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <span>{item.label}</span>
                          {renderChevronDown(openMenus[item.label])}
                        </button>
                        {renderMobileSubmenu(item)}
                      </>
                    ) : (
                      <Link
                        to={item.href || "#"}
                        className="block w-full text-left"
                        onClick={item.action || (() => {})}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
export type { MenuItem, SubMenuItem, SubMenuItemItem, NavbarProps };
