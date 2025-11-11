export default function SkeletonCard() {
  return (
    <article className="food-card px-0 bg-white">
      <div className="mb-3 aspect-video w-full h-[260px] overflow-hidden rounded-lg bg-zinc-100 food-skeleton" />
      <div className="h-8 w-1/2 food-skeleton rounded" />
      <div className="mt-3 flex items-center gap-3">
        <div className="restaurant-logo h-8 w-8 rounded-full food-skeleton" />
        <div className="min-w-0 flex-1">
          <div className="h-3 w-2/3 food-skeleton rounded" />
          <div className="mt-2 h-3 w-1/3 food-skeleton rounded" />
        </div>
      </div>
    </article>
  );
}


