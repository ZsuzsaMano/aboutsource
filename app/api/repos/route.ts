import { getRepositories } from "@/lib/getRepositories";
import { RequestError } from "@octokit/request-error";

export async function GET() {
  try {
    const repositories = await getRepositories();
    return Response.json(repositories);
  } catch (error) {
    console.error(error);

    if (error instanceof RequestError) {
      return Response.json(
        {
          error: error.message,
          status: error.status || 500,
          detail:
            (error.response?.data as { message?: string })?.message ||
            "Unexpected error",
          rateLimitRemaining:
            error.response?.headers?.["x-ratelimit-remaining"],
        },
        { status: error.status || 500 },
      );
    }

    return Response.json({ error: "Unknown error" }, { status: 500 });
  }
}
