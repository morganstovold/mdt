import { useNuiEvent } from '@/lib/event';
import useTabletStore from './handler';
import Header from './header';
import Page from './page';
import TabletProviders from './providers';
import Sidebar from './Sidebar';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import fetchNui from '@/lib/fetchNui';
import useGlobalStore from '@/store';
import { Icons } from '../icons';
import { Button } from '@/components/ui/button';

const Visibility: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { transparent, open, setOpen } = useTabletStore((state) => ({
    transparent: state.transparent,
    setTransparent: state.setTransparent,
    open: state.open,
    setOpen: state.setOpen,
  }));

<<<<<<< HEAD
  const { loaded, loading, load } = useGlobalStore((state) => ({
    loaded: state.loaded,
    loading: state.loading,
    load: state.load,
  }));

  useNuiEvent('core:load', () => {
    load();
  });

  useEffect(() => {
    load();
  }, []);
=======
  const { authorized, loaded, loading, load, setLoading, attemptReload } = useGlobalStore((state) => ({
    authorized: state.authorized,
    loaded: state.loaded,
    loading: state.loading,
    load: state.load,
    setLoading: state.setLoading,
    attemptReload: state.attemptReload,
  }));

  useNuiEvent('auth:load', load);
  useNuiEvent('auth:loading', () => setLoading);
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

  useNuiEvent('TABLET_DISPLAY', setOpen);
  useEffect(() => {
    const handleEscape = async (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const result = await fetchNui('CLOSE_TABLET', {}, {});
        if (result.status === 'ok') setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-screen w-screen transition-background-color ease-out duration-150',
        open ? 'opacity-100' : 'fade-out',
      )}
      style={{
        background: 'radial-gradient(rgba(0, 0, 0, 0.5) 0%, hsl(var(--background))',
      }}
    >
      <div
        className={cn(
          'relative overflow-hidden h-[76.8%] w-5/6 bg-background rounded-lg border-2 text-card-foreground shadow-sm flex flex-col p-4 underline-offset-4 transition-all ease-out duration-150',
          open ? 'transform-y-0' : 'slide-out',
          transparent ? 'opacity-20' : 'opactiy-100',
        )}
      >
<<<<<<< HEAD
        {loaded ? (
          children
        ) : (
          <div className='absolute inset-0 flex items-center justify-center w-full h-full'>
            {loading ? (
              <div className='flex flex-col gap-4 items-center'>
                <Icons.loading className='w-12 h-12 text-neutral-200 animate-spin' />
                <p className='text-xl font-bold text-neutral-200'>Setting Up MDT</p>
              </div>
            ) : (
              <div className='flex flex-col gap-4'>
                <p className='text-xl font-bold text-neutral-200'>Something Went Wrong...</p>
                <Button onClick={() => load()} variant='outline'>
                  Retry
                </Button>
              </div>
            )}
          </div>
        )}
=======
        <div className='flex flex-col justify-center w-full h-full'>
          {loading ? (
            <div className='flex flex-col gap-4 items-center'>
              <Icons.loading className='w-12 h-12 text-neutral-200 animate-spin' />
              <p className='text-xl font-bold text-neutral-200'>Setting Up MDT</p>
            </div>
          ) : loaded ? (
            authorized ? (
              children
            ) : (
              <div>
                <div className='flex flex-col gap-4 items-center'>
                  <p className='text-xl font-bold text-red-200'>Not Authorized :[</p>
                </div>
              </div>
            )
          ) : (
            <div>
              <div className='flex flex-col gap-4 items-center'>
                <p className='text-xl font-bold text-neutral-200'>Something Went Wrong...</p>
                <Button onClick={attemptReload} variant='outline'>
                  Retry
                </Button>
              </div>
            </div>
          )}
        </div>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      </div>
    </div>
  );
};

const TabletContainer: React.FC = () => {
  return (
    <Visibility>
      <TabletProviders>
        <Header />
        <Separator />
        <div className='grid h-full w-full overflow-hidden' style={{ gridTemplateColumns: 'auto auto 1fr' }}>
          <Sidebar />
          <Separator orientation='vertical' />
          <Page />
        </div>
      </TabletProviders>
    </Visibility>
  );
};

export default TabletContainer;
