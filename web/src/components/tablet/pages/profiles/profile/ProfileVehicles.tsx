import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useProfileStore from './store';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileVehicles: React.FC = () => {
  const { vehicles, citizenid, viewVehicle } = useProfileStore((state) => ({
    vehicles: state.profile.vehicles,
    citizenid: state.profile.citizenid,
    viewVehicle: state.viewVehicle,
  }));
  const { LL } = useI18nContext();

  return (
    <AccordionItem value='item-4'>
      <AccordionTrigger disabled={!citizenid}>
        <span className='flex gap-1'>
          {LL.pages.vehicles()}
          <span className='text-neutral-400'>- {vehicles.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50%]'>Plate</TableHead>
              <TableHead className='w-[50%]'>Model</TableHead>
              <TableHead className='w-auto'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle, index) => (
              <TableRow key={index}>
                <TableCell>{vehicle.plate}</TableCell>
                <TableCell>{vehicle.vehicle}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='p-2.5'>
                        <Icons.moreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={4} align='end'>
                      <DropdownMenuItem onClick={() => viewVehicle(vehicle.plate)}>
<<<<<<< HEAD
                        {LL.vehicles.viewVehicle()}
=======
                        {LL.utils.vVehicle()}
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {vehicles.length <= 0 && (
              <TableRow>
                <td colSpan={4} className='text-neutral-400 text-center p-2'>
                  {LL.utils.none()}
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileVehicles;
