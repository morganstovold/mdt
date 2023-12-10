import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useLegislationStore, { Charge } from './store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import LegislationEditCharge from './LegislationEditCharge';
import { Icons } from '@/components/icons';
import { useI18nContext } from '@/i18n/i18n-react';

const LegislationItems: React.FC<{ func?: Function; checked?: { charge: Charge; count: number }[] }> = ({
  func,
  checked,
}) => {
  const { get, loading, charges, value, editing } = useLegislationStore((state) => ({
    loading: state.loading,
    get: state.get,
    charges: state.charges,
    value: state.value,
    editing: state.editing,
  }));
  useEffect(() => {
    get();
  }, []);
  const [filteredCharges, setFilteredCharges] = useState<Charge[]>([]);
  const { LL } = useI18nContext();

  useMemo(() => {
    const newFilteredCharges = charges.filter((charge) => {
      if (charge.title.toLowerCase().includes(value.toLowerCase())) return true;
      if (charge.fine.toString().includes(value.toLowerCase())) return true;
      if (charge.months.toString().includes(value.toLowerCase())) return true;
      if (
        ['Infraction', 'Misdemeanor', 'Felony'][parseInt(charge.type) ?? 0].toLowerCase().includes(value.toLowerCase())
      )
        return true;
      return false;
    });

    setFilteredCharges(newFilteredCharges);
  }, [charges, value]);

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

  // const removeCount = useCallback(
  //   (charge: Charge) => {
  //     if (!checked) return;
  //     const newChecked = [...checked];
  //     const index = newChecked.findIndex((c) => c.charge.id === charge.id);
  //     if (index !== -1) {
  //       const item = { ...newChecked[index] };
  //       item.count--;
  //       if (item.count === 0) {
  //         newChecked.splice(index, 1);
  //       } else {
  //         newChecked[index] = item;
  //       }
  //     }
  //     func!(newChecked);
  //   },
  //   [checked, func],
  // );

  return (
    <div className='grid grid-cols-4 gap-2 overflow-y-auto h-fit'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-background/70'>
          <Icons.loading className='w-6 h-6 animate-spin' />
        </div>
      )}
      {filteredCharges.map((charge) => {
        const Comp = React.forwardRef<HTMLDivElement>((props, ref) => {
          const isChecked = checked?.find((c) => c.charge.id === charge.id);
          // const checkedCount = isChecked?.count ?? 0;
          return (
            <div
              {...props}
              ref={ref}
              className='flex border p-4 gap-2'
              {...(checked &&
                !isChecked && {
                  onClick: () => addCount(charge),
                })}
            >
              {/* {isChecked && (
                <div className='absolute inset-0 flex gap-2 items-center justify-center bg-background/60'>
                  <Icons.minus onClick={() => removeCount(charge)} className='w-10 h-10 hover:text-neutral-600' />
                  <span className='font-bold text-xl upper'>{checkedCount}</span>
                  <Icons.plus onClick={() => addCount(charge)} className='w-10 h-10 hover:text-neutral-600' />
                </div>
              )}*/}
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
              </div>
            </div>
          );
        });

        return editing && !checked ? (
          <LegislationEditCharge charge={charge} key={charge.id}>
            <Comp />
          </LegislationEditCharge>
        ) : (
          <Comp key={charge.id} />
        );
      })}
    </div>
  );
};

export default LegislationItems;
