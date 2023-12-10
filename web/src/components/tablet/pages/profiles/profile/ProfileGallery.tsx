import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
<<<<<<< HEAD
import useProfileStore, { Image } from './store';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';
import useProfileControlsStore from './controls';
import { useI18nContext } from '@/i18n/i18n-react';

const formSchema = z.object({
  url: z.string().url(),
  notes: z.string().optional(),
});

const GalleryImage: React.FC<Image> = React.memo(({ url, notes }): React.ReactNode => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const { removeImage, updateImage } = useProfileStore((state) => ({
    removeImage: state.removeImage,
    updateImage: state.updateImage,
  }));
  const editing = useProfileControlsStore((state) => state.editing);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: url,
      notes: notes,
    },
  });
  const { LL } = useI18nContext();

  React.useEffect(() => {
    form.setValue('url', url);
    form.setValue('notes', notes);
  }, [url, notes]);

  const onSubmit = React.useCallback(
    (values: z.infer<typeof formSchema>) => {
      updateImage(values, { url, notes });
      form.reset();
      setOpen(false);
    },
    [updateImage, url],
  );

  const onRemove = React.useCallback(() => {
    removeImage(url);
    form.reset();
    setOpen(false);
  }, [removeImage, url]);

  const onLoaded = React.useCallback(() => {
    setImageLoaded(true);
  }, [url]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild {...(!imageLoaded && { className: 'hidden' })}>
        <div className='flex flex-col gap-2 bg-border/20 rounded-md overflow-hidden'>
          <img
            src={url}
            alt='gallery'
            className={cn('w-full aspect-square object-cover object-center', !imageLoaded && 'hidden')}
            onLoad={onLoaded}
          />
          <span
            className='
            text-neutral-400
            font-medium
            truncate
            w-full
            text-center
          '
          >
            {notes}
          </span>
        </div>
      </PopoverTrigger>
      {!imageLoaded && <Skeleton className='w-full rounded-sm aspect-square object-cover object-center' />}
      <PopoverContent side='left' className='w-80'>
        <div className='flex flex-col gap-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{LL.gallery.imageURL()}</FormLabel>
                    <FormControl>
                      <Input readOnly={!editing} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{LL.gallery.notes()}</FormLabel>
                    <FormControl>
                      <Input readOnly={!editing} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!editing} variant='outline' type='submit'>
                {LL.utils.change()}
              </Button>
            </form>
          </Form>
          <Button disabled={!editing} variant='outline' onClick={onRemove}>
            {LL.utils.remove()}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
});

const NewImage: React.FC = React.memo(() => {
  const [open, setOpen] = useState(false);
  const { addImage } = useProfileStore((state) => ({
    addImage: state.addImage,
  }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      notes: '',
    },
  });
  const { LL } = useI18nContext();

  function onSubmit(values: z.infer<typeof formSchema>) {
    addImage(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant='outline' onClick={() => {}} className='w-full'>
          {LL.gallery.addImage()}
        </Button>
      </PopoverTrigger>
      <PopoverContent side='left' className='w-80'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{LL.gallery.imageURL()}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{LL.gallery.notes()}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' type='submit'>
              {LL.gallery.addImage()}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
});

const ProfileGallery: React.FC = () => {
  const { gallery, citizenid } = useProfileStore((state) => ({
    gallery: state.profile.gallery,
    citizenid: state.profile.citizenid,
=======
import useProfileStore from './store';
import React from 'react';
import useProfileControlsStore from './controls';
import { useI18nContext } from '@/i18n/i18n-react';
import Gallery from '@/components/tablet/Gallery';

const ProfileGallery: React.FC = () => {
  const { gallery, citizenid, addImage, removeImage, updateImage } = useProfileStore((state) => ({
    gallery: state.profile.gallery,
    citizenid: state.profile.citizenid,
    addImage: state.addImage,
    removeImage: state.removeImage,
    updateImage: state.updateImage,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  }));
  const editing = useProfileControlsStore((state) => state.editing);
  const { LL } = useI18nContext();

  return (
    <AccordionItem value='item-6'>
      <AccordionTrigger disabled={!citizenid}>
        <span className='flex gap-1'>
<<<<<<< HEAD
          {LL.pages.gallery()}
=======
          {LL.gallery.title()}
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
          <span className='text-neutral-400'>- {gallery.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
<<<<<<< HEAD
        <div className='flex flex-col gap-2'>
          {editing && <NewImage />}
          <div className='grid gap-2 w-full' style={{ gridTemplateColumns: '1fr 1fr' }}>
            {gallery.length > 0 &&
              gallery.map((image, index) => <GalleryImage key={index} url={image.url} notes={image.notes} />)}{' '}
            {!editing && gallery.length <= 0 && (
              <span className='text-neutral-400 col-span-2 text-center'>{LL.utils.none()}</span>
            )}
          </div>
        </div>
=======
        <Gallery
          images={gallery}
          editable={editing}
          addImage={addImage}
          removeImage={removeImage}
          updateImage={updateImage}
        />
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileGallery;
