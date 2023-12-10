import { Separator } from '@/components/ui/separator';
import useOfficerStore from './store';
import { Icons } from '@/components/icons';
import { formatPhoneNumber } from '@/lib/utils';
import useGlobalStore, { rankString } from '@/store';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useOfficerControlsStore from './controls';
import OfficerControls from './OfficerControls';
<<<<<<< HEAD
=======
import PImage from '@/components/tablet/Image';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const OfficerDetails: React.FC = () => {
  const certs = useGlobalStore((state) => state.certs);
  const { officer, setCert } = useOfficerStore((state) => ({ officer: state.officer, setCert: state.setCert }));
  const editing = useOfficerControlsStore((state) => state.editing);

  return (
    <div className='flex flex-col w-full overflow-hidden h-full gap-2'>
      <div className='flex gap-2'>
<<<<<<< HEAD
        <img
          src={officer.pfp}
          onError={(e) =>
            (e.currentTarget.src =
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')
          }
          className='w-52 h-52 border rounded-sm aspect-square object-cover object-center'
        />
=======
        <div className="h-52 aspect-square">
          <PImage src={officer.pfp} />
        </div>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        <Separator orientation='vertical' />
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between items-end text-neutral-400 px-2'>
            <div className='text-xl capitalize text-neutral-200'>
              {officer.firstname} {officer.lastname}
            </div>
            <span>{officer.citizenid}</span>
          </div>
          <Separator />
          <div className='flex flex-col justify-between w-full h-full text-neutral-400 p-2 text-sm'>
            <div className='flex flex-col gap-2 capitalize'>
              <div className='flex items-center gap-2 py-1 uppercase'>
                <Icons.building size='16px' />
                <Separator orientation='vertical' /> <span>{officer.department}</span>
              </div>
              <div className='flex items-center gap-2 py-1'>
                <Icons.briefcase size='16px' />
                <Separator orientation='vertical' /> <span>{rankString(officer.department, officer.rank)}</span>
              </div>
              <div className='flex items-center gap-2 py-1'>
                <Icons.phone size='16px' />
                <Separator orientation='vertical' />
                <span>{formatPhoneNumber(officer.phone)}</span>
              </div>
            </div>
            <div>Last Updated {new Date(officer.updatedAt!).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      <Separator />
      <div className='h-full flex flex-col justify-center overflow-y-scroll'>
        <Table>
          <TableBody>
            {certs.map((cert, index) => {
              const hasCert = officer.certs.includes(cert.id);
              return (
                <TableRow className={hasCert ? 'text-emerald-400/90' : 'text-red-400/90'} key={index}>
                  <TableCell className='w-full capitalize'>{cert.label}</TableCell>
                  <TableCell className='w-fit'>
                    <DropdownMenu>
                      <DropdownMenuTrigger disabled={!editing} asChild>
                        <Button variant='outline' className='p-2.5'>
                          <Icons.moreHorizontal className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent sideOffset={4} align='end'>
                        <DropdownMenuItem onClick={() => setCert(cert.id)}>
                          {hasCert ? 'Revoke Certification' : 'Grant Certification'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <OfficerControls />
    </div>
  );
};

export default OfficerDetails;
