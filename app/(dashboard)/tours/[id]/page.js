import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { getSingleTour } from '@/utils/actions';
import TourInfo from '@/components/TourInfo';

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

export default async function SingleTourPage({ params }) {
  const tour = await getSingleTour(params.id);

  const { data } = await axios(`${url}${tour.city}-picturesque`);
  const tourImage = data?.results[0]?.urls?.raw;
  const tourImageAlt = data?.results[0].alt_description

  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        back to tours
      </Link>

      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
            alt={tourImageAlt}
            priority
          />
        </div>
      ) : null}

      <TourInfo tour={tour} />
    </div>
  );
}