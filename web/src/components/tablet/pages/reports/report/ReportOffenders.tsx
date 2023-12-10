import React, { useCallback, useEffect, useState } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icons } from '@/components/icons';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn, Time } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useReportControlStore from './controls';
import useReportStore, { Offender } from './store';
import { Button } from '@/components/ui/button';
import ProfilesSearch from '../../profiles/search';
<<<<<<< HEAD
import LegislationItems from '../../legislation/LegislationItems';
import LegislationFilter from '../../legislation/LegislationFilter';
import { Charge } from '../../legislation/store';
import { Separator } from '@/components/ui/separator';
=======
import { Charge } from '../../legislation/store';
import { Separator } from '@/components/ui/separator';
import Legislation from '../../legislation';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const FormSchema = z.object({
  date: z.date({
    required_error: 'A expiration date is required.',
  }),
});

const Warrant: React.FC<{ index: number; offender: Offender }> = ({ index, offender }) => {
  const editing = useReportControlStore((state) => state.editing);
  const [warrant, _] = useState(offender.warrant);
  const { createWarrant, removeWarrant } = useReportStore((state) => ({
    createWarrant: state.setWarrant,
    removeWarrant: state.removeWarrant,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: warrant ? new Date(warrant) : undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createWarrant(index, data.date.toString());
  }

  useEffect(() => {
    if (offender.warrant && new Date(offender.warrant) < new Date()) {
      removeWarrant(index);
    }
  }, [offender.warrant]);

  return (
    <div className='flex flex-col gap-2'>
      <Form {...form}>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <Popover>
                <PopoverTrigger asChild className='flex'>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? new Date(field.value).toLocaleDateString() : <span>Pick a date</span>}
                      <Icons.calendar className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setDate(new Date().getDate() - 1)) ||
                      offender.warrant !== undefined ||
                      !editing
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {editing &&
          (offender.warrant ? (
            <Button
              variant='destructive'
              onClick={() => {
                removeWarrant(index);
              }}
<<<<<<< HEAD
              className='whitespace-nowrap text-red-200'
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            >
              Remove Warrant
            </Button>
          ) : (
<<<<<<< HEAD
            <Button
              variant='outline'
              onClick={form.handleSubmit(onSubmit)}
              disabled={offender.warrant !== undefined}
              className='whitespace-nowrap text-neutral-400'
            >
=======
            <Button variant='outline' onClick={form.handleSubmit(onSubmit)} disabled={offender.warrant !== undefined}>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
              Create Warrant
            </Button>
          ))}
      </Form>
      <span className='text-center'>
        Expires on{' '}
        {offender.warrant ? (
          <>
            {new Date(offender.warrant).toLocaleDateString()} ({Time(offender.warrant)})
          </>
        ) : (
          'N/A'
        )}
      </span>
    </div>
  );
};

