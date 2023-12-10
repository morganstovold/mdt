import { Separator } from '@/components/ui/separator';
import SearchField from './field';
import SearchResults from './results';

const ProfilesSearch: React.FC<{func: Function; remove?: Function; checked?: any[]; jobCheck?: boolean}> = ({func, remove, checked, jobCheck}) => {
  return (
    <div className="w-full grid min-h-max" style={{ gridTemplateRows: 'auto auto 1fr auto' }}>
      <SearchField />
      <Separator className="my-2" />
      <SearchResults func={func} remove={remove} checked={checked} {...(jobCheck && {jobCheck: jobCheck})} />
    </div>
  );
};

export default ProfilesSearch;
