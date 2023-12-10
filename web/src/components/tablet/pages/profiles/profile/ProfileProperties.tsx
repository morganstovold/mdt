import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useProfileStore from './store';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileProperties: React.FC = ({}) => {
  const { properties, citizenid } = useProfileStore((state) => ({
    properties: state.profile.properties,
    citizenid: state.profile.citizenid,
  }));
  const { LL } = useI18nContext();

  return (
    <AccordionItem value='item-5'>
      <AccordionTrigger disabled={!citizenid}>
        <span className='flex gap-1'>
          {LL.profiles.properties()}
          <span className='text-neutral-400'>- {properties.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>{LL.profiles.address()}</TableHead>
              <TableHead>{LL.utils.type()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property, index) => (
              <TableRow className='capitalize' key={index}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.type}</TableCell>
              </TableRow>
            ))}
            {properties.length <= 0 && (
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

export default ProfileProperties;
