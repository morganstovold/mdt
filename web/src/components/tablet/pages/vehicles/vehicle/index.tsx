import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';
import VehicleDetails from './VehicleDetails';
import VehicleOwner from './VehicleOwner';
import useVehicleStore from './store';
import VehicleGallery from './VehicleGallery';

const Vehicle: React.FC = () => {
  const { value, setValue } = useVehicleStore((state) => ({
    value: state.value,
    setValue: state.setValue,
  }));

  return (
    <div
      className='grid gap-2 w-full min-h-max'
      style={{ gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: '100%' }}
    >
      <VehicleDetails />
      <Separator orientation='vertical' />
      <Accordion value={value} onValueChange={setValue} type='multiple' className='overflow-y-auto overflow-x-hidden'>
        <VehicleOwner />
        <VehicleGallery />
      </Accordion>
    </div>
  );
};

export default Vehicle;
