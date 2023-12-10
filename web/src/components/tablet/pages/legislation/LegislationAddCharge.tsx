import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useLegislationStore, { Charge } from './store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long.',
    })
    .max(50, {
      message: 'Title must be at most 50 characters long.',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters long.',
    })
    .max(300, { message: 'Description must be at most 300 characters long.' }),
  fine: z
    .string()
    .min(0, { message: 'Fine must be at least 0.' })
    .refine((val: string) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    }),
  months: z
    .string()
    .min(0, { message: 'Months must be at least 0.' })
    .refine((val: string) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    }),
  type: z.string({ required_error: 'Please select a type.' }).regex(/^[0-2]$/, {
    message: 'Invalid type.',
  }),
});

const LegislationAddCharge: React.FC = () => {
  const { saving, addCharge } = useLegislationStore();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addCharge(values as Charge);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' disabled={saving}>
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New Charge</DialogTitle>
          <DialogDescription>
            Use this form to add a new charge. Please fill out all fields carefully. Once a charge is added, it can be
            edited or removed in the charges list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Charge Title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Charge Description' className='resize-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fine'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fine</FormLabel>
                  <FormControl>
                    <Input min={0} type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='months'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Months</FormLabel>
                  <FormControl>
                    <Input min={0} type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='0'>Infraction</SelectItem>
                        <SelectItem value='1'>Misdemeanor</SelectItem>
                        <SelectItem value='2'>Felony</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' variant='outline' type='submit' disabled={saving}>
              Confirm
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LegislationAddCharge;
