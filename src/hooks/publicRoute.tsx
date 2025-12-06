'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

const publicRoute = (Component: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (isAuthenticated) {
        router.push('/');
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default publicRoute;
