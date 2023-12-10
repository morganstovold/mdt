import useGlobalStore, { getRanks, rankString } from '@/store';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import useOfficerStore from './store';
import useOfficerControlsStore from './controls';
import FireOfficer from './FireOfficer';
import { sanitizeNumber } from '@/lib/utils';

const OfficerDepartment: React.FC = () => {
  const { officer, setDepartment, setRank, setCallsign } = useOfficerStore((state) => ({
    officer: state.officer,
    setDepartment: state.setDepartment,
    setRank: state.setRank,
    setCallsign: state.setCallsign,
  }));
  const departments = useGlobalStore((state) => state.departments);
  const editing = useOfficerControlsStore((state) => state.editing);

  return (
    <AccordionItem value='item-1'>
      <AccordionTrigger disabled={officer.citizenid === ''}>
        <span className='flex gap-1'>Department & Rank</span>
      </AccordionTrigger>
      <AccordionContent className='h-full'>
        <div className='flex flex-col gap-2 capitalize'>
          <div className='flex align-center gap-2 py-1 text-neutral-400'>
            <Icons.hash size='16px' />
            <span>Callsign</span>
          </div>
          <Input
            readOnly={!editing}
            value={officer.callsign}
            type='number'
            onChange={(e) => setCallsign(sanitizeNumber(e.target.value))}
            placeholder='Callsign'
            className='w-full'
          />
          <div className='flex align-center gap-2 py-1 text-neutral-400'>
            <Icons.building size='16px' />
            <span>Department</span>
          </div>
          <Select onValueChange={(value) => setDepartment(value)}>
            <SelectTrigger>
              <SelectValue>{officer.department.toUpperCase()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {departments.map((department, index) => {
<<<<<<< HEAD
                  if (department.name === 'judge' || department.name === 'doj') return null;
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                  return (
                    <SelectItem
                      key={index}
                      disabled={!editing && officer.department !== department.name}
                      value={department.name}
                    >
                      {department.name.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='flex align-center gap-2 py-1 text-neutral-400'>
            <Icons.briefcase size='16px' />
            <span>Rank</span>
          </div>
          <Select onValueChange={(value) => setRank(value)}>
            <SelectTrigger className='capitalize'>
              <SelectValue>{rankString(officer.department, officer.rank)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='capitalize'>
                {getRanks(officer.department).map((rank, index) => (
                  // @ts-ignore
                  <SelectItem key={index} disabled={!editing && officer.rank !== index} value={index}>
                    {rank.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FireOfficer officer={officer} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default OfficerDepartment;
