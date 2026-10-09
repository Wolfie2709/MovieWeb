import { getSimilarMovies } from "@/lib/getMovies";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const similar = await getSimilarMovies(id);

    if (!similar) {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }

    return Response.json(similar);
  } catch (error) {
    console.error("Movie similar API failed:", error);
    return Response.json({ error: "Failed to load similar movies" }, { status: 500 });
  }
}