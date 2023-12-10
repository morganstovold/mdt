import useReportControlsStore from './controls';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
<<<<<<< HEAD
import useGlobalStore, { usePermissions } from '@/store';
import { useMemo } from 'react';
import useReportStore from './store';
import { useI18nContext } from '@/i18n/i18n-react';

const ReportControls: React.FC = () => {
  const { editing, saving, canEdit, edit, cancel, save, newReport, openEvidence } = useReportControlsStore();
  const officers = useReportStore((state) => state.report.officers);
  const cid = useGlobalStore((state) => state.user.citizenid);
  const permitted = usePermissions();
  const { LL } = useI18nContext();

  const isPublisher = useMemo(() => {
    return officers.find((officer) => officer.publisher)?.citizenid === cid;
  }, [officers]);

=======
import { usePermissions } from '@/store';
import { useI18nContext } from '@/i18n/i18n-react';

const ReportControls: React.FC = () => {
  const { editing, saving, canEdit, edit, cancel, save, newReport } = useReportControlsStore();
  const permitted = usePermissions();
  const { LL } = useI18nContext();

>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  return (
    <div className='flex gap-2'>
      {editing || saving ? (
        <>
          <Button className='w-full' variant='outline' onClick={cancel} disabled={saving}>
            {LL.utils.cancel()}
          </Button>
<<<<<<< HEAD
          <Button
            className='w-full'
            variant='outline'
            onClick={openEvidence}
            disabled={saving || (!isPublisher && !permitted('reports.evidence'))}
          >
            {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
            {LL.reports.openEvidence()}
          </Button>
=======
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
          <Button className='w-full' variant='outline' onClick={save} disabled={saving}>
            {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
            {LL.utils.save()}
          </Button>
        </>
      ) : (
        <>
          <Button
            disabled={editing || !canEdit || !permitted('reports.update')}
            className='w-full'
            variant='outline'
            onClick={edit}
          >
            {LL.utils.edit()}
          </Button>
          <Button
            disabled={editing || !permitted('reports.new')}
            className='w-full'
            variant='outline'
            onClick={newReport}
          >
            {LL.reports.new()}
          </Button>
        </>
      )}
    </div>
  );
};

export default ReportControls;
