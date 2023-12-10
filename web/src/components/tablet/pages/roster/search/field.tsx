import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sanitizeString } from '@/lib/utils';
import { Icons } from '@/components/icons';
import useOfficerSearchStore from './store';

const SearchField: React.FC = () => {
  const { value, searching, setValue, search } = useOfficerSearchStore();

  return (
    <div className='flex'>
      <Input
        readOnly={searching}
        value={value}
        onChange={(e) => setValue(sanitizeString(e.target.value))}
        placeholder='Search Roster (id, name, callsign)'
        className='w-full'
      />
      <Button variant='outline' disabled={searching} onClick={search} className='ml-2 w-24'>
        {searching && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
        Search
      </Button>
    </div>
  );
};

export default SearchField;