const Offender: React.FC<{ offender: Offender; index: number }> = React.memo(({ offender, index }) => {
  const [open, setOpen] = useState(false);
  const { updateCharges, removeOffender } = useReportStore((state) => ({
    updateCharges: state.updateCharges,
    removeOffender: state.removeOffender,
  }));

  const finalFine = offender.charges.reduce((acc, charge) => acc + Number(charge.charge.fine) * charge.count, 0);
  const finalMonths = offender.charges.reduce((acc, charge) => acc + Number(charge.charge.months) * charge.count, 0);
  const editing = useReportControlStore((state) => state.editing);

  const UpdateCharges = useCallback(
    (charges: { charge: Charge; count: number }[]) => {
      updateCharges(index, charges);
    },
    [updateCharges, index],
  );

  return (
    <div className='flex flex-col border p-4 gap-2'>
      <div className='flex text-base font-semibold uppercase justify-between w-full text-neutral-400 px-2'>
        <span className='flex items-center gap-2'>
          <span className='text-neutral-200'>
            {offender.firstname} {offender.lastname}
          </span>
          {offender.warrant && <span className='px-1 rounded-sm text-sm bg-red-800/20 text-red-400'>WARRANT</span>}
        </span>
        <span>{offender.citizenid}</span>
      </div>
      <Table className='w-full'>
        <TableCaption>
          Charges - {offender.charges.length} - Total Fine: ${finalFine} - Total Months: {finalMonths}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='text-neutral-400'>Charge</TableHead>
            <TableHead className='text-neutral-400'>Fine</TableHead>
            <TableHead className='text-neutral-400'>Months</TableHead>
            <TableHead className='text-neutral-400'>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offender.charges.map((charge, index) => (
            <TableRow key={index} className='text-neutral-400'>
              <TableCell>{charge.charge.title}</TableCell>
              <TableCell>${Number(charge.charge.fine) * charge.count}</TableCell>
              <TableCell>{Number(charge.charge.months) * charge.count}</TableCell>
              <TableCell>{charge.count}</TableCell>
            </TableRow>
          ))}
          {!editing && offender.charges.length <= 0 && (
            <TableRow>
              <TableCell colSpan={4} className='text-neutral-400 text-center p-2'>
                No Charges
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editing && (
        <>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex gap-2'>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant='outline' onClick={() => setOpen(true)} className='w-full text-neutral-400'>
                    Update Charges
                  </Button>
                </DialogTrigger>
<<<<<<< HEAD
                <DialogContent
                  className='max-w-[75%] h-[60%] grid overflow-hidden'
                  style={{ gridTemplateRows: 'auto auto 1fr' }}
                >
                  <DialogHeader>
                    <DialogTitle>Update Offender's Charges</DialogTitle>
                  </DialogHeader>
                  <LegislationFilter />
                  <div className='h-full w-full overflow-y-auto'>
                    <LegislationItems func={UpdateCharges} checked={offender.charges} />
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant='ghost' onClick={() => removeOffender(offender.citizenid)} className='whitespace-nowrap'>
=======
                <DialogContent className='max-w-[75%] h-[60%] flex flex-col overflow-hidden'>
                  <DialogHeader>
                    <DialogTitle>Update Offender's Charges</DialogTitle>
                  </DialogHeader>
                  <div className='h-full w-full overflow-y-auto'>
                    <Legislation func={UpdateCharges} checked={offender.charges} />
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant='destructive'
                onClick={() => removeOffender(offender.citizenid)}
                className='whitespace-nowrap'
              >
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                Remove Offender
              </Button>
            </div>
          </div>
        </>
      )}
      <Separator style={{ gridColumn: '1 / 3' }} />
      <Warrant index={index} offender={offender} />
    </div>
  );
});

const NewOffender: React.FC = () => {
  const { addOffender, removeOffender, offenders } = useReportStore((state) => ({
    addOffender: state.addOffender,
    removeOffender: state.removeOffender,
    offenders: state.report.offenders,
  }));
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setOpen(true)} className='w-full text-neutral-400'>
          Add Offender
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[30%] h-[50%] grid overflow-hidden' style={{ gridTemplateRows: 'auto 1fr' }}>
        <DialogHeader>
          <DialogTitle>Add Offender</DialogTitle>
          <DialogDescription>Add an offender to the report by searching for them below.</DialogDescription>
        </DialogHeader>
        <ProfilesSearch func={addOffender} remove={removeOffender} checked={offenders} />
      </DialogContent>
    </Dialog>
  );
};

const ReportOffenders: React.FC = () => {
  const { offenders, id } = useReportStore((state) => ({
    offenders: state.report.offenders,
    id: state.report.id,
  }));
  const editing = useReportControlStore((state) => state.editing);

  return (
    <AccordionItem value='item-2'>
      <AccordionTrigger disabled={!id}>
        <span className='flex gap-1'>
          Offenders
          <span className='text-neutral-400'>- {offenders.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col gap-2'>
          {editing && <NewOffender />}
          <div className='flex flex-col gap-2'>
            {offenders.map((offender, index) => (
              <Offender key={index} offender={offender} index={index} />
            ))}
            {!editing && offenders.length <= 0 && <div className='text-neutral-400 text-center p-2'>No Offenders</div>}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ReportOffenders;
