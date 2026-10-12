import { getSimilarTVSeries } from "@/lib/getTVSeries";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const similar = await getSimilarTVSeries(id);

    if (!similar) {
      return Response.json({ error: "Series not found" }, { status: 404 });
    }

    return Response.json(similar);
  } catch (error) {
    console.error("Series similar API failed:", error);
    return Response.json({ error: "Failed to load similar series" }, { status: 500 });
  }
}