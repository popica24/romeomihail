import { useMemo, type FC } from "react";
import AnimatedPage from "../../components/AnimatedPage";
import HeroCarousel from "./Components/HeroCarousel";
import QuoteSection from "./Components/QuoteSection";
import CategoriesGrid from "./Components/CategoriesGrid";
import FooterSection from "./Components/FooterSection";
import { Link } from "react-router-dom";
import { useCategoriesQuery } from "../../hooks/useCategoriesQuery";

const Homepage: FC = () => {
  // Fetch categories from backend
  const { data: categoriesData, isLoading } = useCategoriesQuery();

  // Static hero images (always use these)
  const heroImages = useMemo<string[]>(
    () => [
      "/static/slide1.jpg",
      "/static/slide2.jpg",
      "/static/slide3.jpg",
      "/static/slide4.jpg",
      "/static/slide5.jpg",
    ],
    []
  );

  const categories = useMemo(() => {
    if (!categoriesData || categoriesData.length === 0) {
      return [];
    }

    return categoriesData
      .filter((cat) => cat.is_active)
      .map((category) => ({
        text: category.name,
        link: category.slug,
        image: category.cover_url || "",
      }));
  }, [categoriesData]);

  return (
    <AnimatedPage>
      <div className="relative w-full h-screen">
        <HeroCarousel images={heroImages} />
        <QuoteSection quote="Fiți-ar viața zâmbet!" author="Romeo Mihail" />
      </div>

      {/* About Me CTA Button */}
      <div className="py-16 text-center bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-light text-[#6F8584] md:text-4xl">
            Cine Sunt?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 leading-relaxed text-gray-600">
            Bine ați venit! Sunt Romeo Mihail, fotograf profesionist specializat
            în capturarea momentelor voastre speciale. Cu peste 10 ani de
            experiență și o pasiune autentică pentru fotografie, transform
            amintirile în opere de artă.
          </p>
          <Link
            to="/despre-mine"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-[#6F8584] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            Descoperă Povestea Mea
            <svg
              className="w-5 h-5"
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
          </Link>
        </div>
      </div>

      {!isLoading && categories.length > 0 && (
        <CategoriesGrid categories={categories} />
      )}

      <FooterSection
        title="Fotograf Profesionist de Nuntă în București și România"
        description="Fotograf profesionist de nuntă din București, activ în toată România. Peste 10 ani de experiență în fotografie de nunți, botezuri, cununie civilă, evenimente corporate și portrete artistice. Servicii premium în București, Ilfov, Pitești, Brașov, Constanța și oriunde în țară. Pachete personalizate, prețuri competitive. Contactați-ne pentru ofertă!"
        zones="București (toate sectoarele), Ilfov, Ploiești, Brașov, Constanța, Cluj-Napoca și toată România"
        services="Fotografie Nuntă, Fotografie Botez, Fotografie Corporate, Portrete Profesionale, Ședințe Foto"
      />
    </AnimatedPage>
  );
};

export default Homepage;