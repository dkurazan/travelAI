import Link from "next/link";

export default function TourCard({ tour }) {
  const { city, title, id, country } = tour;

  return (
    <Link
      href={`/tours/${tour["_id"]}`}
      className="card card-compact rounded-xl bg-base-100"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center">
          {city}, {country}
        </h2>
      </div>
    </Link>
  );
}