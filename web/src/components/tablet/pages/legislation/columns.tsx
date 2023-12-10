import { ColumnDef } from '@tanstack/react-table';
import { type Charge } from './store';

export const getChargeType = (type: number) => {
  switch (type) {
    case 0:
      return 'infraction';
    case 1:
      return 'misdemeanor';
    case 2:
      return 'felony';
    default:
      return 'unknown';
  }
};

export const columns: ColumnDef<Charge>[] = [
  {
    accessorKey: 'id',
  },
  {
    accessorKey: 'type',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => getChargeType(row.getValue('type')),
  },
  {
    accessorKey: 'title',
    filterFn: (row, id, value) => {
      return (row.getValue(id) as string).toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: 'description',
    filterFn: (row, id, value) => {
      return (row.getValue(id) as string).toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: 'fine',
  },
  {
    accessorKey: 'months',
  },
];
