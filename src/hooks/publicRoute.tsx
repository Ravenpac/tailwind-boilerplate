'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import Loading from '@/components/Loading/Loading';

const publicRoute = (Component: React.FC) => {
  return (props: any) => {
    const router = useRouter();

    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        router.push('/home');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <Loading />;
    }

    if (isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default publicRoute;
