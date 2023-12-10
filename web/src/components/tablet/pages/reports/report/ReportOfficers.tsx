import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import useReportControlStore from './controls';
import useReportStore from './store';
import { Button } from '@/components/ui/button';
import OfficerSearch from '../../roster/search';
import { Icons } from '@/components/icons';

const NewOfficer: React.FC = () => {
  const { addOfficer, removeOfficer, officers } = useReportStore((state) => ({
    addOfficer: state.addOfficer,
    removeOfficer: state.removeOfficer,
    officers: state.report.officers,
  }));
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' onClick={() => setOpen(true)} className='w-full text-neutral-400'>
          Add Officer
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[30%] h-[50%] grid overflow-hidden' style={{ gridTemplateRows: 'auto 1fr' }}>
        <DialogHeader>
          <DialogTitle>Add Officer</DialogTitle>
          <DialogDescription>Add an officer to the report by searching for them below.</DialogDescription>
        </DialogHeader>
        <OfficerSearch func={addOfficer} remove={removeOfficer} checked={officers} />
      </DialogContent>
    </Dialog>
  );
};

const ReportOfficers: React.FC = () => {
  const { officers, id, viewOfficer } = useReportStore((state) => ({
    officers: state.report.officers,
    id: state.report.id,
    removeOfficer: state.removeOfficer,
    viewOfficer: state.viewOfficer,
  }));
  const editing = useReportControlStore((state) => state.editing);

  return (
    <AccordionItem value='item-1'>
      <AccordionTrigger disabled={!id}>
        <span className='flex gap-1'>
          Officers
          <span className='text-neutral-400'>- {officers.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-full'>Name</TableHead>
              <TableHead className='w-fit'>Callsign</TableHead>
              <TableHead className='w-fit'>Rank</TableHead>
              <TableHead className='w-fit'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {officers.map((officer, index) => (
              <TableRow className='capitalize' key={index}>
                <TableCell>
                  {officer.firstname} {officer.lastname}
                </TableCell>
                <TableCell>{officer.callsign}</TableCell>
                <TableCell>{officer.rank}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='p-2.5'>
                        <Icons.moreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={4} align='end'>
                      <DropdownMenuItem onClick={() => viewOfficer(officer.citizenid)}>View Officer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!editing && officers.length <= 0 && (
              <TableRow>
                <td colSpan={4} className='text-neutral-400 text-center p-2'>
                  No Officers
                </td>
              </TableRow>
            )}
            {editing && (
              <TableRow>
                <td colSpan={5}>
                  <NewOfficer />
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ReportOfficers;
