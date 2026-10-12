import { getTVSeriesCredits } from "@/lib/getTVSeries";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const credits = await getTVSeriesCredits(id);

    if (!credits) {
      return Response.json({ error: "Credits not found" }, { status: 404 });
    }

    return Response.json(credits);
  } catch (error) {
    console.error("TV series credits API failed:", error);
    return Response.json({ error: "Failed to load series credits" }, { status: 500 });
  }
}