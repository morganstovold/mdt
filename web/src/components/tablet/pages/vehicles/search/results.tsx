import { Skeleton } from '@/components/ui/skeleton';
import useVehicleSearchStore from './store';
import { Icons } from '@/components/icons';
import useVehicleStore from '../vehicle/store';
import { cn } from '@/lib/utils';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const SearchResults: React.FC = () => {
  const { results, searching, loading, loadVehicle } = useVehicleSearchStore();
  const id = useVehicleStore((store) => store.vehicle.id);

  return (
    <div className='flex flex-col h-full'>
      {searching ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='p-2 h-16 border flex gap-2 rounded-md hover:bg-neutral-700/10'>
            <div className='flex flex-col gap-2 justify-between w-full text-neutral-400'>
              <div className='flex justify-between gap-2 h-full'>
                <div className='text-base w-full text-neutral-200'>
                  <Skeleton className='w-full h-full' />
                </div>
                <div className='w-full'>
                  <Skeleton className='w-full h-full' />
                </div>
              </div>
              <div className='flex justify-between gap-2 h-full'>
                <div className='w-full'>
                  <Skeleton className='w-full h-full' />
                </div>
                <div className='w-full'>
                  <Skeleton className='w-full h-full' />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : results.length > 0 ? (
        <AutoSizer>
          {({ height, width }) => (
            <List height={height} itemCount={results.length} itemSize={67} width={width}>
              {({ index, style }) => {
                const result = results[index];
                return (
                  <div
                    key={index}
                    // @ts-ignore
                    style={{ ...style, height: style.height - 5 }}
                    className={cn(
                      'p-2 border text-sm capitalize relative flex gap-2 rounded-md hover:bg-neutral-700/10 select-none',
                      id === result.id && 'bg-neutral-700/10',
                    )}
                    {...(loading ? {} : { onClick: () => loadVehicle(result.id!) })}
                  >
                    {loading === result.id && (
                      <div className='absolute inset-0 flex items-center justify-center bg-background/70'>
                        <Icons.loading className='w-6 h-6 animate-spin' />
                      </div>
                    )}
                    <div className='flex flex-col justify-between w-full text-neutral-400'>
                      <div className='flex justify-between items-center gap-2'>
                        <div className='text-base text-neutral-200'>{result.model}</div>
                        <div>{result.plate}</div>
                      </div>
                      <div>
                        {result?.firstname} {result?.lastname}
                      </div>
                    </div>
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center font-medium'>No Results :[</div>
      )}
    </div>
  );
};

export default SearchResults;
