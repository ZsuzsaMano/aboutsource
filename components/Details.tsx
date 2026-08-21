import { CommitDetails } from "@/types/repo";

type DetailsProps = {
  commitDetails: CommitDetails;
};

const Details = ({ commitDetails }: DetailsProps) => {
  return (
    <div role="region" aria-label="Commit details">
      <dl className="space-y-3">
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <dt className="font-medium text-gray-900 text-sm">Author</dt>
          <dd className="text-sm text-muted-foreground">
            {commitDetails.author}
          </dd>

          <dt className="font-medium text-gray-900 text-sm">Date</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={commitDetails.date}>{commitDetails.date}</time>
          </dd>

          <dt className="font-medium text-gray-900 text-sm">SHA</dt>
          <dd className="text-sm text-muted-foreground">
            {commitDetails.sha.slice(0, 7)}
          </dd>
          <dt className="font-medium text-gray-900 text-sm">Message</dt>
          <dd className="text-sm text-muted-foreground">
            {commitDetails.message}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Details;
