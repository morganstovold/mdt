<<<<<<< HEAD
import useLegislationStore from './store';
=======
import useLegislationStore, { Charge } from './store';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
import { LegislationTable } from './data-table';
import { columns } from './columns';
import { Icons } from '@/components/icons';

<<<<<<< HEAD
const Legislation: React.FC = () => {
=======
const Legislation: React.FC<{ func?: Function; checked?: { charge: Charge; count: number }[] }> = ({
  func,
  checked,
}) => {
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  const { charges, loading, editing } = useLegislationStore((state) => ({
    charges: state.charges,
    loading: state.loading,
    editing: state.editing,
  }));

  return (
<<<<<<< HEAD
    <div className='h-full'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <Icons.loading className='w-8 h-8 animate-spin' />
        </div>
      )}
      <LegislationTable columns={columns} data={charges} editing={editing} />
=======
    <div className='h-full relative'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-background/70 z-10'>
          <Icons.loading className='w-8 h-8 animate-spin' />
        </div>
      )}
      <LegislationTable columns={columns} data={charges} editing={editing} func={func} checked={checked} />
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    </div>
  );
};

export default Legislation;
