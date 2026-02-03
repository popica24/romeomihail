import { useParams, Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import AnimatedPage from "../components/AnimatedPage";

interface Album {
  id: string;
  name: string;
  coverUrl: string;
}

const categoryMeta: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  nunta: {
    title: "Nuntă",
    subtitle: "Wedding Day Memories",
    description: "Momentele speciale ale zilei tale cel mai frumos",
  },
  botez: {
    title: "Botez",
    subtitle: "Moments of Blessing",
    description: "Suflete pure în lumina harului",
  },
  trash_the_dress: {
    title: "Trash The Dress",
    subtitle: "Moments of Unity",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  },
};

const dummyAlbums: Record<string, Album[]> = {
  nunta: [
    {
      id: "andrei-si-maria",
      name: "Andrei si Maria",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "Alexandru-si-ana",
      name: "Alexandru si Ana",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "mihai-si-raluca",
      name: "Mihai si Raluca",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "gabriel-si-ioana",
      name: "Gabriel si Ioana",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "victor-si-Alexandra",
      name: "Victor si Alexandra",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "dan-si-florina",
      name: "Dan si Florina",
      coverUrl: "/dummy_cover.jpg",
    },
  ],
  botez: [
    { id: "botez-Emma", name: "Botez Emma", coverUrl: "/dummy_cover.jpg" },
    { id: "botez-Lucas", name: "Botez Lucas", coverUrl: "/dummy_cover.jpg" },
    { id: "botez-Sofia", name: "Botez Sofia", coverUrl: "/dummy_cover.jpg" },
    { id: "botez-Noah", name: "Botez Noah", coverUrl: "/dummy_cover.jpg" },
  ],
  trash_the_dress: [
    {
      id: "tdd-Maria",
      name: "Trash The Dress Maria",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "tdd-Ana",
      name: "Trash The Dress Ana",
      coverUrl: "/dummy_cover.jpg",
    },
    {
      id: "tdd-Ioana",
      name: "Trash The Dress Ioana",
      coverUrl: "/dummy_cover.jpg",
    },
  ],
};

const Catalogue = () => {
  const { albumCategory } = useParams<{ albumCategory: string }>();

  const meta = albumCategory ? categoryMeta[albumCategory] : null;
  const albums = albumCategory ? dummyAlbums[albumCategory] || [] : [];
  const notFound = !meta;

  // ─── NOT FOUND ────────────────────────────────────
  if (notFound) {
    return (
      <AnimatedPage>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: "#eef2f2" }}
          >
            <svg
              className="w-10 h-10 text-gray-300"
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
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Categorie inexistentă
          </h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs">
            Categoria pe care o cauți nu există sau a fost eliminată.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-opacity hover:opacity-70"
            style={{ color: "#6F8584" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Înapoi Acasǎ
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  // ─── MAIN ─────────────────────────────────────────
  return (
    <AnimatedPage>
      <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
        {/* ── Hero ── */}
        <div
          className="relative w-full flex flex-col items-center justify-center text-center px-6 pt-20 pb-16"
          style={{ backgroundColor: "#6F8584" }}
        >
          {/* pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
              Portofoliu
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-tight mb-2">
              {meta.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base italic">
              {meta.subtitle}
            </p>
            <div
              className="mx-auto mt-5 h-px w-12"
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            />
            <p className="text-white/60 text-xs mt-4 max-w-xs mx-auto leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>

        {/* ── Sticky Bar ── */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <p className="text-gray-400 text-xs tracking-widest uppercase">
              {albums.length} {albums.length === 1 ? "Album" : "Albume"}
            </p>
            <p className="text-xs text-gray-400">
              Tap pentru a deschide albumul
            </p>
          </div>
        </div>

        {/* ── Empty ── */}
        {albums.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#eef2f2" }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "#6F8584" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-gray-800 text-lg font-semibold mb-2">
              Nu există albume încă
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Albumele vor apărea aici în curând. Reveniți mai târziu.
            </p>
          </div>
        )}

        {/* ── Grid ── */}
        {albums.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, i) => (
              <Link
                key={album.id}
                to={`/album?name=${album.id}`}
                className="group block"
                data-aos="fade-up"
                data-aos-delay={`${Math.min(i * 80, 600)}`}
              >
                <Tilt
                  tiltAxis="y"
                  glareEnable={true}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1200}
                  transitionSpeed={1500}
                  scale={1.02}
                  gyroscope={true}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={album.coverUrl}
                    alt={album.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />

                  {/* content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-lg font-semibold tracking-wide mb-1 group-hover:underline underline-offset-4 transition-all">
                      {album.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "#6F8584" }}
                      >
                        Vizualiză albumul
                      </span>
                      <svg
                        className="w-4 h-4"
                        style={{ color: "#6F8584" }}
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
                  </div>

                  {/* eye icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </Tilt>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Catalogue;
