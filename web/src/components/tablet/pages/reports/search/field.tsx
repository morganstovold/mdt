import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sanitizeString } from '@/lib/utils';
import { Icons } from '@/components/icons';
import useReportSearchStore from './store';

const SearchField: React.FC = () => {
  const { value, searching, setValue, search, recent } = useReportSearchStore((state) => ({
    value: state.value,
    searching: state.searching,
    setValue: state.setValue,
    search: state.search,
    recent: state.recent,
  }));

  return (
    <div className='flex gap-2'>
      <Input
        readOnly={searching}
        value={value}
        onChange={(e) => setValue(sanitizeString(e.target.value))}
        placeholder='Search Reports (id, names, title)'
        className='w-full'
      />
      <Button variant='outline' disabled={searching} onClick={search} className='w-24'>
        {searching && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
        Search
      </Button>
      <Button variant='outline' disabled={searching} onClick={recent} size='icon'>
<<<<<<< HEAD
        {searching && <Icons.loading className='h-4 w-4 animate-spin' />}
        <Icons.folderSync className='h-4 w-4' />
=======
        {searching ? <Icons.loading className='h-4 w-4 animate-spin' /> : <Icons.folderSync className='h-4 w-4' />}
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      </Button>
    </div>
  );
};

export default SearchField;
