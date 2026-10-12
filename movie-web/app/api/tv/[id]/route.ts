import { getTVSeriesDetails } from "@/lib/getTVSeries";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const details = await getTVSeriesDetails(id);

    if (!details) {
      return Response.json({ error: "Series not found" }, { status: 404 });
    }

    return Response.json(details);
  } catch (error) {
    console.error("TV Series details API failed:", error);
    return Response.json({ error: "Failed to load series details" }, { status: 500 });
  }
}