import useVehicleControlsStore from './controls';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { usePermissions } from '@/store';

const VehicleControls: React.FC = () => {
  const { editing, saving, canEdit } = useVehicleControlsStore();
  const { edit, cancel, save } = useVehicleControlsStore();
  const permitted = usePermissions();

  return (
    <div className='flex gap-2'>
      {editing || saving ? (
        <>
          <Button
            className='rounded-none w-full'
            variant='outline'
            onClick={cancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            className='rounded-none w-full'
            variant='outline'
            onClick={save}
            disabled={saving}
          >
            {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
            Save
          </Button>
        </>
      ) : (
        <Button
          disabled={editing || !canEdit || !permitted('vehicles.update')}
          className='rounded-none w-full'
          variant='outline'
          onClick={edit}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default VehicleControls;
