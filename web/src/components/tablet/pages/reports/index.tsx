import { Separator } from "@/components/ui/separator";
import Report from "./report";
import ReportSearch from "./search";

const Reports: React.FC = () => {
  return (
    <div
      className="grid h-full overflow-hidden"
      style={{ gridTemplateRows: "1fr", gridTemplateColumns: "25% auto 1fr" }}
    >
      <ReportSearch />
      <Separator className="mx-2" orientation="vertical" />
      <Report />
    </div>
  )
};

export default Reports;
