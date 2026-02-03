import { Helmet } from "react-helmet-async";
import AnimatedPage from "../components/AnimatedPage";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useMemo, memo, type FC, type ReactNode } from "react";

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

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------
const Homepage: FC = () => {
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
        "Fotograf profesionist de nuntă și portret în București, România. Servicii complete de fotografie pentru părți speciale.",
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
        { "@type": "City", name: "București" },
        { "@type": "AdministrativeArea", name: "Ilfov" },
        { "@type": "Country", name: "România" },
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

  // Preload images
  useEffect(() => {
    images.forEach((src: string) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const currentYear = useMemo<number>(() => new Date().getFullYear(), []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* SEO                                                                */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ro" />
        <title>
          Fotograf Nuntă București | Romeo Mihail Photography - Servicii Foto
          Profesionale
        </title>
        <meta
          name="description"
          content="Fotograf profesionist de nuntă în București și România. Romeo Mihail Photography oferă servicii complete de fotografie pentru nunți, botezuri, martie corporate și portrete. Prețuri competitive, pachete personalizate."
        />
        <meta
          name="keywords"
          content="fotograf nunta bucuresti, fotograf profesionist bucuresti, fotograf nunta romania, servicii foto nunta, fotograf evenimente bucuresti, fotograf botez bucuresti, fotograf corporate bucuresti, fotograf portret bucuresti, pret fotograf nunta, romeo mihail photography"
        />
        {/* Geo Tags */}
        <meta name="geo.region" content="RO-B" />
        <meta name="geo.placename" content="București" />
        <meta name="geo.position" content="44.4268;26.1025" />
        <meta name="ICBM" content="44.4268, 26.1025" />
        {/* OG */}
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
        <meta property="og:url" content="https://romeomihail.ro" />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:site_name" content="Romeo Mihail Photography" />
        {/* Twitter Card */}
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
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Acasă",
                item: "https://romeomihail.ro",
              },
            ],
          })}
        </script>
        <link rel="canonical" href="https://romeomihail.ro" />
        <link rel="alternate" hrefLang="ro" href="https://romeomihail.ro" />
      </Helmet>

      <AnimatedPage>
        <div className="fullscreen-carousel-wrapper">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showStatus={false}
            showThumbs={false}
            showIndicators={true}
            swipeable={true}
            emulateTouch={true}
          >
            {images.map((image, index) => (
              <div key={image} className="carousel-slide-cover">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="carousel-slide-img"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <footer className="footer-section bg-gray-50 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-6">
              Fotograf Profesionist de Nuntă în București și România
            </h1>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 px-4">
              Bine ați venit la Romeo Mihail Photography, fotograf profesionist
              specializat în fotografie de nuntă în București și în toată
              România. Cu ani de experiență și o viziune artistică unică,
              surprindem cele mai prețioase momente ale evenimentelor voastre
              speciale. Oferim servicii complete de fotografie pentru nunți,
              botezuri, godine corporate și portrete în București, Ilfov și în
              întreaga țară. Pachete personalizate și prețuri competitive.
            </p>

            {/* Service areas */}
            <div className="mb-8 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Zone acoperite:</strong> București (toate sectoarele),
                Ilfov, Ploiești, Brașov, Constanța, Cluj-Napoca și toată România
              </p>
              <p>
                <strong>Servicii:</strong> Fotografie Nuntă, Fotografie Botez,
                Fotografie Corporate, Portrete Profesionale, Ședințe Foto
                планина
              </p>
            </div>

            {/* Logo */}
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

            {/* Partner badge */}
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

        <style>{`
          .fullscreen-carousel-wrapper {
            width: 100%;
            height: 100vh;
            overflow: hidden;
            position: relative;
          }

          /* The carousel root itself must also be 100 vh */
          .fullscreen-carousel-wrapper .carousel {
            height: 100vh;
          }

          /* Slider track + every slide = full height */
          .fullscreen-carousel-wrapper .carousel .slider-wrapper,
          .fullscreen-carousel-wrapper .carousel .slider {
            height: 100vh !important;
          }
          .fullscreen-carousel-wrapper .carousel .slide {
            height: 100vh !important;
            background: transparent !important;
          }

          .carousel-slide-cover {
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          .carousel-slide-img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }

          .fullscreen-carousel-wrapper .carousel .control-dots {
            position: absolute !important;
            bottom: 28px !important;
            left: 0;
            right: 0;
            margin: 0 !important;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 20;
            gap: 8px;
          }
          .fullscreen-carousel-wrapper .carousel .control-dots .dot {
            background: rgba(255, 255, 255, 0.5) !important;
            box-shadow: none !important;
            width: 10px !important;
            height: 10px !important;
            margin: 0 !important;
            border-radius: 50%;
            transition: background 0.2s;
          }
          .fullscreen-carousel-wrapper .carousel .control-dots .dot.selected {
            background: #fff !important;
          }

          .carousel-arrow {
            position: absolute !important;
            bottom: 24px !important;
            z-index: 20;
            background: rgba(0, 0, 0, 0.45);
            color: #fff;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
          }
          .carousel-arrow:hover {
            background: rgba(0, 0, 0, 0.7);
          }
          .carousel-arrow--prev {
            /* sit to the left of the dots cluster */
            left: calc(50% - 100px) !important;
          }
          .carousel-arrow--next {
            right: calc(50% - 100px) !important;
          }
        `}</style>
      </AnimatedPage>
    </>
  );
};

export default Homepage;
