import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useProfileStore from './store';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useI18nContext } from '@/i18n/i18n-react';

const ProfileReports: React.FC = () => {
  const { reports, citizenid, viewReport } = useProfileStore((state) => ({
    reports: state.profile.reports,
    citizenid: state.profile.citizenid,
    viewReport: state.viewReport,
  }));
  const { LL } = useI18nContext();

  return (
    <AccordionItem value='item-3'>
      <AccordionTrigger disabled={!citizenid}>
        <span className='flex gap-1'>
          {LL.pages.reports()}
          <span className='text-neutral-400'>- {reports.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-auto'>ID</TableHead>
              <TableHead className='w-full'>Title</TableHead>
              <TableHead>Officer</TableHead>
              <TableHead className='w-auto'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow {...(report.warrant && { className: 'bg-red-600/20' })} key={index}>
                <TableCell>{report.id}</TableCell>
                <TableCell className='justify-center'>
                  <span className='line-clamp-1'>{report.title}</span>
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {report.officer.firstname} {report.officer.lastname}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='p-2.5'>
                        <Icons.moreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={4} align='end'>
<<<<<<< HEAD
                      <DropdownMenuItem onClick={() => viewReport(report.id)}>{LL.reports.viewReport()}</DropdownMenuItem>
=======
                      <DropdownMenuItem onClick={() => viewReport(report.id)}>{LL.utils.vReport()}</DropdownMenuItem>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {reports.length <= 0 && (
              <TableRow>
                <td colSpan={4} className='text-neutral-400 text-center p-2'>
                  {LL.utils.none()}
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileReports;
