import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import useVehicleStore from './store';
<<<<<<< HEAD
=======
import PImage from '@/components/tablet/Image';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const VehicleOwner: React.FC = () => {
  const { vehicle, viewOwner } = useVehicleStore((state) => ({
    vehicle: state.vehicle,
    viewOwner: state.viewOwner,
  }));

  return (
    <AccordionItem value='item-2'>
      <AccordionTrigger disabled={vehicle.id === -1}>
        <span className='flex gap-1'>Vehicle Owner</span>
      </AccordionTrigger>
      <AccordionContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='p-2 border flex gap-2 rounded-md hover:bg-neutral-700/10'>
<<<<<<< HEAD
              <img
                src={vehicle.pfp}
                className='w-20 h-20 border 6rounded-sm aspect-square object-cover object-center'
                onError={(e) => {
                  e.currentTarget.src =
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
                }}
              />
=======
              <div className="h-20 aspect-square">
                <PImage src={vehicle.pfp!} />
              </div>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
              <div>
                <Separator orientation='vertical' />
              </div>
              <div className='flex flex-col justify-between w-full text-neutral-400'>
                <div className='flex justify-between gap-2'>
                  <div className='text-base text-neutral-200 capitalize'>
                    {vehicle.firstname} {vehicle.lastname}
                  </div>
                  <div>{vehicle.citizenid}</div>
                </div>
                <div className='flex justify-between gap-2'>
                  <div>{Number(vehicle.gender) ? 'Female' : 'Male'}</div>
                  <div>{vehicle.job}</div>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={4} align='end'>
            <DropdownMenuItem onClick={viewOwner}>View Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </AccordionContent>
    </AccordionItem>
  );
};

export default VehicleOwner;
