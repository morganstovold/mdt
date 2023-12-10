import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import useOfficerStore from './store';
import { Time } from '@/lib/utils';
import { rankString } from '@/store';
<<<<<<< HEAD
=======
import PImage from '@/components/tablet/Image';
import { useI18nContext } from '@/i18n/i18n-react';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const OfficerHiredBy: React.FC = () => {
  const { officer, viewHiredBy } = useOfficerStore((state) => ({
    officer: state.officer,
    viewHiredBy: state.viewHiredBy,
  }));
<<<<<<< HEAD
=======
  const { LL } = useI18nContext();
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

  return (
    <AccordionItem value='item-4'>
      <AccordionTrigger disabled={officer.citizenid === ''}>
<<<<<<< HEAD
        <span className='flex gap-1'>Recruiting Officer</span>
      </AccordionTrigger>
      <AccordionContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='p-2 border flex gap-2 rounded-md hover:bg-neutral-700/10'>
              <img
                src={officer.hiredBy.pfp}
                className='w-20 h-20 border 6rounded-sm aspect-square object-cover object-center'
                onError={(e) => {
                  e.currentTarget.src =
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
                }}
              />
              <div>
                <Separator orientation='vertical' />
              </div>
              <div className='flex flex-col justify-between w-full text-neutral-400'>
                <div className='flex justify-between gap-2'>
                  <div className='text-base text-neutral-200 capitalize'>
                    {officer.hiredBy.firstname} {officer.hiredBy.lastname}
                  </div>
                  <div>{officer.hiredBy.citizenid}</div>
                </div>
                <div className='flex justify-between gap-2'>
                  <div className='uppercase'>
                    {officer.hiredBy.callsign} {officer.hiredBy.department}{' '}
                    {rankString(officer.hiredBy.department, officer.hiredBy.rank)}
                  </div>
                  <div className='capitalize'>{Time(officer.time)}</div>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={4} align='end'>
            <DropdownMenuItem onClick={viewHiredBy}>View Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
=======
        <span className='flex gap-1'>{LL.roster.hiredBy()}</span>
      </AccordionTrigger>
      <AccordionContent>
        {officer.hiredBy.citizenid !== '0' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='p-2 border flex items-center justify-center gap-2 rounded-md hover:bg-neutral-700/10'>
                <div className='h-20 aspect-square'>
                  <PImage src={officer.hiredBy.pfp} />
                </div>
                <div>
                  <Separator orientation='vertical' />
                </div>
                <div className='flex flex-col justify-between w-full text-neutral-400'>
                  <div className='flex justify-between gap-2'>
                    <div className='text-base text-neutral-200 capitalize'>
                      {officer.hiredBy.firstname} {officer.hiredBy.lastname}
                    </div>
                    <div>{officer.hiredBy.citizenid}</div>
                  </div>
                  <div className='flex justify-between gap-2'>
                    <div className='uppercase'>
                      {officer.hiredBy.callsign} {officer.hiredBy.department}{' '}
                      {rankString(officer.hiredBy.department, officer.hiredBy.rank)}
                    </div>
                    <div className='capitalize'>{Time(officer.time)}</div>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={4} align='end'>
              <DropdownMenuItem onClick={viewHiredBy}>{LL.utils.vProfile()}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='p-2 border h-20 flex items-center justify-center gap-2 rounded-md hover:bg-neutral-700/10'>
            {LL.roster.noHiredBy()}
          </div>
        )}
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      </AccordionContent>
    </AccordionItem>
  );
};

export default OfficerHiredBy;
