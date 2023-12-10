import { Icons } from '@/components/icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/components/ui/data-table/data-faceted-filter';
import { usePermissions } from '@/store';
import useLegislationStore from './store';
import LegislationAddCharge from './LegislationAddCharge';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const types = [
  {
    value: '0',
    label: 'Infraction',
  },
  {
    value: '1',
    label: 'Misdemeanor',
  },
  {
    value: '2',
    label: 'Felony',
  },
];

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
<<<<<<< HEAD
  const { editing, saving, edit, cancel, save } = useLegislationStore();
=======
  const { editing, saving, edit, cancel, save, get, loading } = useLegislationStore();
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  const permitted = usePermissions();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter Legislation ...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('title')?.setFilterValue(event.target.value);
<<<<<<< HEAD
            // table.getColumn('description')?.setFilterValue(event.target.value);
          }}
          className='w-[150px] lg:w-[250px]'
        />
=======
          }}
          className='w-[150px] lg:w-[250px]'
        />
        <Button variant='outline' disabled={loading || editing} onClick={get} size='icon'>
          {loading ? <Icons.loading className='h-4 w-4 animate-spin' /> : <Icons.folderSync className='h-4 w-4' />}
        </Button>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
        {table.getColumn('type') && (
          <DataTableFacetedFilter column={table.getColumn('type')} title='Type' options={types} />
        )}
        {isFiltered && (
          <Button variant='outline' onClick={() => table.resetColumnFilters()}>
            Reset
            <Icons.close className='ml-2 h-4 w-4' />
          </Button>
        )}
        {editing || saving ? (
          <>
            <Button variant='outline' onClick={cancel} disabled={saving}>
              Cancel
            </Button>
            <LegislationAddCharge />
            <Button variant='outline' onClick={save} disabled={saving}>
              {saving && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
              Save
            </Button>
          </>
        ) : (
          <Button disabled={editing || !permitted('legislation.update')} variant='outline' onClick={() => edit()}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
