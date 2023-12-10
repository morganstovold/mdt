import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useProfileStore from './store';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileConvictions: React.FC = () => {
  const { convictions, citizenid } = useProfileStore((state) => ({
    convictions: state.profile.convictions,
    citizenid: state.profile.citizenid,
    viewReport: state.viewReport,
  }));
  const { LL } = useI18nContext();

  return (
    <AccordionItem value='item-2'>
      <AccordionTrigger disabled={!citizenid}>
        <span className='flex gap-1'>
          {LL.profiles.convictions()}
          <span className='text-neutral-400'>- {convictions.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col gap-2'>
          {convictions.map((conviction) => (
            <div className='flex border p-4 gap-2'>
              <div className='text-sm w-full text-neutral-400'>
                <div className='flex justify-between items-center text-sm'>
                  {conviction.charge.type === '0' && (
                    <div className='text-emerald-400'>{LL.legislation.infraction()}</div>
                  )}
                  {conviction.charge.type === '1' && (
                    <div className='text-yellow-400'>{LL.legislation.misdemeanor()}</div>
                  )}
                  {conviction.charge.type === '2' && <div className='text-red-400'>{LL.legislation.felony()}</div>}
                  <div className='flex gap-2'>x{conviction.count}</div>
                </div>
                <h2 className='text-lg font-normal text-neutral-200 truncate'>{conviction.charge.title}</h2>
                <span>{conviction.charge.description}</span>
              </div>
            </div>
          ))}
          {convictions.length <= 0 && (
            <span className='text-neutral-400 col-span-2 text-center'>{LL.utils.none()}</span>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileConvictions;
