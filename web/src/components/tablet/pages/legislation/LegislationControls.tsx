import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import useLegislationStore from './store';
import LegislationAddCharge from './LegislationAddCharge';
import { usePermissions } from '@/store';

const LegislationControls: React.FC = () => {
  const { editing, saving, edit, cancel, save } = useLegislationStore();
  const permitted = usePermissions();
  return (
    <div className='flex gap-2'>
      {editing || saving ? (
        <>
          <Button variant='outline' onClick={cancel} disabled={saving}>
            Cancel
          </Button>
          <LegislationAddCharge />
          <Button variant='outline' onClick={save} disabled={saving}>
            {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
            Save
          </Button>
        </>
      ) : (
        <Button disabled={editing || !permitted('legislation.update')} variant='outline' onClick={() => edit()}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default LegislationControls;
