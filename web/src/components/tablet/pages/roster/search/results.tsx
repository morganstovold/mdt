import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useOfficerSearchStore from './store';
import { Icons } from '@/components/icons';
import useOfficerStore, { Officer } from '../officer/store';
import { cn } from '@/lib/utils';
import { rankString } from '@/store';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
<<<<<<< HEAD
=======
import PImage from '@/components/tablet/Image';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const SearchResults: React.FC<{ func: Function; remove?: Function; checked?: Officer[] }> = ({
  func,
  remove,
  checked,
}) => {
  const { results, searching, loading } = useOfficerSearchStore();
  const citizenid = useOfficerStore((store) => store.officer.citizenid);

  return (
    <div className='flex flex-col h-full'>
      {searching ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='p-2 border flex gap-2 rounded-md hover:bg-neutral-700/10'>
            <Skeleton className='w-20 h-20 rounded-sm border aspect-square' />
            <Separator orientation='vertical' />
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
            <List height={height} itemCount={results.length} itemSize={103} width={width}>
              {({ index, style }) => {
                const result = results[index];
                const isChecked = checked?.find((officer) => officer.citizenid === result.citizenid);

                return (
                  <div
                    key={index}
                    // @ts-ignore
                    style={{ ...style, height: style.height - 5 }}
                    className={cn(
                      'p-2 border text-sm capitalize relative flex gap-2 rounded-md hover:bg-neutral-700/10 select-none',
                      citizenid === result.citizenid && 'bg-neutral-700/10',
                    )}
                    {...(loading
                      ? {}
                      : {
                          onClick: () =>
                            remove ? (isChecked ? remove(result.citizenid) : func(result)) : func(result),
                        })}
                  >
                    {loading === result.citizenid ||
                      (checked && isChecked && (
                        <div className='absolute inset-0 flex items-center justify-center bg-background/70'>
                          {isChecked ? (
                            <Icons.check className='w-6 h-6' />
                          ) : (
                            <Icons.loading className='w-6 h-6 animate-spin' />
                          )}
                        </div>
                      ))}
<<<<<<< HEAD

                    <img
                      src={result.pfp}
                      className='w-20 h-20 border rounded-sm aspect-square object-cover object-center'
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
                      }}
                    />
=======
                    <div className="h-20 aspect-square">
                      <PImage src={result.pfp!} />
                    </div>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                    <Separator orientation='vertical' />
                    <div className='flex flex-col justify-between w-full text-neutral-400'>
                      <div className='flex justify-between items-center gap-2'>
                        <div className='text-base text-neutral-200'>
                          {result.firstname} {result.lastname}
                        </div>
                        <div>{result.citizenid}</div>
                      </div>
                      <div className='flex justify-between gap-2 uppercase'>
                        <div>{result.callsign}</div>
                        <div>
                          {result.department} {rankString(result.department, result.rank)}
                        </div>
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
