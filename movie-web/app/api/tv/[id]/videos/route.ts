import { getTVVideos } from "@/lib/getTVSeries";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const videos = await getTVVideos(id);
    return Response.json({ results: videos });
  } catch (error) {
    console.error("TV videos API failed:", error);
    return Response.json({ error: "Failed to load TV videos" }, { status: 500 });
  }
}
