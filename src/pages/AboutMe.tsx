import { Link } from "react-router-dom";
import { handleWhatsAppClick } from "../helpers/WhatsAppClick";

const AboutMe = () => {
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
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs tracking-widest uppercase text-white/80">
              Povestea din spatele obiectivului
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">
            Despre Mine
          </h1>
          <div
            className="h-px mx-auto mt-5 w-12"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
          <p className="max-w-2xl mx-auto mt-6 text-sm leading-relaxed text-white/80 md:text-base">
            Mai mult decât un fotograf — un povestitor vizual dedicat să
            captureze esența fiecărui moment special
          </p>
        </div>
      </div>

      {/* Main Story Section */}
      <div className="container px-4 py-16 mx-auto md:py-24">
        <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">
          {/* Image */}
          <div
            className="relative overflow-hidden shadow-2xl aspect-[3/4] rounded-2xl"
            data-aos="fade-right"
          >
            <img
              src="/static/slide1.jpg"
              alt="Romeo Mihail"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute px-4 py-2 text-lg font-semibold text-white rounded-lg shadow-lg bottom-6 left-6 bg-[#6F8584]">
              Romeo Mihail Photography
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6" data-aos="fade-left">
            <h2 className="text-3xl font-light text-[#6F8584] md:text-4xl">
              Bună, sunt Romeo Mihail
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Fotografia a intrat în viața mea acum peste 10 ani, când am
                realizat că pot transforma momentele fugare în amintiri eterne.
                Ce a început ca o pasiune s-a transformat într-o misiune: să
                capturez autenticitatea, emoția pură și frumusețea fiecărei
                povești de dragoste.
              </p>

              <p>
                Specializat în fotografia de nuntă, botez și portrete, am avut
                privilegiul de a documenta peste 500 de evenimente speciale în
                toată România. Fiecare cuplu, fiecare familie are o poveste
                unică, și rolul meu este să o spun prin imagini care vor rezista
                timpului.
              </p>

              <p>
                Cred în fotografia documentară autentică — momentele reale,
                emoțiile naturale, râsetele spontane. Nu posed scene perfecte;
                capturez perfecțiunea din imperfecțiuni. Sunt acolo în culisele
                pregătirilor, în lacrimile de bucurie ale părinților, în primul
                dans ca și cuplu.
              </p>

              <p className="font-medium text-[#6F8584]">
                Pentru mine, fotografia nu este doar despre a face poze — este
                despre a crea moșteniri vizuale pentru generațiile viitoare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="mb-4 text-3xl font-light text-[#6F8584] md:text-4xl"
              data-aos="fade-up"
            >
              Filosofia Mea
            </h2>
            <p
              className="mb-12 text-lg italic text-gray-600"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              "Fiecare fotografie spune o poveste. Fiecare poveste merită să fie
              spusă frumos."
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: (
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ),
                  title: "Autenticitate",
                  description:
                    "Capturez emoții reale, nu scene puse în scenă. Fiecare imagine reflectă adevărata esență a momentului.",
                },
                {
                  icon: (
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  ),
                  title: "Creativitate",
                  description:
                    "Fiecare eveniment este o pânză albă. Combin tehnica cu imaginația pentru rezultate unice.",
                },
                {
                  icon: (
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Profesionalism",
                  description:
                    "Punctualitate, echipament de top, backup complet și livrare la timp — fără compromisuri.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-8 transition-all bg-white shadow-lg rounded-xl hover:shadow-2xl hover:scale-105"
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100}`}
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-[#6F8584]/10 text-[#6F8584]">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="container px-4 py-16 mx-auto md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-12 text-3xl font-light text-center text-[#6F8584] md:text-4xl"
            data-aos="fade-up"
          >
            Călătoria Mea Profesională
          </h2>

          <div className="relative space-y-8">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-[#6F8584]/20 md:left-1/2" />

            {[
              {
                year: "2014",
                title: "Primii Pași",
                description:
                  "Am descoperit pasiunea pentru fotografie și am investit în primul meu echipament profesional. Primele nunți ca asistent fotograf.",
              },
              {
                year: "2016",
                title: "Fotograf Independent",
                description:
                  "Am lansat Romeo Mihail Photography și am documentat peste 50 de evenimente în primul an. Prima recunoaștere în concursuri locale.",
              },
              {
                year: "2019",
                title: "Expansiune Națională",
                description:
                  "Servicii în toată România. Echipă extinsă, al doilea fotograf și colaborări cu cele mai prestigioase locații de nunți.",
              },
              {
                year: "2022",
                title: "Premii Internaționale",
                description:
                  "Primul premiu internațional la WPJA. Peste 300 de nunți realizate. Featured în publicații de specialitate.",
              },
              {
                year: "2024",
                title: "Prezent",
                description:
                  "Peste 500 de evenimente documentate, 15+ premii naționale și internaționale. Referință în fotografia de nuntă din România.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                {/* Year Badge */}
                <div className="absolute left-0 flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-[#6F8584] md:left-1/2 md:-translate-x-1/2 md:hidden">
                  {item.year.slice(-2)}
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 p-6 ml-12 bg-white border-2 shadow-lg border-gray-200 rounded-xl md:ml-0 ${
                    index % 2 === 0
                  } md:w-[calc(50%-2rem)]`}
                >
                  <div className="mb-2 text-sm font-bold tracking-wider uppercase text-[#6F8584]">
                    {item.year}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2
              className="mb-4 text-3xl font-light text-center text-[#6F8584] md:text-4xl"
              data-aos="fade-up"
            >
              Echipamentul Meu
            </h2>
            <p
              className="mb-12 text-center text-gray-600"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Tehnologie profesională pentru rezultate excepționale
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  category: "Camere",
                  items: [
                    "Canon EOS R5 (2 bucăți)",
                    "Canon EOS R6 Mark II",
                    "Sony A7 IV (backup)",
                  ],
                },
                {
                  category: "Obiective",
                  items: [
                    "Canon RF 24-70mm f/2.8L",
                    "Canon RF 70-200mm f/2.8L",
                    "Canon RF 50mm f/1.2L",
                    "Canon RF 85mm f/1.2L",
                  ],
                },
                {
                  category: "Iluminat",
                  items: [
                    "Profoto B10 Plus (2 bucăți)",
                    "Godox V1 (3 bucăți)",
                    "Reflectoare și difuzoare profesionale",
                  ],
                },
                {
                  category: "Backup & Storage",
                  items: [
                    "Card-uri de memorie duble în toate camerele",
                    "Backup instantaneu pe 2 dispozitive",
                    "Cloud storage securizat",
                  ],
                },
              ].map((section, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-xl"
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100}`}
                >
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container px-4 py-16 mx-auto md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-12 text-3xl font-light text-center text-[#6F8584] md:text-4xl"
            data-aos="fade-up"
          >
            Ce Mă Diferențiază
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Abordare Documentară",
                description:
                  "Nu dirijez, nu pozez artificial. Las evenimentul să se desfășoare natural și capturez autenticitatea momentelor.",
              },
              {
                title: "Atenție la Detalii",
                description:
                  "De la lacrimile discrete ale mamei până la mâinile strânse ale copiilor, observ și imortalizez fiecare detaliu semnificativ.",
              },
              {
                title: "Relație cu Clienții",
                description:
                  "Înainte de eveniment ne întâlnim pentru a ne cunoaște. Astfel, în ziua mare sunt mai mult un prieten cu o cameră decât un străin.",
              },
              {
                title: "Post-Procesare Artistică",
                description:
                  "Fiecare fotografie este editată manual pentru a menține stilul meu caracteristic — luminos, natural, atempora",
              },
              {
                title: "Backup Complet",
                description:
                  "Sistem triplu de backup: card-uri duble, hard disk extern și cloud instant. Amintirile tale sunt în siguranță absolută.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 transition-all bg-white border-l-4 shadow-lg border-[#6F8584] rounded-r-xl hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Touch */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl p-8 mx-auto bg-white border-2 shadow-xl md:p-12 border-gray-200 rounded-2xl">
            <h2
              className="mb-6 text-2xl font-light text-center text-[#6F8584] md:text-3xl"
              data-aos="fade-up"
            >
              Dincolo de Cameră
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Când nu sunt la nunți sau botezuri, mă găsești explorând locuri
                noi cu camera în mână, citind despre tehnici fotografice sau
                savurând o cafea bună în timp ce editez fotografii.
              </p>
              <p>
                Sunt pasionat de călătorii (am fotografiat în peste 15 țări),
                iubitor de muzică jazz și adept al lifelong learning-ului.
                Particip regulat la workshopuri internaționale pentru a-mi
                perfecționa mereu abilitățile.
              </p>
              <p className="font-medium text-[#6F8584]">
                Cred că cel mai frumos lucru în fotografie este capacitatea de a
                îngheța timpul — de a prinde un zâmbet, o privire, o emoție care
                altfel s-ar pierde pentru totdeauna.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-3xl font-light text-[#6F8584]">
            Hai să creăm împreună amintiri de neuitat
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Sunt mereu entuziasmat să cunosc cupluri noi și să devin parte din
            povestea lor. Contactează-mă pentru o discuție fără obligații.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-[#6F8584] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contactează-mă
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
            </button>
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

export default AboutMe;
