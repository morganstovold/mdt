import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import useProfileControlsStore from './controls';
import useProfileStore from './store';
import React from 'react';
import { useI18nContext } from '@/i18n/i18n-react';
<<<<<<< HEAD
=======
import PImage from '@/components/tablet/Image';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

const formSchema = z.object({
  pfp: z.string().url(),
});

const ProfilePicture: React.FC = () => {
  const { pfp, setPFP } = useProfileStore((state) => ({
    pfp: state.profile.pfp,
    setPFP: state.setPFP,
  }));
  const editing = useProfileControlsStore((state) => state.editing);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pfp: pfp,
    },
  });
  const { LL } = useI18nContext();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPFP(values.pfp);
  }

  React.useEffect(() => {
    form.setValue('pfp', pfp);
  }, [pfp]);

<<<<<<< HEAD
  function handleImageError() {
    setPFP(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
    );
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <img
          className='w-52 h-52 border rounded-sm aspect-square object-cover object-center'
          src={pfp}
          onError={handleImageError}
        />
=======
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <div className='h-52 aspect-square'>
          <PImage src={pfp} />
        </div>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='flex flex-col gap-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='pfp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{LL.profiles.pfp()}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!editing} variant='outline' type='submit'>
                {LL.utils.update()}
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePicture;
