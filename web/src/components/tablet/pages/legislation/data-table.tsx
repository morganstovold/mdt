<<<<<<< HEAD
import { forwardRef, useState } from 'react';
=======
import { forwardRef, useCallback, useState } from 'react';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataTableToolbar } from './toolbar';
import { Charge } from './store';
import LegislationEditCharge from './LegislationEditCharge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18nContext } from '@/i18n/i18n-react';
<<<<<<< HEAD
=======
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e

interface LegislationTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  func?: Function;
  checked?: { charge: Charge; count: number }[];
  editing?: boolean;
}

export function LegislationTable<TData, TValue>({
  columns,
  data,
<<<<<<< HEAD
=======
  func,
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
  checked,
  editing,
}: LegislationTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { LL } = useI18nContext();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

<<<<<<< HEAD
  return (
    <div className='flex flex-col gap-2 h-full rounded-md border p-2'>
      <DataTableToolbar table={table} />
      <div className='max-h-max overflow-y-auto relative grid grid-cols-4 gap-2'>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const charge = row.original as Charge;
            const Comp = forwardRef<HTMLDivElement>((props, ref) => {
              const isChecked = checked?.find((c) => c.charge.id === charge.id);
              // const checkedCount = isChecked?.count ?? 0;

              return (
                <div
                  {...props}
                  ref={ref}
                  className='flex border p-4 gap-2 h-full'
                  {...(checked &&
                    !isChecked &&
                    {
                      // onClick: () => addCount(charge),
                    })}
                >
=======
  const addCount = useCallback(
    (charge: Charge) => {
      if (!checked) return;
      const index = checked.findIndex((c) => c.charge.id === charge.id);
      let newChecked;
      if (index === -1) {
        newChecked = [...checked, { charge, count: 1 }];
      } else {
        newChecked = [...checked];
        newChecked[index] = { ...newChecked[index], count: newChecked[index].count + 1 };
      }
      func!(newChecked);
    },
    [checked, func],
  );

  const removeCount = useCallback(
    (charge: Charge) => {
      if (!checked) return;
      const newChecked = [...checked];
      const index = newChecked.findIndex((c) => c.charge.id === charge.id);
      if (index !== -1) {
        const item = { ...newChecked[index] };
        item.count--;
        if (item.count === 0) {
          newChecked.splice(index, 1);
        } else {
          newChecked[index] = item;
        }
      }
      func!(newChecked);
    },
    [checked, func],
  );

  return (
    <div className='flex flex-col gap-2 h-full rounded-md border p-2'>
      <DataTableToolbar table={table} />
      {table.getRowModel().rows?.length ? (
        <div className='max-h-max overflow-y-auto relative grid grid-cols-4 gap-2'>
          {table.getRowModel().rows.map((row) => {
            const charge = row.original as Charge;
            const Comp = forwardRef<HTMLDivElement>((props, ref) => {
              const isChecked = checked?.find((c) => c.charge.id === charge.id);
              const checkedCount = isChecked?.count ?? 0;

              return (
                <div {...props} ref={ref} className='flex border p-4 gap-2 h-full'>
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                  <div className='text-sm w-full text-neutral-400'>
                    <div className='flex justify-between items-center text-sm'>
                      {charge.type === '0' && <div className='text-emerald-400'>{LL.legislation.infraction()}</div>}
                      {charge.type === '1' && <div className='text-yellow-400'>{LL.legislation.misdemeanor()}</div>}
                      {charge.type === '2' && <div className='text-red-400'>{LL.legislation.felony()}</div>}
                      <div className='flex gap-2'>
                        ${charge.fine} - {charge.months} Months
                      </div>
                    </div>
                    <div className='text-lg font-normal text-neutral-200 truncate'>{charge.title}</div>
                    <Tooltip delayDuration={400}>
                      <TooltipTrigger>
                        <div className='text-sm text-left line-clamp-2'>{charge.description}</div>
                      </TooltipTrigger>
                      <TooltipContent className='w-3xl' sideOffset={5} side='top'>
                        <div className='text-sm'>{charge.description}</div>
                      </TooltipContent>
                    </Tooltip>
<<<<<<< HEAD
=======
                    {checked && (
                      <div className='flex gap-2 mt-2'>
                        <Button
                          variant='outline'
                          onClick={() => removeCount(charge)}
                          className='font-bold text-neutral-200'
                          size='icon'
                        >
                          <Icons.minus className='h-4 w-4' />
                        </Button>
                        <div className='font-bold text-base upper border h-9 aspect-square flex justify-center items-center'>
                          {checkedCount}
                        </div>
                        <Button
                          variant='outline'
                          onClick={() => addCount(charge)}
                          className='font-bold text-neutral-200'
                          size='icon'
                        >
                          <Icons.plus className='h-4 w-4' />
                        </Button>
                      </div>
                    )}
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
                  </div>
                </div>
              );
            });
<<<<<<< HEAD
            
=======

>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
            return editing && !checked ? (
              // @ts-ignore
              <LegislationEditCharge charge={row.original} key={row.id}>
                <Comp />
              </LegislationEditCharge>
            ) : (
              <Comp key={row.id} />
            );
<<<<<<< HEAD
          })
        ) : (
          <div></div>
        )}
      </div>
=======
          })}
        </div>
      ) : (
        <div className='flex items-center justify-center w-full h-full text-neutral-400'>{LL.utils.no_results()}</div>
      )}
>>>>>>> 2b921bce8915dc91717b2f9bd749a5044c62e40e
    </div>
  );
}
