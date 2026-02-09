import { useState } from "react";

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  badge?: string;
}

const awards: Award[] = [
  {
    id: "1",
    title: "Wedding Photographer of the Year",
    organization: "Romanian Photography Awards",
    year: "2024",
    category: "Nuntă",
    description:
      "Premiul cel mai prestigios în fotografia de nuntă din România, acordat pentru excelență în capturarea momentelor autentice și compoziție artistică excepțională.",
    image: "/static/slide1.jpg",
    link: "https://example.com/award1",
    badge: "Locul 1",
  },
  {
    id: "2",
    title: "Best Emotional Storytelling",
    organization: "International Wedding Photography Contest",
    year: "2024",
    category: "Nuntă",
    description:
      "Recunoscut la nivel internațional pentru abilitatea de a transforma emoțiile în imagini puternice care spun povești autentice.",
    image: "/static/slide2.jpg",
    link: "https://example.com/award2",
    badge: "Gold Medal",
  },
  {
    id: "3",
    title: "Best Christening Photography",
    organization: "European Photography Federation",
    year: "2023",
    category: "Botez",
    description:
      "Premiat pentru sensibilitate și creativitate în fotografia de botez, capturând puritatea și inocența momentelor sacre.",
    image: "/static/slide3.jpg",
    badge: "Silver Award",
  },
  {
    id: "4",
    title: "Creative Portrait of the Year",
    organization: "Portrait Masters Awards",
    year: "2023",
    category: "Portret",
    description:
      "Recunoaștere pentru portrete artistice care depășesc convenționalul, combinând tehnica impecabilă cu viziune creativă unică.",
    image: "/static/slide4.jpg",
    link: "https://example.com/award4",
  },
  {
    id: "5",
    title: "Trash the Dress Excellence",
    organization: "Fearless Photographers",
    year: "2023",
    category: "Trash the Dress",
    description:
      "Premiat pentru concepte îndrăznețe și execuție impecabilă în ședințele Trash the Dress, redefinind limitele fotografiei post-nuntă.",
    image: "/static/slide5.jpg",
    badge: "Finalist",
  },
  {
    id: "6",
    title: "Rising Star in Wedding Photography",
    organization: "WPJA (Wedding Photojournalist Association)",
    year: "2022",
    category: "Nuntă",
    description:
      "Recunoscut ca unul dintre cei mai promițători fotografi de nuntă din Europa de Est pentru stilul documentar autentic.",
    image: "/static/slide1.jpg",
    link: "https://example.com/award6",
  },
];

const categories = ["Toate", "Nuntă", "Botez", "Portret", "Trash the Dress"];

