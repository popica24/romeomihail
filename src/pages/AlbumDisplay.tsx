import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useAlbumQuery } from "../hooks/useAlbumQuery";

const AlbumDisplay = () => {
  const { albumCategory, albumId } = useParams<{ albumCategory: string; albumId: string }>();
  const [selectedPhoto, setSelectedPhoto] = useState<number>(-1);

  const { data: album, isLoading: albumLoading, error } = useAlbumQuery(albumId);

  if (albumLoading) {
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
          <p className="text-sm tracking-widest text-gray-500 uppercase">Se încarcă albumul...</p>
        </div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Album negăsit</h2>
        <Link to={`/albume/${albumCategory}`} className="text-[#6F8584] font-semibold">← Înapoi</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center md:pt-40" style={{ backgroundColor: "#6F8584" }}>
        <div className="relative z-10">
          <p className="mb-3 text-xs tracking-widest uppercase text-white/60">{album.category_name}</p>
          <h1 className="mb-2 text-4xl font-light tracking-tight text-white md:text-5xl">{album.name}</h1>
          {album.location && (
            <p className="mt-2 text-sm text-white/60">
              <i className="mr-1 fa-solid fa-location-dot" />
              {album.location}
            </p>
          )}
          <div className="h-px mx-auto mt-5 w-12" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} />
          <p className="mt-4 text-xs tracking-widest uppercase text-white/60">
            {album.photos.length} {album.photos.length === 1 ? "Fotografie" : "Fotografii"}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container px-4 py-12 mx-auto md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {album.photos.map((photo, i) => (
            <div key={photo.id} onClick={() => setSelectedPhoto(i)} className="cursor-pointer group" data-aos="zoom-in" data-aos-delay={`${Math.min(i * 50, 600)}`}>
              <Tilt
                tiltAxis="y"
                glareEnable={true}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1200}
                transitionSpeed={1500}
                scale={1.03}
                gyroscope={true}
                className="relative overflow-hidden shadow-lg aspect-3/4 rounded-xl group-hover:shadow-2xl transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img src={photo.image_url} alt={photo.alt_text || `${album.name} - Photo ${i + 1}`} className="absolute inset-0 object-cover w-full h-full" loading="lazy" />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
                  <div className="p-4 shadow-xl bg-white/90 backdrop-blur-sm rounded-full">
                    <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute px-2 py-1 text-xs font-semibold text-white rounded-full top-3 right-3 bg-black/50 backdrop-blur-sm">{i + 1}</div>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-xs text-center text-white">{photo.caption}</p>
                  </div>
                )}
              </Tilt>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center bg-gray-50">
        <h3 className="mb-4 text-2xl font-light text-[#6F8584]">Vă place ceea ce vedeți?</h3>
        <p className="max-w-xl mx-auto mb-8 text-gray-600">Contactați-ne pentru a discuta despre pachetele noastre personalizate.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all bg-[#6F8584] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
          Contactează-ne
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={selectedPhoto !== -1}
        index={selectedPhoto}
        close={() => setSelectedPhoto(-1)}
        slides={album.photos.map((p) => ({
          src: p.image_url,
          alt: p.alt_text,
        }))}
      />
    </div>
  );
};

export default AlbumDisplay;