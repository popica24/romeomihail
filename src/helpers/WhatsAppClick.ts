export const handleWhatsAppClick = () => {
  const phoneNumber = "40720570036";
  const message = encodeURIComponent(
    "Bună ziua! Sunt interesant de serviciile dumneavoastră de fotografie.",
  );
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};
