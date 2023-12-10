import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useOfficerStore from './officer/store';
import ProfilesSearch from '../profiles/search';
import { usePermissions } from '@/store';
import { type Profile } from '../profiles/profile/store';

const HireOfficer: React.FC = () => {
  const [officer, setOfficer] = useState<Profile[]>([]);
  const { hire } = useOfficerStore((state) => ({
    hire: state.hire,
  }));

  const selectOfficer = (officer: Profile) => setOfficer([officer]);
  const removeOfficer = () => setOfficer([]);

  const permitted = usePermissions();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={!permitted('roster.hire')} variant='outline' className='w-full'>
          Hire Officer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='max-w-[30%] h-[50%] grid overflow-hidden' style={{ gridTemplateRows: 'auto 1fr' }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Citizen Search</AlertDialogTitle>
          <AlertDialogDescription>Select an citizen to hire</AlertDialogDescription>
        </AlertDialogHeader>
        <ProfilesSearch func={selectOfficer} remove={removeOfficer} checked={officer} jobCheck />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => hire(officer[0])} disabled={officer.length <= 0}>
            Hire Citizen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HireOfficer;
