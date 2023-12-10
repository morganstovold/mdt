import useOfficerControlsState from './controls';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { usePermissions } from '@/store';

const OfficerControls: React.FC = () => {
  const { editing, saving, canEdit, edit, cancel, save } = useOfficerControlsState();
  const permitted = usePermissions();

  return (
    <div className='flex gap-2'>
      {editing || saving ? (
        <>
          <Button className='w-full' variant='outline' onClick={cancel} disabled={saving}>
            Cancel
          </Button>
          <Button className='w-full' variant='outline' onClick={save} disabled={saving}>
            {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
            Save
          </Button>
        </>
      ) : (
        <Button
          disabled={editing || !canEdit || !permitted('roster.update')}
          className='w-full'
          variant='outline'
          onClick={edit}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default OfficerControls;
