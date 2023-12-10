import { Separator } from '@/components/ui/separator';
import useVehicleStore from './store';
import VehicleControls from './VehicleControls';
import Editor from '@/components/tablet/editor';
import useVehicleControlsStore from './controls';

const VehicleDetails: React.FC = () => {
  const { vehicle, setNotes } = useVehicleStore();
  const editing = useVehicleControlsStore((state) => state.editing);

  return (
    <div className='flex flex-col w-full overflow-hidden h-full gap-2'>
      <div className='flex gap-2'>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between items-end text-neutral-200 px-2'>
            <div className='text-xl capitalize'>{vehicle.model}</div>
            <span>{vehicle.plate}</span>
          </div>
        </div>
      </div>
      <Separator />
      <Editor
        onChange={(content) => {
          setNotes(content);
        }}
        editable={editing}
        content={vehicle.notes}
      />
      <VehicleControls />
    </div>
  );
};

export default VehicleDetails;
