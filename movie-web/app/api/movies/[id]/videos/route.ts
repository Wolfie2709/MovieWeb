import { getMovieVideos } from "@/lib/getMovies";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const videos = await getMovieVideos(id);
    return Response.json({ results: videos });
  } catch (error) {
    console.error("Movie videos API failed:", error);
    return Response.json({ error: "Failed to load movie videos" }, { status: 500 });
  }
}
