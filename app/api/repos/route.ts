import { getRepositories } from "@/lib/github";

export async function GET() {
  try {
    const repositories = await getRepositories();

    return Response.json(repositories);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}