import { Separator } from '@/components/ui/separator';
import SearchField from './field';
import SearchResults from './results';

const ReportSearch: React.FC = () => {
  return (
    <div className="w-full grid min-h-max" style={{ gridTemplateRows: 'auto auto 1fr auto' }}>
      <SearchField />
      <Separator className="my-2" />
      <SearchResults />
    </div>
  );
};

export default ReportSearch;
