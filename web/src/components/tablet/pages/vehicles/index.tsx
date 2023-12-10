import { Separator } from '@/components/ui/separator';
import Vehicle from './vehicle';
import VehiclesSearch from './search';

const Vehicles: React.FC = () => {
  return (
    <div
      className="grid h-full overflow-hidden"
      style={{ gridTemplateRows: '1fr', gridTemplateColumns: '25% auto 1fr' }}
    >
      <VehiclesSearch />
      <Separator className="mx-2" orientation="vertical" />
      <Vehicle />
    </div>
  );
};

export default Vehicles;
