import { Helmet } from "react-helmet-async";
import AnimatedPage from "../components/AnimatedPage";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  useEffect,
  useState,
  useMemo,
  memo,
  type FC,
  type ReactNode,
} from "react";

// Type definitions
interface SocialIconProps {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}

interface CarouselSlideProps {
  image: string;
  height: number;
  index: number;
}

// Memoized social icon component to prevent unnecessary re-renders
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

// Memoized carousel slide component
const CarouselSlide: FC<CarouselSlideProps> = memo(
  ({ image, height, index }) => (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
      role="img"
      aria-label={`Slide ${index + 1}`}
    />
  ),
);

CarouselSlide.displayName = "CarouselSlide";

const Homepage: FC = () => {
  const [carouselHeight, setCarouselHeight] = useState<number>(0);

  // Memoize images array to prevent recreation on every render
  const images = useMemo<string[]>(
    () => [
      "static/slide1.jpg",
      "static/slide2.jpg",
      "static/slide3.jpg",
      "static/slide4.jpg",
      "static/slide5.jpg",
    ],
    [],
  );

  // Memoized structured data for local SEO
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Romeo Mihail Photography",
      image: "https://romeomihail.ro/static/logo-auriu.png",
      description:
        "Fotograf profesionist de nuntă și portret în București, România. Servicii complete de fotografie pentru evenimente speciale.",
      "@id": "https://romeomihail.ro",
      url: "https://romeomihail.ro",
      telephone: "+40-720-570-036",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Strada Example 123",
        addressLocality: "București",
        addressRegion: "București",
        postalCode: "010101",
        addressCountry: "RO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.4268,
        longitude: 26.1025,
      },
      areaServed: [
        {
          "@type": "City",
          name: "București",
        },
        {
          "@type": "AdministrativeArea",
          name: "Ilfov",
        },
        {
          "@type": "Country",
          name: "România",
        },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      sameAs: [
        "https://www.facebook.com/p/Romeo-Mihail-Photography-100063481926488/",
        "https://www.instagram.com/romeo_mihail_photography/",
      ],
    }),
    [],
  );

  useEffect(() => {
    const calculateHeight = (): void => {
      const navbarHeight = 64;
      const logoHeight =
        document.querySelector(".logo-container")?.clientHeight || 0;
      const dotsHeight = 60;
      let availableHeight =
        window.innerHeight - navbarHeight - logoHeight - dotsHeight;
      if (window.innerWidth <= 653) {
        availableHeight = window.innerHeight - dotsHeight;
      }
      setCarouselHeight(availableHeight);
    };

    calculateHeight();

    let timeoutId: number;
    const debouncedResize = (): void => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(calculateHeight, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    images.forEach((src: string) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const currentYear = useMemo<number>(() => new Date().getFullYear(), []);

  return (
    <>
      {/* Local SEO Meta Tags for Romania & Bucharest */}
      <Helmet>
        <html lang="ro" />

        {/* Primary Meta Tags */}
        <title>
          Fotograf Nuntă București | Romeo Mihail Photography - Servicii Foto
          Profesionale
        </title>
        <meta
          name="description"
          content="Fotograf profesionist de nuntă în București și România. Romeo Mihail Photography oferă servicii complete de fotografie pentru nunți, botezuri, evenimente corporate și portrete. Prețuri competitive, pachete personalizate."
        />
        <meta
          name="keywords"
          content="fotograf nunta bucuresti, fotograf profesionist bucuresti, fotograf nunta romania, servicii foto nunta, fotograf evenimente bucuresti, fotograf botez bucuresti, fotograf corporate bucuresti, fotograf portret bucuresti, pret fotograf nunta, romeo mihail photography"
        />

        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="RO-B" />
        <meta name="geo.placename" content="București" />
        <meta name="geo.position" content="44.4268;26.1025" />
        <meta name="ICBM" content="44.4268, 26.1025" />

        {/* Open Graph tags */}
        <meta
          property="og:title"
          content="Fotograf Nuntă București | Romeo Mihail Photography"
        />
        <meta
          property="og:description"
          content="Fotograf profesionist de nuntă în București. Capturăm momentele voastre speciale cu pasiune și profesionalism."
        />
        <meta
          property="og:image"
          content="https://romeomihail.ro/static/slide1.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:site_name" content="Romeo Mihail Photography" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fotograf Nuntă București | Romeo Mihail Photography"
        />
        <meta
          name="twitter:description"
          content="Fotograf profesionist de nuntă în București și România"
        />
        <meta
          name="twitter:image"
          content="https://romeomihail.ro/static/slide1.jpg"
        />

        {/* Structured Data for Local Business SEO */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Acasă",
                item: "https://yourwebsite.com",
              },
            ],
          })}
        </script>

        <link rel="canonical" href="https://yourwebsite.com" />
        <link rel="alternate" hrefLang="ro" href="https://yourwebsite.com" />
      </Helmet>

      <AnimatedPage>
        <div>
          {/* Logo Section */}
          <div className="logo-container items-center justify-center py-8 hidden sm:flex">
            <img
              src="static/logo-negru.png"
              alt="Romeo Mihail Photography - Fotograf Profesionist București"
              className="max-w-lg w-full px-4"
              width="512"
              height="auto"
              loading="eager"
            />
          </div>
          <div className="logo-container items-center justify-center py-8 flex sm:hidden absolute z-10">
            <img
              src="static/logo-auriu.png"
              alt="Romeo Mihail Photography - Fotograf Nuntă București"
              className="max-w-lg w-full px-4"
              width="512"
              height="auto"
              loading="eager"
            />
          </div>

          {/* Carousel Section */}
          <section
            className="w-full relative"
            aria-label="Portofoliu Fotografie Nuntă București"
          >
            <Carousel
              autoPlay
              infiniteLoop
              interval={3000}
              showStatus={false}
              showThumbs={false}
              showIndicators={true}
              swipeable={true}
              emulateTouch={true}
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    aria-label="Slide anterior"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    aria-label="Slide următor"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )
              }
            >
              {images.map((image, index) => (
                <CarouselSlide
                  key={image}
                  image={image}
                  height={carouselHeight}
                  index={index}
                />
              ))}
            </Carousel>
          </section>
        </div>

        {/* Footer Section with Local SEO Content */}
        <footer className="footer-section bg-gray-50 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
            {/* Main Heading with Local Keywords */}
            <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-6">
              Fotograf Profesionist de Nuntă în București și România
            </h1>

            {/* Description with Local SEO Keywords */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 px-4">
              Bine ați venit la Romeo Mihail Photography, fotograf profesionist
              specializat în fotografie de nuntă în București și în toată
              România. Cu ani de experiență și o viziune artistică unică,
              surprindem cele mai prețioase momente ale evenimentelor voastre
              speciale. Oferim servicii complete de fotografie pentru nunți,
              botezuri, evenimente corporate și portrete în București, Ilfov și
              în întreaga țară. Pachete personalizate și prețuri competitive.
            </p>

            {/* Local Service Areas */}
            <div className="mb-8 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Zone acoperite:</strong> București (toate sectoarele),
                Ilfov, Ploiești, Brașov, Constanța, Cluj-Napoca și toată România
              </p>
              <p>
                <strong>Servicii:</strong> Fotografie Nuntă, Fotografie Botez,
                Fotografie Corporate, Portrete Profesionale, Ședințe Foto
                Evenimente
              </p>
            </div>

            {/* Logo Signature */}
            <div className="flex justify-center mb-8">
              <img
                src="static/logo-negru.png"
                alt="Romeo Mihail Photography Logo București"
                className="h-48 w-auto"
                width="192"
                height="192"
                loading="lazy"
              />
            </div>

            {/* Partner Badge */}
            <div className="mx-auto mb-12">
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

            {/* Social Media Icons */}
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
            <p className="text-xs text-gray-500">
              © {currentYear}, Romeo Mihail Photography București. Design &
              Dezvoltare{" "}
              <a
                href="https://bowlingpin.com"
                className="text-amber-600 hover:text-amber-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                BowlingPin
              </a>
            </p>
          </div>
        </footer>

        {/* Custom Carousel Styles */}
        <style>{`
          .carousel .slider-wrapper,
          .carousel .slider {
            height: ${carouselHeight}px !important;
          }
          
          .carousel .slide {
            background: transparent;
            height: ${carouselHeight}px !important;
          }
          
          .carousel .control-dots {
            position: absolute;
            bottom: 10px;
            margin: 0;
          }
          
          .carousel .control-dots .dot {
            background: rgba(255, 255, 255, 0.5);
            box-shadow: none;
            width: 10px;
            height: 10px;
          }
          
          .carousel .control-dots .dot.selected {
            background: white;
          }
        `}</style>
      </AnimatedPage>
    </>
  );
};

export default Homepage;
