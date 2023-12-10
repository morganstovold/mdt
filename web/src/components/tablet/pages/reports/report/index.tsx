import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';

import ReportDetails from './ReportDetails';
import ReportGallery from './ReportGallery';
import ReportOfficers from './ReportOfficers';
import ReportOffenders from './ReportOffenders';
import useReportStore from './store';

const Report: React.FC = () => {
  const { value, setValue } = useReportStore((state) => ({
    value: state.value,
    setValue: state.setValue,
  }));

  return (
    <div
      className='grid gap-2 w-full min-h-max'
      style={{ gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: '100%' }}
    >
      <ReportDetails />
      <Separator orientation='vertical' />
      <Accordion value={value} onValueChange={setValue} type='multiple' className='overflow-y-auto overflow-x-hidden'>
        <ReportOfficers />
        <ReportOffenders />
        <ReportGallery />
      </Accordion>
    </div>
  );
};

export default Report;
