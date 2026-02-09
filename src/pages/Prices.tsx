import { useState } from "react";
import { Link } from "react-router-dom";

interface Package {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  category: "nunta" | "botez" | "cununie" | "trash-the-dress";
}

const packages: Package[] = [
  {
    id: "nunta-basic",
    name: "Pachet Esențial",
    price: "2.500 RON",
    duration: "6 ore acoperire",
    category: "nunta",
    features: [
      "6 ore de fotografiere profesională",
      "Pregătiri mireasa sau mire",
      "Ceremonie religioasă sau civilă",
      "Ședință foto cu invitații",
      "300+ fotografii editate profesional",
      "Galerie online privată",
      "Livrare în 4 săptămâni",
    ],
  },
  {
    id: "nunta-premium",
    name: "Pachet Premium",
    price: "3.500 RON",
    duration: "10 ore acoperire",
    category: "nunta",
    popular: true,
    features: [
      "10 ore de fotografiere profesională",
      "Pregătiri mireasa și mire",
      "Ceremonie religioasă și civilă",
      "Petrecere completă (tort, dansuri, surprize)",
      "Ședință foto de cuplu",
      "500+ fotografii editate profesional",
      "Album foto premium 30x30cm (40 pagini)",
      "Galerie online privată",
      "Livrare în 3 săptămâni",
      "Cadou: Ședință foto aniversară 1 an",
    ],
  },
  {
    id: "nunta-luxury",
    name: "Pachet Luxury",
    price: "5.000 RON",
    duration: "Acoperire completă",
    category: "nunta",
    features: [
      "Acoperire nelimitată (de la pregătiri până la final)",
      "Al doilea fotograf inclus",
      "Pregătiri mireasa și mire",
      "Toate ceremoniile și petrecerea",
      "Ședință foto Save the Date (bonus)",
      "Ședință foto Trash the Dress (bonus)",
      "800+ fotografii editate profesional",
      "2 albume foto premium 30x30cm",
      "Stick USB personalizat cu toate fotografiile",
      "Galerie online privată premium",
      "Livrare în 2 săptămâni",
      "Suport prioritar 24/7",
    ],
  },
  {
    id: "botez-standard",
    name: "Pachet Botez Standard",
    price: "1.200 RON",
    duration: "3 ore acoperire",
    category: "botez",
    features: [
      "3 ore de fotografiere",
      "Ceremonie religioasă",
      "Petrecere și mesele",
      "Fotografii cu familia și nașii",
      "150+ fotografii editate",
      "Galerie online privată",
      "Livrare în 2 săptămâni",
    ],
  },
  {
    id: "botez-premium",
    name: "Pachet Botez Premium",
    price: "1.800 RON",
    duration: "5 ore acoperire",
    category: "botez",
    popular: true,
    features: [
      "5 ore de fotografiere",
      "Pregătiri acasă",
      "Ceremonie religioasă completă",
      "Petrecere și toate momentele speciale",
      "250+ fotografii editate profesional",
      "Album foto 20x20cm (30 pagini)",
      "Galerie online privată",
      "Livrare în 2 săptămâni",
    ],
  },
  {
    id: "cununie-civila",
    name: "Pachet Cununie Civilă",
    price: "800 RON",
    duration: "2 ore acoperire",
    category: "cununie",
    features: [
      "2 ore de fotografiere",
      "Ceremonie civilă completă",
      "Fotografii cu familia și invitații",
      "100+ fotografii editate",
      "Galerie online privată",
      "Livrare în 1 săptămână",
    ],
  },
  {
    id: "trash-the-dress",
    name: "Ședință Trash the Dress",
    price: "1.500 RON",
    duration: "2-3 ore ședință",
    category: "trash-the-dress",
    features: [
      "2-3 ore ședință foto creativă",
      "Locație la alegere (plajă, natură, urban)",
      "Coordonare concept artistic",
      "200+ fotografii editate artistic",
      "Retușare profesională avansată",
      "Galerie online privată premium",
      "Print-uri 30x40cm (5 bucăți)",
      "Livrare în 2 săptămâni",
    ],
  },
];

