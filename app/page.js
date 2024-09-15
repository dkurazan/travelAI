import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl text-primary font-bold">TravelAI</h1>
          <p className="py-6 text-lg leading-loose">Your AI language companion. Powered by OpenAI, it enhances your travelling, conversations, and more</p>
          <Link href='/chat' className='btn btn-secondary '>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
