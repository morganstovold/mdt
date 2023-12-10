import { Separator } from '@/components/ui/separator';
import Profile from './profile';
import ProfilesSearch from './search';
import useProfileSearchStore from './search/store';

const Profiles: React.FC = () => {
  const loadProfile = useProfileSearchStore((state) => state.loadProfile);

  return (
    <div
      className='grid h-full overflow-hidden'
      style={{ gridTemplateRows: '1fr', gridTemplateColumns: '25% auto 1fr' }}
    >
      <ProfilesSearch func={loadProfile} />
      <Separator className='mx-2' orientation='vertical' />
      <Profile />
    </div>
  );
};

export default Profiles;
