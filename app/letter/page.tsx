'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LetterPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/under-construction');
  }, [router]);

  return null;
};

export default LetterPage;
