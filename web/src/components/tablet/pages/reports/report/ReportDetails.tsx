import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Editor from '@/components/tablet/editor';
import useReportStore, { reportMap } from './store';
import useReportControlStore from './controls';
import ReportControls from './ReportControls';
import { sanitizeString2 } from '@/lib/utils';
import { Icons } from '@/components/icons';
import useGlobalStore, { usePermissions } from '@/store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useI18nContext } from '@/i18n/i18n-react';

const ReportDetails: React.FC = () => {
  const [template, setTemplate] = useState('0');
  const { report, setNotes, setTitle, setType, toggleLock } = useReportStore();
  const { editing } = useReportControlStore();
  const templates = useGlobalStore((state) => state.templates);
  const permitted = usePermissions();
  const { LL } = useI18nContext();
  
  return (
    <div className='flex flex-col w-full overflow-hidden h-full gap-2'>
      <div className='flex items-center'>
        <div className='text-xl text-neutral-200 text-center w-full'>
          {report.title.length > 0 ? report.title : 'No Title'} {report.id ? `#${report.id}` : ``}
        </div>
        {report.locked ? (
          <Icons.lock
            onClick={() => (permitted('reports.lock') ? toggleLock() : {})}
            className='w-5 h-5 cursor-pointer text-red-400'
          />
        ) : (
          <Icons.unlock
            onClick={() => (permitted('reports.lock') ? toggleLock() : {})}
            className='w-5 h-5 cursor-pointer'
          />
        )}
      </div>
      <Separator />
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex'>
          <Input
            type='text'
            placeholder={LL.reports.title()}
            value={report.title}
            onChange={(e) => setTitle(sanitizeString2(e.target.value))}
            readOnly={!editing}
            maxLength={50}
          />
        </div>
        <Select defaultValue={report.type} onValueChange={(e) => setType(e)}>
          <SelectTrigger>
            <SelectValue>{report.type}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {reportMap.map((v, key) => (
                <SelectItem key={key} disabled={!editing && report.type !== v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='flex gap-2'>
          <Select defaultValue={template} onValueChange={(e) => setTemplate(e)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {templates.map((v, key) => (
                  <SelectItem key={key} value={String(key)}>
                    Template - {v.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant='outline'
            className='h-full py-0'
            onClick={() => {
              setNotes(templates[Number(template)].template);
            }}
            disabled={!editing}
          >
            {LL.utils.apply()}
          </Button>
        </div>
      </div>
      <Editor onChange={setNotes} editable={editing} content={report.notes} />
      <ReportControls />
    </div>
  );
};

export default ReportDetails;
