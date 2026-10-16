type Props = { mode?: "grid" | "carousel" };

const TvCardSkeleton = ({ mode = "grid" }: Props) => {
  const containerClass =
    mode === "grid" ? "w-full" : "shrink-0 w-[220px] sm:w-[220px] xl:w-[230px]";

  return (
    <div className={containerClass} aria-hidden="true">
      <div className="mr-2 animate-pulse">
        <div className="h-72 w-full rounded-3xl bg-white/10 2xl:h-80" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-11/12 rounded bg-white/10 md:h-5" />
          <div className="h-4 w-2/3 rounded bg-white/10 md:h-5" />
        </div>
      </div>
    </div>
  );
};

export default TvCardSkeleton;