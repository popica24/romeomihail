export const isAlbumNew = (
  createdAt: string,
  daysThreshold: number = 30
): boolean => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysThreshold;
};