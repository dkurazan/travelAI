import { metadata } from "./layout";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl text-primary font-bold">{metadata.title}</h1>
          <p className="py-6 text-lg leading-loose">{metadata.description}</p>
          <Link href='/chat' className='btn btn-secondary'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
