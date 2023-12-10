import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { pages } from './pages';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  let path = useLocation().pathname;

  return (
    <div className='flex flex-col w-fit h-full p-4 gap-4 overflow-y-auto'>
      {pages.map((page, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <NavLink
              to={page.path}
              className={cn(
                'flex items-center bg-transparent text-popover-foreground hover:text-muted-foreground focus:text-neutral-600 active:text-neutral-600 p-2 transition-all duration-100',
                path === page.path ? 'text-neutral-600' : undefined,
              )}
            >
              <page.icon />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side='right'>
            {/* replace _ with " " */}
            <p className='capitalize'>{page.name.replace('_', ' ')}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default Sidebar;
