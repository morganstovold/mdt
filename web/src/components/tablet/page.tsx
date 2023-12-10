import React from 'react';
<<<<<<< HEAD

import { ErrorBoundary } from 'react-error-boundary';

import { pages } from './pages';
import { Route, Routes, useLocation } from 'react-router-dom';
import { usePermissions } from '@/store';

const FallbackComponent = () => {
  const page = useLocation().pathname.split('/')[1];
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-2xl font-bold text-red-400 mb-0'>Failed to load {page.replace('_', ' ')}</h1>
      <p className='text-xl text-red-200/60'>Something went wrong</p>
=======
import { ErrorBoundary } from 'react-error-boundary';
import { pages } from './pages';
import { Route, Routes, useLocation } from 'react-router-dom';
import { usePermissions } from '@/store';
import { Icons } from '../icons';
import { useI18nContext } from '@/i18n/i18n-react';

const FallbackComponent = () => {
  const { LL } = useI18nContext();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-2xl font-bold text-red-400 mb-0'>
        {LL.page.fallback.title()}
      </h1>
      <p className='text-xl text-red-200/60'>{LL.page.fallback.description()}</p>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    </div>
  );
};

const NoPermissionComponent = () => {
<<<<<<< HEAD
  const page = useLocation().pathname.split('/')[1];
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-2xl font-bold text-red-400 mb-0'>Unable to load {page.replace('_', ' ')}</h1>
      <p className='text-xl text-red-200/60'>You dont have permission to view this page</p>
=======
  const { LL } = useI18nContext();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-2xl font-bold text-red-400 mb-0'>{LL.page.nopermission.title()}</h1>
      <p className='text-xl text-red-200/60'>{LL.page.nopermission.description()}</p>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    </div>
  );
};

<<<<<<< HEAD
// const LoadingComponent = () => {
//   const page = useLocation().pathname.split('/')[1];
//   return (
//     <div className='flex flex-col items-center justify-center w-full h-full p-10'>
//       <Triangle height='80' width='80' color='hsl(358, 100%, 69.5%)' visible={true} />
//       <h1 className='text-2xl font-bold text-red-400 mb-0'>
//         Loading {page.replace('_', ' ').toUpperCase()}
//       </h1>
//       <p className='text-xl text-red-200/60'>Please wait</p>
//     </div>
//   );
// };
=======
const LoadingComponent = () => {
  const { LL } = useI18nContext();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10 text-neutral-200/80'>
      <Icons.loading className='w-10 h-10 animate-spin' />
      <h1 className='text-2xl font-bold mb-0'>{LL.utils.loading()}</h1>
    </div>
  );
};
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const Page: React.FC = () => {
  const permitted = usePermissions();
  const location = useLocation();

  return (
    <div className='w-full h-full overflow-hidden pl-5 pt-5'>
      <ErrorBoundary FallbackComponent={FallbackComponent} resetKeys={[location]}>
<<<<<<< HEAD
        <React.Suspense
        // fallback={<LoadingComponent />}
        >
=======
        <React.Suspense fallback={<LoadingComponent />}>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
          <Routes>
            {pages.map((page, index) => {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    permitted(`${page.name}.view`) || page.name === 'settings' ? (
                      <page.component />
                    ) : (
                      <NoPermissionComponent />
                    )
                  }
                />
              );
            })}
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Page;
