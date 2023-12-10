import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useOfficerStore, { Officer } from './store';
import { usePermissions } from '@/store';
import { Icons } from '@/components/icons';
import { useState } from 'react';

const FireOfficer = ({ officer }: { officer: Officer }) => {
  const [open, setOpen] = useState(false);
  const { fire, firing } = useOfficerStore((state) => ({ fire: state.fire, firing: state.firing }));
  const permitted = usePermissions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!permitted('roster.fire')} onClick={() => setOpen(true)} variant='destructive'>
          Terminate Officer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation Required</DialogTitle>

          <DialogDescription>
            You are about to terminate the employment of Officer
            <span className='capitalize'>{` ${officer.callsign} - ${officer.firstname} ${officer.lastname}`}</span>.
            Post termination, this officer will lose access to the Department Tools. They will be removed from the
            roster and would need to be rehired for reinstatement.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant='outline' onClick={() => fire(officer.citizenid!)} disabled={firing}>
            {firing && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />} Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FireOfficer;
