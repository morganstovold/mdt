import { Separator } from '@/components/ui/separator';
import Officer from './officer';
import RosterSearch from './search';
import useOfficerSearchStore from './search/store';
import HireOfficer from './HireOfficer';

const Roster: React.FC = () => {
  const loadOfficer = useOfficerSearchStore((state) => state.loadOfficer);

  return (
    <div
      className='grid h-full overflow-hidden'
      style={{ gridTemplateRows: '100%', gridTemplateColumns: '25% auto 1fr' }}
    >
      <div className='flex flex-col gap-2'>
        <HireOfficer />
        <RosterSearch func={loadOfficer} />
      </div>
      <Separator className='mx-2' orientation='vertical' />
      <Officer />
    </div>
  );
};

export default Roster;
