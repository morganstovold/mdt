import React from 'react';
import { useI18nContext } from '@/i18n/i18n-react';
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

export type Image = {
  url: string;
  notes: string;
};

type GalleryProps = {
  images: Image[];
  editable: boolean;
  removeImage: (url: string) => void;
  addImage: (values: z.infer<typeof formSchema>) => void;
  updateImage: (values: z.infer<typeof formSchema>, image: Image) => void;
};

const Gallery: React.FC<GalleryProps> = ({ images, editable, removeImage, addImage, updateImage }) => {
  const { LL } = useI18nContext();

  return (
    <div className='flex flex-col gap-2'>
      {editable && <NewImage addImage={addImage} />}
      <div className='grid gap-2 w-full' style={{ gridTemplateColumns: '1fr 1fr' }}>
        {images.length > 0 &&
          images.map((image, index) => (
            <GalleryImage
              key={index}
              image={image}
              editable={editable}
              removeImage={removeImage}
              updateImage={updateImage}
            />
          ))}
        {!editable && images.length <= 0 && (
          <span className='text-neutral-400 col-span-2 text-center'>{LL.utils.none()}</span>
        )}
      </div>
    </div>
  );
};

const formSchema = z.object({
  url: z.string().url(),
  notes: z.string(),
});

const GalleryImage: React.FC<{
  image: Image;
  removeImage: (url: string) => void;
  updateImage: (values: z.infer<typeof formSchema>, image: Image) => void;
  editable: boolean;
}> = React.memo(({ image, removeImage, updateImage, editable }): React.ReactNode => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: image.url,
      notes: image.notes || '',
    },
  });
  const { LL } = useI18nContext();

  React.useEffect(() => {
    form.setValue('url', image.url);
    form.setValue('notes', image.notes);
  }, [image]);

  const onSubmit = React.useCallback(
    (values: z.infer<typeof formSchema>) => {
      updateImage(values, image);
      form.reset();
      setOpen(false);
    },
    [updateImage, image],
  );

  const onRemove = React.useCallback(() => {
    removeImage(image.url);
    form.reset();
    setOpen(false);
  }, [removeImage, image]);

  const onLoaded = React.useCallback(() => {
    setImageLoaded(true);
  }, [image]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild {...(!imageLoaded && { className: 'hidden' })}>
        <div className='flex flex-col gap-2 bg-border/20 rounded-md overflow-hidden'>
          <img
            src={image.url}
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
            {image.notes}
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
                      <Input readOnly={!editable} {...field} />
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
                      <Input readOnly={!editable} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!editable} variant='outline' type='submit'>
                {LL.utils.change()}
              </Button>
            </form>
          </Form>
          <Button disabled={!editable} variant='outline' onClick={onRemove}>
            {LL.utils.remove()}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
});

const NewImage: React.FC<{
  addImage: (values: z.infer<typeof formSchema>) => void;
}> = React.memo(({ addImage }) => {
  const [open, setOpen] = useState(false);
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

export default Gallery;
