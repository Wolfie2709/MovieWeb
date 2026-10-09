import { getMovieCredits } from "@/lib/getMovies";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const credits = await getMovieCredits(id);

    if (!credits) {
      return Response.json({ error: "Credits not found" }, { status: 404 });
    }

    return Response.json(credits);
  } catch (error) {
    console.error("Movie credits API failed:", error);
    return Response.json({ error: "Failed to load movie credits" }, { status: 500 });
  }
}