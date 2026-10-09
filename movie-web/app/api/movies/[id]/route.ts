import { getMovieDetails } from "@/lib/getMovies";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const details = await getMovieDetails(id);

    if (!details) {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }

    return Response.json(details);
  } catch (error) {
    console.error("Movie details API failed:", error);
    return Response.json({ error: "Failed to load movie details" }, { status: 500 });
  }
}