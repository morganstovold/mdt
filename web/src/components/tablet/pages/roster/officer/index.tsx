import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';
import useOfficerStore from './store';
import OfficerDetails from './OfficerDetails';
import OfficerDepartment from './OfficerDepartment';
import OfficerReports from './OfficerReports';
import OfficerChecklist from './OfficerChecklist';
import OfficerHiredBy from './OfficerHiredBy';

const Profile: React.FC = () => {
  const { value, setValue } = useOfficerStore((state) => ({ value: state.value, setValue: state.setValue }));

  return (
    <div className='grid gap-2 w-full h-full' style={{ gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: '100%' }}>
      <OfficerDetails />
      <Separator orientation='vertical' />
      <Accordion value={value} onValueChange={setValue} type='multiple' className='overflow-y-auto overflow-x-hidden'>
        <OfficerDepartment />
        <OfficerChecklist />
        <OfficerReports />
        <OfficerHiredBy />
      </Accordion>
    </div>
  );
};

export default Profile;
