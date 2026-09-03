import { CommitDetails } from "@/types/repo";

type DetailsProps = {
  commitDetails: CommitDetails;
};

const Details = ({ commitDetails }: DetailsProps) => {
  return (
    <div role="region" aria-label="Commit details">
      <dl className="space-y-3">
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <dt>Author</dt>
          <dd>{commitDetails.author}</dd>

          <dt>Date</dt>
          <dd>
            <time dateTime={commitDetails.date}>{commitDetails.date}</time>
          </dd>

          <dt>SHA</dt>
          <dd>{commitDetails.sha.slice(0, 7)}</dd>
          <dt>Message</dt>
          <dd>{commitDetails.message}</dd>
        </div>
      </dl>
    </div>
  );
};

export default Details;
