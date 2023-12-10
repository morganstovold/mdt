import { Separator } from '@/components/ui/separator';
import SearchField from './field';
import SearchResults from './results';

const OfficerSearch: React.FC<{ func: Function; remove?: Function; checked?: any[] }> = ({ func, remove, checked }) => {
  return (
    <div className='w-full gap-2 grid h-full' style={{ gridTemplateRows: 'auto auto 1fr' }}>
      <SearchField />
      <Separator />
      <SearchResults func={func} remove={remove} checked={checked} />
    </div>
  );
};

export default OfficerSearch;
