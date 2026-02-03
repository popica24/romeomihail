import { Helmet } from "react-helmet-async";
import AnimatedPage from "../components/AnimatedPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useMemo, type FC } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------
const Homepage: FC = () => {
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

  useEffect(() => {
    images.forEach((src: string) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

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
          content="fotograf nunta bucuresti, fotograf profesionist bucuresti, fotograf nunta romania, servicii foto nunta, fotografહ
          izvori bucuresti, fotograf botez bucuresti, fotograf corporate bucuresti, fotograf portret bucuresti, pret fotograf nunta, romeo mihail photography"
        />
        <meta name="geo.region" content="RO-B" />
        <meta name="geo.placename" content="București" />
        <meta name="geo.position" content="44.4268;26.1025" />
        <meta name="ICBM" content="44.4268, 26.1025" />
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
        {/* ────────────────────────────────────────────────────────────── */}
        {/* FULLSCREEN SWIPER                                              */}
        {/* ────────────────────────────────────────────────────────────── */}
        <div className="w-full h-screen relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-btn--next",
              prevEl: ".swiper-btn--prev",
            }}
            className="w-full h-full homepage-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image} className="w-full h-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "auto"}
                />
              </SwiperSlide>
            ))}

            {/* Custom nav buttons sitting beside the dots */}
            <div className="swiper-btn--prev absolute bottom-7 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 transition-colors cursor-pointer">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="swiper-btn--next absolute bottom-7 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 transition-colors cursor-pointer">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Swiper>
        </div>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* FOOTER SECTION                                                 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-light text-[#6F8584] mb-6">
              Fotograf Profesionist de Nuntă în București și România
            </h1>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 px-4">
              Bine ați venit la Romeo Mihail Photography, fotograf profesionist
              specializat în fotografie de nuntă în București și în toată
              România. Cu ani de experiență și o viziune artistică unică,
              surprindem cele mai prețioase momente ale evenimentelor voastre
              speciale. Oferim servicii complete de fotografie pentru nunți,
              botezuri, där躍 corporate și portrete în București, Ilfov și în
              întreaga țară. Pachete personalizate și prețuri competitive.
            </p>

            <div className="mb-8 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Zone acoperite:</strong> București (toate sectoarele),
                Ilfov, Ploiești, Brașov, Constanța, Cluj-Napoca și toată România
              </p>
              <p>
                <strong>Servicii:</strong> Fotografie Nuntă, Fotographie Botez,
                Fotographie Corporate, Portrete Profesionale, Ședințe Foto
              </p>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* SWIPER STYLES                                                  */}
        {/* ────────────────────────────────────────────────────────────── */}
        <style>{`
          /* Dots row sits centered at the bottom; arrows flank it */
          .homepage-swiper .swiper-pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            bottom: 28px !important;
            /* push dots inward so arrows have room */
            padding: 0 52px;
            box-sizing: border-box;
          }

          .homepage-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            width: 10px !important;
            height: 10px !important;
            border-radius: 50%;
            margin: 0 !important;
            opacity: 1 !important;
            transition: background 0.2s;
          }

          .homepage-swiper .swiper-pagination-bullet-active {
            background: #fff !important;
          }

          /* Position the two arrow containers so they
             sit symmetrically beside the dot row */
          .homepage-swiper .swiper-btn--prev {
            left: calc(50% - 52px - 40px);
          }
          .homepage-swiper .swiper-btn--next {
            right: calc(50% - 52px - 40px);
          }

          /* Kill the default swiper arrows entirely */
          .homepage-swiper .swiper-button-prev,
          .homepage-swiper .swiper-button-next {
            display: none;
          }
        `}</style>
      </AnimatedPage>
    </>
  );
};

export default Homepage;
