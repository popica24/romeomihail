import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  nunta: {
    title: "Nuntă",
    subtitle: "Wedding Memories",
  },
  botez: {
    title: "Botez",
    subtitle: "Christening Moments",
  },
  cununie: {
    title: "Cununie",
    subtitle: "Wedding Ceremony",
  },
  "trash-the-dress": {
    title: "Trash the Dress",
    subtitle: "After Wedding Session",
  },
};

const AlbumDisplay = () => {
  const { albumCategory, albumId } = useParams<{
    albumCategory: string;
    albumId: string;
  }>();
  const [selectedPhoto, setSelectedPhoto] = useState<number>(-1);

  // Generate random photos (12-20 photos per album)
  const photos = useMemo(() => {
    const availablePhotos = [
      "/static/slide1.jpg",
      "/static/slide2.jpg",
      "/static/slide3.jpg",
      "/static/slide4.jpg",
      "/static/slide5.jpg",
    ];

    const photoCount = Math.floor(Math.random() * 9) + 12; // 12-20 photos
    const randomPhotos: string[] = [];

    for (let i = 0; i < photoCount; i++) {
      const randomIndex = Math.floor(Math.random() * availablePhotos.length);
      randomPhotos.push(availablePhotos[randomIndex]);
    }

    return randomPhotos;
  }, [albumId]);

  const unslugify = (slug: string): string =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const albumName = albumId ? unslugify(albumId) : "";
  const categoryInfo = albumCategory ? categoryMeta[albumCategory] : null;

  if (!categoryInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <svg
          className="w-20 h-20 mb-6 text-gray-400"
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
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Album negăsit</h2>
        <p className="mb-8 text-gray-600">
          Albumul pe care îl cauți nu există sau a fost șters.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors bg-white rounded-lg shadow-lg text-[#6F8584] hover:shadow-xl"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Înapoi la Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="relative flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center md:pt-40"
        style={{ backgroundColor: "#6F8584" }}
      >
        <div className="relative z-10">
          <p className="mb-3 text-xs tracking-widest uppercase text-white/60">
            {categoryInfo.subtitle}
          </p>
          <h1 className="mb-2 text-4xl font-light tracking-tight text-white md:text-5xl">
            {albumName}
          </h1>
          <div
            className="h-px mx-auto mt-5 w-12"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
          <p className="mt-4 text-xs tracking-widest uppercase text-white/60">
            {photos.length} {photos.length === 1 ? "Fotografie" : "Fotografii"}
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="container px-4 py-12 mx-auto md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(i)}
              className="cursor-pointer group"
              data-aos="zoom-in"
              data-aos-delay={`${Math.min(i * 50, 600)}`}
            >
              <Tilt
                tiltAxis="y"
                glareEnable={true}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1200}
                transitionSpeed={1500}
                scale={1.03}
                gyroscope={true}
                className="relative overflow-hidden shadow-lg aspect-[3/4] rounded-xl group-hover:shadow-2xl transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={photo}
                  alt={`${albumName} - Photo ${i + 1}`}
                  className="absolute inset-0 object-cover w-full h-full"
                />

                {/* Overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

                {/* View icon */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
                  <div className="p-4 shadow-xl bg-white/90 backdrop-blur-sm rounded-full">
                    <svg
                      className="w-8 h-8 text-gray-800"
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

                {/* Photo number */}
                <div className="absolute px-2 py-1 text-xs font-semibold text-white rounded-full top-3 right-3 bg-black/50 backdrop-blur-sm">
                  {i + 1}
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={selectedPhoto !== -1}
        index={selectedPhoto}
        close={() => setSelectedPhoto(-1)}
        slides={photos.map((p) => ({
          src: p,
        }))}
      />

      {/* Footer CTA */}
      <div className="py-16 text-center bg-gray-50">
        <h3 className="mb-4 text-2xl font-light text-[#6F8584]">
          Vă place ceea ce vedeți?
        </h3>
        <p className="max-w-xl mx-auto mb-8 text-gray-600">
          Contactați-ne pentru a discuta despre pachetele noastre personalizate
          și pentru a rezerva data evenimentului vostru special.
        </p>
        <Link
          to="/contact"
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
        </Link>
      </div>
    </div>
  );
};

export default AlbumDisplay;
