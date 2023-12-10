import useOfficerStore from './store';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

const OfficerReports: React.FC = () => {
  const { officer, viewReport } = useOfficerStore((state) => ({
    officer: state.officer,
    viewReport: state.viewReport,
  }));

  return (
    <AccordionItem value='item-3'>
      <AccordionTrigger disabled={officer.citizenid === ''}>
        <span className='flex gap-1'>
          Published Reports<span className='text-neutral-400'>- {officer.reports.length}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-auto'>ID</TableHead>
              <TableHead className='w-full'>Title</TableHead>
              <TableHead className='w-auto'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {officer.reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.id}</TableCell>
                <TableCell className='justify-center'>
                  <span className='line-clamp-1'>{report.title}</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='p-2.5'>
                        <Icons.moreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={4} align='end'>
                      <DropdownMenuItem onClick={() => viewReport(report.id)}>View Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {officer.reports.length <= 0 && (
              <TableRow>
                <td colSpan={4} className='text-neutral-400 text-center p-2'>
                  No Reports
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default OfficerReports;
