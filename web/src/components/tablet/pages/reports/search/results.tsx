import { Skeleton } from '@/components/ui/skeleton';
import useReportSearchStore from './store';
import { Icons } from '@/components/icons';
import { cn, Time } from '@/lib/utils';
import { usePermissions } from '@/store';
import useReportStore from '../report/store';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const SearchResults: React.FC = () => {
  const { results, searching, loading, loadReport } = useReportSearchStore();
  const id = useReportStore((state) => state.report.id);
  const permitted = usePermissions();

  return (
    <div className='flex flex-col h-full'>
      {searching ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='p-2 h-28 rounded-md border flex gap-2 hover:bg-neutral-700/10'>
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
            <List height={height} itemCount={results.length} itemSize={106} width={width}>
              {({ index, style }) => {
                const result = results[index];
                const isLoading = result.id === loading;
                const cantView = result.locked && !permitted('reports.lock');

                return (
                  <div
                    key={index}
                    // @ts-ignore
                    style={{ ...style, height: style.height - 5 }}
                    className={cn(
                      'p-2 border text-sm capitalize relative flex gap-2 rounded-md hover:bg-neutral-700/10 select-none',
                      id === result.id && 'bg-neutral-700/10',
                    )}
                    {...(loading || cantView ? {} : { onClick: () => loadReport(result.id!) })}
                  >
                    {isLoading ||
                      (cantView && (
                        <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
                          {isLoading ? (
                            <Icons.loading className='w-6 h-6 animate-spin' />
                          ) : (
                            <Icons.lock className='w-6 h-6 text-red-400' />
                          )}
                        </div>
                      ))}

                    <div className='p-2 text-sm shadow-xl w-full text-neutral-400'>
                      <div className='flex justify-between items-center text-sm'>
                        <div className='flex font-semibold uppercase gap-2'>
                          {result.locked && <Icons.lock className='w-4 h-4 cursor-pointer text-red-400' />}
                          {result.callsign} - {result.firstname} {result.lastname}
                        </div>
                        <span className='flex items-center'>#{result.id}</span>
                      </div>
                      <h2 className='text-lg font-semibold text-neutral-200 truncate'>{result.title}</h2>
                      <div className='flex justify-between items-center mt-1'>
                        <div className='block'>Published {Time(result.createdAt!)}</div>
                        <span className='flex items-center'>{result.type}</span>
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
