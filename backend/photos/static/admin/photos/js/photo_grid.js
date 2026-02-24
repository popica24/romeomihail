/**
 * Photo Grid – Album admin
 * Drag-and-drop reorder, multi-upload, delete, feature toggle, lightbox.
 */
(function () {
  "use strict";

  if (!window.PHOTO_GRID_CONFIG) return;

  const CFG  = window.PHOTO_GRID_CONFIG;
  const CSRF = CFG.csrfToken;

  // ── State ──────────────────────────────────────────────────────────────────
  let photos = CFG.photos.slice();
  let lightboxPhotoId = null;

  // ── DOM ────────────────────────────────────────────────────────────────────
  const grid         = document.getElementById("photoGrid");
  const emptyState   = document.getElementById("photoGridEmpty");
  const countPill    = document.getElementById("photoCount");
  const dropZone     = document.getElementById("dropZone");
  const fileInput    = document.getElementById("photoUploadInput");
  const progressBar  = document.getElementById("uploadProgressBar");
  const progressFill = document.getElementById("uploadProgressFill");
  const progressLbl  = document.getElementById("uploadProgressLabel");
  const lightbox     = document.getElementById("photoLightbox");
  const lbImg        = document.getElementById("lightboxImg");
  const lbCaption    = document.getElementById("lightboxCaption");
  const lbSave       = document.getElementById("lightboxSave");
  const lbClose      = document.getElementById("lightboxClose");
  const lbBackdrop   = document.getElementById("lightboxBackdrop");

  // ── Render ─────────────────────────────────────────────────────────────────
  function renderGrid() {
    grid.innerHTML = "";
    countPill.textContent = photos.length;

    if (photos.length === 0) {
      emptyState.style.display = "";
      return;
    }
    emptyState.style.display = "none";

    photos.forEach((photo, idx) => {
      const card = document.createElement("div");
      card.className = "photo-card" + (photo.is_featured ? " is-featured" : "");
      card.dataset.id = photo.id;

      card.innerHTML = `
        <img src="${photo.url}" alt="${esc(photo.caption || "")}" loading="lazy" />
        <div class="photo-order-badge">${idx + 1}</div>
        <div class="photo-card-actions">
          <button class="photo-card-btn feature-btn${photo.is_featured ? " active" : ""}"
            title="Featured" data-action="feature">
            <i class="fa-solid fa-star"></i>
          </button>
          <button class="photo-card-btn" title="Editează" data-action="edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="photo-card-btn delete-btn" title="Șterge" data-action="delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`;

      card.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const a = btn.dataset.action;
          if (a === "delete")  confirmDelete(photo.id);
          if (a === "feature") toggleFeature(photo, card, btn);
          if (a === "edit")    openLightbox(photo);
        });
      });

      card.querySelector("img").addEventListener("click", () => openLightbox(photo));
      grid.appendChild(card);
    });

    initSortable();
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  // ── Sortable ───────────────────────────────────────────────────────────────
  function initSortable() {
    if (grid._sortable) grid._sortable.destroy();
    grid._sortable = Sortable.create(grid, {
      animation: 180,
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      onEnd() {
        const cards = grid.querySelectorAll(".photo-card");
        const order = [];
        cards.forEach((card, idx) => {
          const id = parseInt(card.dataset.id, 10);
          order.push({ id, order: idx + 1 });
          card.querySelector(".photo-order-badge").textContent = idx + 1;
          const p = photos.find((x) => x.id === id);
          if (p) p.order = idx + 1;
        });
        post(CFG.reorderUrl, { order }).catch(console.error);
      },
    });
  }

  // ── Upload ─────────────────────────────────────────────────────────────────
  fileInput.addEventListener("change", () => handleFiles(fileInput.files));

  dropZone.addEventListener("click", () => fileInput.click());

  document.addEventListener("dragover",  (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });
  document.addEventListener("dragleave", (e) => {
    if (!e.relatedTarget) dropZone.classList.remove("drag-over");
  });
  document.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  });

  async function handleFiles(fileList) {
    const files = Array.from(fileList).filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );
    if (!files.length) return;

    progressBar.style.display = "";
    setProgress(0, `Se încarcă 0 / ${files.length}…`);

    const BATCH = 5;
    let done = 0;

    for (let i = 0; i < files.length; i += BATCH) {
      const batch = files.slice(i, i + BATCH);
      const fd = new FormData();
      batch.forEach((f) => fd.append("images", f));

      try {
        const res = await fetch(CFG.uploadUrl, {
          method: "POST",
          headers: { "X-CSRFToken": CSRF },
          body: fd,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.uploaded) data.uploaded.forEach((p) => photos.push(p));
      } catch (err) {
        console.error("Upload error:", err);
        alert("Eroare la încărcare: " + err.message);
      }

      done += batch.length;
      setProgress((done / files.length) * 100, `Se încarcă ${done} / ${files.length}…`);
    }

    setProgress(100, "Gata! ✓");
    renderGrid();
    setTimeout(() => { progressBar.style.display = "none"; }, 1400);
    fileInput.value = "";
  }

  function setProgress(pct, label) {
    progressFill.style.width = pct + "%";
    progressLbl.textContent = label;
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  function confirmDelete(id) {
    if (!confirm("Sigur vrei să ștergi această fotografie? Acțiunea este ireversibilă.")) return;
    post(`/admin/photos/album/photos/${id}/delete/`, {})
      .then(() => {
        photos = photos.filter((p) => p.id !== id);
        renderGrid();
      })
      .catch((err) => { console.error(err); alert("Eroare la ștergere."); });
  }

  // ── Feature ────────────────────────────────────────────────────────────────
  function toggleFeature(photo, card, btn) {
    post(`/admin/photos/album/photos/${photo.id}/feature/`, {})
      .then((data) => {
        photo.is_featured = data.is_featured;
        card.classList.toggle("is-featured", data.is_featured);
        btn.classList.toggle("active", data.is_featured);
      })
      .catch(console.error);
  }

  // ── Lightbox ───────────────────────────────────────────────────────────────
  function openLightbox(photo) {
    lightboxPhotoId = photo.id;
    lbImg.src = photo.url;
    lbCaption.value = photo.caption || "";
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => lbCaption.focus(), 50);
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
    lightboxPhotoId = null;
  }

  lbClose.addEventListener("click", closeLightbox);
  lbBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display !== "none") closeLightbox();
  });

  lbSave.addEventListener("click", () => {
    if (!lightboxPhotoId) return;
    const caption = lbCaption.value.trim();
    const photo = photos.find((p) => p.id === lightboxPhotoId);
    if (photo) photo.caption = caption;
    const orig = lbSave.innerHTML;
    lbSave.innerHTML = '<i class="fa-solid fa-check"></i> Salvat!';
    lbSave.disabled = true;
    setTimeout(() => { lbSave.innerHTML = orig; lbSave.disabled = false; }, 1500);
  });

  // ── Fetch helper ───────────────────────────────────────────────────────────
  function post(url, body) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRFToken": CSRF },
      body: JSON.stringify(body),
    }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  renderGrid();

})();