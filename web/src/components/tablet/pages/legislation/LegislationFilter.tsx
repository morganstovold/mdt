import { Input } from '@/components/ui/input';
import useLegislationStore from './store';
import { sanitizeString } from '@/lib/utils';

const LegislationFilter: React.FC = () => {
  const { value, setValue } = useLegislationStore();
  return (
    <div className="w-[15%]">
      <Input
        value={value}
        onChange={(e) => setValue(sanitizeString(e.target.value))}
        placeholder="Search Charges & Offenses"
      />
    </div>
  );
};

export default LegislationFilter;