const Prices = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("toate");

  const categories = [
    { id: "toate", label: "Toate Pachetele" },
    { id: "nunta", label: "Nuntă" },
    { id: "botez", label: "Botez" },
    { id: "cununie", label: "Cununie Civilă" },
    { id: "trash-the-dress", label: "Trash the Dress" },
  ];

  const filteredPackages =
    selectedCategory === "toate"
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-40"
        style={{ backgroundColor: "#6F8584" }}
      >
        <div className="relative z-10">
          <p className="mb-3 text-xs tracking-widest uppercase text-white/60">
            Investiție în amintiri
          </p>
          <h1 className="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">
            Prețuri și Pachete
          </h1>
          <div
            className="h-px mx-auto mt-5 w-12"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
          <p className="max-w-2xl mx-auto mt-6 text-sm leading-relaxed text-white/80 md:text-base">
            Pachete flexibile și personalizabile pentru fiecare moment special.
            Prețuri transparente, fără costuri ascunse.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-20 py-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 text-sm font-semibold tracking-wide uppercase rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#6F8584] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-8 transition-all duration-300 bg-white border-2 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 ${
                pkg.popular
                  ? "border-[#6F8584]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              data-aos="fade-up"
              data-aos-delay={`${Math.min(index * 100, 600)}`}
            >
              {pkg.popular && (
                <div className="absolute px-4 py-1 text-xs font-bold tracking-wider text-white uppercase -top-3 left-1/2 -translate-x-1/2 bg-[#6F8584] rounded-full shadow-lg">
                  Cel mai popular
                </div>
              )}

              <div className="pb-6 mb-6 text-center border-b border-gray-200">
                <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                  {pkg.name}
                </h3>
                <p className="mb-4 text-sm text-gray-500">{pkg.duration}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-[#6F8584]">
                    {pkg.price.split(" ")[0]}
                  </span>
                  <span className="text-xl font-semibold text-gray-600">
                    {pkg.price.split(" ")[1]}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="flex-1 mb-8 space-y-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#6F8584]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                to="/contact"
                className={`block w-full py-3 text-sm font-semibold tracking-wide text-center uppercase transition-all rounded-lg ${
                  pkg.popular
                    ? "bg-[#6F8584] text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Solicită Ofertă
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-3xl font-light text-center text-[#6F8584]">
              Informații Importante
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#6F8584]/10">
                    <svg
                      className="w-6 h-6 text-[#6F8584]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Flexibilitate la plată
                    </h3>
                    <p className="text-sm text-gray-600">
                      Plată în rate fără dobândă disponibilă. Avans 30% la
                      rezervare, rest până la data evenimentului.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#6F8584]/10">
                    <svg
                      className="w-6 h-6 text-[#6F8584]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Personalizare completă
                    </h3>
                    <p className="text-sm text-gray-600">
                      Toate pachetele pot fi adaptate nevoilor dumneavoastră.
                      Contactați-ne pentru o ofertă personalizată.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#6F8584]/10">
                    <svg
                      className="w-6 h-6 text-[#6F8584]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Echipament profesional
                    </h3>
                    <p className="text-sm text-gray-600">
                      Camere full-frame, obiective premium și backup complet
                      pentru siguranța amintirilor voastre.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#6F8584]/10">
                    <svg
                      className="w-6 h-6 text-[#6F8584]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Acoperire națională
                    </h3>
                    <p className="text-sm text-gray-600">
                      Disponibil în București, Pitești, Brașov, Constanța și
                      oriunde în România. Transport inclus în pachet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container px-4 py-16 mx-auto md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-12 text-3xl font-light text-center text-[#6F8584]">
            Întrebări Frecvente
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Cum pot rezerva un pachet?",
                a: "Contactați-ne prin formularul de contact, WhatsApp sau telefon. După o discuție despre nevoile dumneavoastră, vă vom trimite o ofertă personalizată și contract.",
              },
              {
                q: "Ce se întâmplă dacă evenimentul depășește orele rezervate?",
                a: "Orele suplimentare se taxează separat (250 RON/oră). Vă recomandăm să estimați corect durata pentru a evita costuri neprevăzute.",
              },
              {
                q: "Când primesc fotografiile?",
                a: "Termenul de livrare variază între 1-4 săptămâni în funcție de pachet. Pentru urgențe putem livra mai repede cu un cost suplimentar.",
              },
              {
                q: "Pot vedea lucrările anterioare?",
                a: "Desigur! Explorați portofoliul nostru în secțiunea Albume sau contactați-ne pentru albume complete din nunți anterioare.",
              },
              {
                q: "Oferă servicii video?",
                a: "Da, avem colaboratori de încredere pentru filmări video. Contactați-ne pentru pachete foto+video combinate.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-light text-[#6F8584]">
            Gata să începem?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Contactați-ne astăzi pentru o consultație gratuită și o ofertă
            personalizată pentru evenimentul dumneavoastră special.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-[#6F8584] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Solicită Ofertă
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
            <Link
              to="/albume/nunta"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-white border-2 border-[#6F8584] text-[#6F8584] rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Vezi Portofoliul
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
