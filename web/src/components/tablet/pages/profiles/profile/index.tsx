import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';
import ProfileDetails from './ProfileDetails';
import ProfileLicenses from './ProfileLicenses';
import ProfileVehicles from './ProfileVehicles';
import ProfileReports from './ProfileReports';
import ProfileGallery from './ProfileGallery';
import ProfileProperties from './ProfileProperties';
import useProfileStore from './store';
import ProfileConvictions from './ProfileConvictions';

const Profile: React.FC = () => {
  const { value, setValue } = useProfileStore((state) => ({
    value: state.value,
    setValue: state.setValue,
  }));

  return (
    <div
      className='grid gap-2 w-full min-h-max'
      style={{ gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: '100%' }}
    >
      <ProfileDetails />
      <Separator orientation='vertical' />
      <Accordion value={value} onValueChange={setValue} type='multiple' className='overflow-y-auto overflow-x-hidden'>
        <ProfileLicenses />
        <ProfileConvictions />
        <ProfileReports />
        <ProfileVehicles />
        <ProfileProperties />
        <ProfileGallery />
      </Accordion>
    </div>
  );
};

export default Profile;
