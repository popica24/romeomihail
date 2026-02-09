import { memo, useMemo, type FC, type ReactNode } from "react";
import logo from "../assets/logo-negru.avif";
// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------
interface SocialIconProps {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Memoized social icon component
// ---------------------------------------------------------------------------
const SocialIcon: FC<SocialIconProps> = memo(
  ({ href, ariaLabel, children }) => (
    <a
      href={href}
      aria-label={ariaLabel}
      className="text-gray-700 hover:text-amber-600 transition-colors"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
);
SocialIcon.displayName = "SocialIcon";
const Footer = () => {
  const currentYear = useMemo<number>(() => new Date().getFullYear(), []);

  return (
    <footer className="footer-section bg-gray-50 py-16 px-4">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src={logo}
          alt="Romeo Mihail Photography Logo București"
          className="h-48 w-auto"
          width="192"
          height="192"
          loading="lazy"
        />
      </div>

      {/* Partner badge */}
      <div className="mx-auto mb-12 flex items-center justify-center">
        <a
          title="Catalogul fotografilor si videografilor de nunta din Romania"
          href="https://www.fotografi-cameramani.ro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-12 w-auto"
            alt="Fotografi-Cameramani.ro - Director Fotografi România"
            src="https://www.fotografi-cameramani.ro/layout/standard/images/logos/svg/fotografi-cameramani-negru.svg"
            width="auto"
            height="48"
            loading="lazy"
          />
        </a>
      </div>

      {/* Social icons */}
      <nav
        className="flex justify-center items-center space-x-6 mb-8"
        aria-label="Social media"
      >
        <SocialIcon
          href="https://www.facebook.com/yourpage"
          ariaLabel="Urmărește-ne pe Facebook"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </SocialIcon>

        <SocialIcon
          href="https://www.instagram.com/yourhandle"
          ariaLabel="Urmărește-ne pe Instagram"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path
              d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </SocialIcon>

        <SocialIcon
          href="mailto:contact@romeomihai.com"
          ariaLabel="Trimite-ne un email"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </SocialIcon>
      </nav>

      {/* Copyright */}
      <p className="text-xs text-gray-500 text-center">
        © {currentYear}, Romeo Mihail Photography București. Design & Dezvoltare{" "}
        <a
          href="https://bowlingpin.com"
          className="text-[#6F8584] hover:text-amber-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          BowlingPin
        </a>
      </p>
    </footer>
  );
};

export default Footer;
