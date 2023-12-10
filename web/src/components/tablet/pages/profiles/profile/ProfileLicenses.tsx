import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import useProfileStore from './store';
import useProfileControlsStore from './controls';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileLicenses: React.FC = () => {
  const { licenses, citizenid, setLicense } = useProfileStore((state) => ({
    licenses: state.profile.licenses,
    citizenid: state.profile.citizenid,
    setLicense: state.setLicense,
  }));
  const editing = useProfileControlsStore((state) => state.editing);
  const { LL } = useI18nContext();

  return (
    <AccordionItem defaultChecked value='item-1'>
      <AccordionTrigger disabled={!citizenid}>{LL.profiles.licenses()}</AccordionTrigger>
      <AccordionContent>
        <Table className='w-full'>
          <TableBody>
            {licenses.map((license, index) => (
              <TableRow className={license.active ? 'text-emerald-400/90' : 'text-red-400/90'} key={index}>
                <TableCell className='w-full capitalize'>{license.name}</TableCell>
                <TableCell className='w-fit'>
                  <DropdownMenu>
                    <DropdownMenuTrigger disabled={!editing} asChild>
                      <Button variant='outline' className='p-2.5'>
                        <Icons.moreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={4} align='end'>
                      <DropdownMenuItem onClick={() => setLicense(license.name, !license.active)}>
                        {license.active ? LL.profiles.revoke() : LL.profiles.grant()}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileLicenses;
