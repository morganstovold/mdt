import useOfficerStore from './store';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useGlobalStore, { usePermissions } from '@/store';
import useOfficerControlsStore from './controls';
import { cn, Time } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';

export const formSchema = z.object({
  performance: z.string({ required_error: 'Please select a performance.' }).regex(/^[1-5]$/, {
    message: 'Invalid performance.',
  }),
  notes: z.string().max(300, { message: 'Notes must be at most 300 characters long.' }),
});

const PerformanceMap: Record<string, { label: string; color: string }> = {
  1: {
    label: 'Poor',
    color: 'text-red-400',
  },
  2: {
    label: 'Needs Improvement',
    color: 'text-orange-400',
  },
  3: {
    label: 'Average',
    color: 'text-yellow-400',
  },
  4: {
    label: 'Good',
    color: 'text-green-400',
  },
  5: {
    label: 'Excellent',
    color: 'text-emerald-400',
  },
};

const Item = ({
  id,
  label,
  description,
  item,
}: {
  id: number;
  label: string;
  description: string;
  item?: {
    id: number;
    performance: string;
    notes: string;
    time: string;
    fto: {
      firstname: string;
      lastname: string;
      callsign: string;
    };
  };
}) => {
  const [open, setOpen] = useState(false);
  const { signOff, removeSignOff } = useOfficerStore((state) => ({
    signOff: state.signOffCheck,
    removeSignOff: state.removeSignOff,
  }));
  const editing = useOfficerControlsStore((state) => state.editing);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { performance: '3', notes: '' },
  });
  const permitted = usePermissions();

  useEffect(() => {
    if (item) {
      form.reset({
        performance: item.performance,
        notes: item.notes,
      });
    }
  }, [item, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    signOff(id, values.performance, values.notes);
    setOpen(false);
    form.reset({
      performance: '3',
      notes: '',
    });
  }

  function onRemove() {
    removeSignOff(id);
    setOpen(false);
    form.reset({
      performance: '3',
      notes: '',
    });
    console.log(JSON.stringify(form.getValues(), null, 2));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex border p-4 gap-2'>
          <div className='text-sm w-full text-neutral-400'>
            <div className='flex justify-between items-center text-sm'>
              {item ? (
                <>
                  <div className='flex gap-2 text-emerald-400 uppercase'>signed off</div>
                  <div className={cn('flex gap-2', PerformanceMap[item.performance].color)}>
                    {item.performance} - {PerformanceMap[item.performance].label}
                  </div>
                </>
              ) : (
                <div className='flex gap-2 text-red-400 uppercase'>not completed</div>
              )}
            </div>
            <h2 className='text-lg font-normal text-neutral-200 truncate'>{label}</h2>
            <span>{description}</span>
            <div className='flex justify-between items-center mt-1'>
              {item && (
                <>
                  <span className='flex items-center capitalize'>
                    FTO: {item.fto.callsign} - {item.fto.firstname} {item.fto.lastname}
                  </span>
                  <div className='block'>Completed {Time(item.time!)}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='performance'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Officer's Performance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(PerformanceMap).map(([key, value]) => (
                          <SelectItem
                            key={key}
                            disabled={(!editing || !permitted('roster.fto')) && field.value !== key}
                            value={key}
                          >
                            {key} - {value.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>How well did the officer perform during this training session?</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Any notes about this training session?'
                      readOnly={!editing || !permitted('roster.fto')}
                      {...field}
                      className='resize-none'
                    />
                  </FormControl>
                  <FormDescription>Any notes about this training session?</FormDescription>
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-2'>
              <DialogClose asChild>
                <Button variant='ghost'>Cancel</Button>
              </DialogClose>
              {item && permitted('roster.fto') && (
                <Button disabled={!editing || !permitted('roster.fto')} variant='outline' onClick={onRemove}>
                  Remove Sign Off
                </Button>
              )}
              <Button disabled={!editing || !permitted('roster.fto')} variant='outline' type='submit'>
                {item ? 'Edit' : 'Sign Off'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const OfficerChecklist: React.FC = () => {
  const checklist = useGlobalStore((state) => state.checklist);
  const officer = useOfficerStore((state) => state.officer);

  return (
    <AccordionItem value='item-2'>
      <AccordionTrigger disabled={officer.citizenid === ''}>
        <span className='flex gap-1'>Officer Checklist</span>
      </AccordionTrigger>
      <AccordionContent className='h-full'>
        <div className='flex flex-col gap-2'>
          {checklist.map((item, index) => {
            const foundItem = officer.checklist.find((i) => i.id === item.id);
            return <Item key={index} {...item} item={foundItem} />;
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default OfficerChecklist;
