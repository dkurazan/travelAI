import { fetchUserTokensById } from '@/utils/actions';
import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const { userId } = await auth();
  const currentTokens = await fetchUserTokensById(userId);

  return (
    <div>
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>
        Token Amount : {currentTokens}
      </h2>
      <div className='flex justify-center items-center h-full'>
        <UserProfile routing='hash' className='mx-auto' />
      </div>
    </div>
  );
}