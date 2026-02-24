import { useParams, Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { useAlbumsQuery } from "../hooks/useAlbumsQuery";

const categoryMeta: Record<
  string,
  { title: string; subtitle: string; description: string }
> = {
  nunta: {
    title: "Nuntă",
    subtitle: "Momente care durează o veșnicie",
    description:
      "Fiecare poveste de dragoste merită să fie imortalizată cu eleganță și pasiune",
  },
  botez: {
    title: "Botez",
    subtitle: "Binecuvântări și zâmbete nevinovate",
    description:
      "Suflete pure în lumina harului divin, capturate cu grijă și sensibilitate",
  },
  cununie: {
    title: "Cununie Civilă",
    subtitle: "Începutul oficial al poveștii voastre",
    description:
      "Momentul în care dragostea devine oficial destinație, nu doar călătorie",
  },
  "trash-the-dress": {
    title: "Trash The Dress",
    subtitle: "Libertate, aventură și amintiri de neuitat",
    description:
      "O zi în care rochia de mireasă devine parte dintr-o poveste îndrăzneață",
  },
};

const AlbumCatalogue = () => {
  const { albumCategory } = useParams<{ albumCategory: string }>();
  const { data, isLoading, isError, error } = useAlbumsQuery(albumCategory);

  const meta = albumCategory ? categoryMeta[albumCategory] : null;
  const albums = data || [];
  
  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div
          className="flex items-center justify-center w-20 h-20 mb-6 rounded-full"
          style={{ backgroundColor: "#eef2f2" }}
        >
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Categorie inexistentă</h2>
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-[#6F8584] hover:opacity-70">
          ← Înapoi la Home
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 rounded-full animate-spin" style={{ borderColor: "#6F8584 transparent transparent transparent" }} />
            <div className="absolute inset-2 border-4 rounded-full animate-spin" style={{ borderColor: "transparent transparent #6F8584 transparent", animationDuration: "1.2s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 animate-pulse" style={{ color: "#6F8584" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm tracking-widest text-gray-500 uppercase">Se încarcă albumele</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <svg className="w-20 h-20 mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          {error?.message || "A apărut o eroare"}
        </h2>
        <button onClick={() => window.location.reload()} className="px-6 py-3 text-sm font-semibold tracking-wide uppercase bg-[#6F8584] text-white rounded-lg">
          Încearcă din nou
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center w-full px-6 pt-20 pb-16 text-center" style={{ backgroundColor: "#6F8584" }}>
        
        <div className="relative z-10">
          <p className="mb-3 text-xs tracking-widest uppercase text-white/60">Portofoliu</p>
          <h1 className="mb-2 text-4xl font-light tracking-tight text-white md:text-5xl">{meta.title}</h1>
          <p className="text-sm italic text-white/80 md:text-base">{meta.subtitle}</p>
          <div className="mx-auto mt-5 h-px w-12" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} />
          <p className="max-w-xs mx-auto mt-4 text-xs leading-relaxed text-white/60">{meta.description}</p>
        </div>
      </div>

      {/* Sticky Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto">
          <p className="text-xs tracking-widest text-gray-400 uppercase">
            {albums.length} {albums.length === 1 ? "Album" : "Albume"}
          </p>
          <p className="text-xs text-gray-400">Tap pentru a deschide albumul</p>
        </div>
      </div>

      {/* Empty */}
      {albums.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full" style={{ backgroundColor: "#eef2f2" }}>
            <svg className="w-8 h-8" style={{ color: "#6F8584" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Nu există albume încă</h3>
          <p className="max-w-xs text-sm text-gray-400">Albumele vor apărea aici în curând.</p>
        </div>
      )}

      {/* Grid */}
      {albums.length > 0 && (
        <div className="grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, i) => (
            <Link key={album.id} to={`/albume/${albumCategory}/${album.slug}`} className="block group" data-aos="fade-up" data-aos-delay={`${Math.min(i * 80, 600)}`}>
              <Tilt
                tiltAxis="y"
                glareEnable={true}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1200}
                transitionSpeed={1500}
                scale={1.02}
                gyroscope={true}
                className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img src={album.cover_url || "/dummy_cover.jpg"} alt={album.name} className="absolute inset-0 object-cover w-full h-full" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="mb-1 text-lg font-semibold tracking-wide text-white group-hover:underline underline-offset-4">{album.name}</h3>
                  {album.location && (
                    <p className="mb-1 text-xs text-white/60">
                      <i className="mr-1 fa-solid fa-location-dot" />
                      {album.location}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1 transition-all duration-300 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#6F8584" }}>
                      Vizualizează albumul
                    </span>
                    <svg className="w-4 h-4" style={{ color: "#6F8584" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute transition-all duration-300 -translate-y-1 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="p-2 rounded-full shadow-lg bg-white/90 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </Tilt>
            </Link>
          ))}
        </div>
      )}

      <footer className="py-8 mt-16 text-center border-t border-gray-100">
        <p className="text-xs tracking-widest text-gray-300 uppercase">Romeo Mihail © 2024</p>
      </footer>
    </div>
  );
};

export default AlbumCatalogue;