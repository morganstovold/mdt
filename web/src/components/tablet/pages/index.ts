import React from 'react';
import { Icons } from '@/components/icons';

export const pages: {
  name: string;
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  icon: React.FC;
}[] = [
  {
    name: 'profiles',
    path: '/',
    component: React.lazy(() => import('./profiles')),
    icon: Icons.users,
  },
  {
    name: 'reports',
    path: '/reports',
    component: React.lazy(() => import('./reports')),
    icon: Icons.reports,
  },
  {
    name: 'vehicles',
    path: '/vehicles',
    component: React.lazy(() => import('./vehicles')),
    icon: Icons.vehicles,
  },
  {
    name: 'legislation',
    path: '/legislation',
    component: React.lazy(() => import('./legislation')),
    icon: Icons.legislation,
  },
  {
    name: 'roster',
    path: '/roster',
    component: React.lazy(() => import('./roster')),
    icon: Icons.roster,
  },
];