const Prizes = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const filteredAwards =
    selectedCategory === "Toate"
      ? awards
      : awards.filter((award) => award.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-40"
        style={{ backgroundColor: "#6F8584" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/10">
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs tracking-widest uppercase text-white/80">
              Excelență Recunoscută
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">
            Premii și Distincții
          </h1>
          <div
            className="h-px mx-auto mt-5 w-12"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
          <p className="max-w-2xl mx-auto mt-6 text-sm leading-relaxed text-white/80 md:text-base">
            Recunoscuți pentru excelență în fotografia profesională de către
            organizații naționale și internaționale. Fiecare premiu reprezintă
            pasiunea noastră pentru perfecțiune.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-20 py-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 text-sm font-semibold tracking-wide uppercase rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-[#6F8584] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs tracking-wide text-center text-gray-500">
            {filteredAwards.length}{" "}
            {filteredAwards.length === 1 ? "premiu" : "premii"} afișate
          </p>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="container px-4 py-16 mx-auto md:py-20">
        {filteredAwards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="w-20 h-20 mb-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Niciun premiu în această categorie
            </h3>
            <p className="text-gray-600">Selectează o altă categorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAwards.map((award, index) => (
              <div
                key={award.id}
                onClick={() => setSelectedAward(award)}
                className="relative overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 cursor-pointer group rounded-2xl hover:border-[#6F8584] hover:shadow-2xl hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={`${Math.min(index * 100, 600)}`}
              >
                {/* Badge */}
                {award.badge && (
                  <div className="absolute z-10 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-yellow-500 rounded-full shadow-lg top-4 right-4">
                    {award.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:opacity-100" />

                  {/* Year Badge */}
                  <div className="absolute px-3 py-1 text-sm font-bold text-white rounded-full shadow-lg bottom-4 left-4 bg-[#6F8584]">
                    {award.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase bg-gray-100 rounded-full text-[#6F8584]">
                    {award.category}
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-[#6F8584] transition-colors">
                    {award.title}
                  </h3>

                  <p className="mb-3 text-sm font-medium text-gray-600">
                    {award.organization}
                  </p>

                  <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {award.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs tracking-wide uppercase text-[#6F8584] font-semibold">
                      Detalii →
                    </span>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-gray-500 transition-colors hover:text-[#6F8584]"
                      >
                        Link extern ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { number: "15+", label: "Premii Internaționale" },
              { number: "8+", label: "Ani Experiență" },
              { number: "500+", label: "Evenimente Realizate" },
              { number: "98%", label: "Clienți Mulțumiți" },
            ].map((stat, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <div className="text-4xl font-bold text-[#6F8584] mb-2 md:text-5xl">
                  {stat.number}
                </div>
                <div className="text-sm tracking-wide text-gray-600 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container px-4 py-16 mx-auto md:py-20">
        <div className="max-w-3xl p-8 mx-auto bg-white border-2 shadow-xl md:p-12 border-gray-200 rounded-2xl">
          <svg
            className="w-12 h-12 mb-6 text-[#6F8584] opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
          <p className="mb-6 text-lg italic leading-relaxed text-gray-700 md:text-xl">
            "Fiecare premiu este o confirmare că drumul ales este cel corect.
            Dar adevărata satisfacție vine din zâmbetele clienților noștri și
            din amintirile pe care le capturăm pentru ei."
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#6F8584] text-white font-bold text-xl">
              RM
            </div>
            <div>
              <p className="font-semibold text-gray-900">Romeo Mihail</p>
              <p className="text-sm text-gray-600">
                Fotograf Profesionist | Fondator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-light text-[#6F8584]">
            Vrei și tu fotografii premiate?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Contactează-ne astăzi și hai să creăm împreună amintiri de neuitat
            pentru evenimentul tău special.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-[#6F8584] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contactează-ne
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
            </a>
            <a
              href="/albume/nunta"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-white border-2 border-[#6F8584] text-[#6F8584] rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Vezi Portofoliul
            </a>
          </div>
        </div>
      </div>

      {/* Award Detail Modal */}
      {selectedAward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden bg-white max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute z-10 flex items-center justify-center w-10 h-10 text-white transition-colors bg-black/50 rounded-full top-4 right-4 hover:bg-black/70"
            >
              <svg
                className="w-6 h-6"
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

            {/* Modal Image */}
            <div className="relative h-80 md:h-96">
              <img
                src={selectedAward.image}
                alt={selectedAward.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Badge on Image */}
              {selectedAward.badge && (
                <div className="absolute px-4 py-2 text-sm font-bold tracking-wider text-white uppercase bg-yellow-500 rounded-full shadow-lg top-4 left-4">
                  {selectedAward.badge}
                </div>
              )}
              <div className="absolute px-4 py-2 text-lg font-bold text-white rounded-full shadow-lg bottom-4 left-4 bg-[#6F8584]">
                {selectedAward.year}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider uppercase bg-gray-100 rounded-full text-[#6F8584]">
                {selectedAward.category}
              </div>

              <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
                {selectedAward.title}
              </h2>

              <p className="mb-6 text-lg font-medium text-gray-600">
                {selectedAward.organization}
              </p>

              <p className="mb-8 text-base leading-relaxed text-gray-700">
                {selectedAward.description}
              </p>

              {selectedAward.link && (
                <a
                  href={selectedAward.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-[#6F8584] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Vezi Detalii Complete
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prizes;
