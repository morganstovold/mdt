import useGlobalStore, { rankString } from '@/store';
import useTabletStore from './handler';
import { useI18nContext } from '@/i18n/i18n-react';

const Header: React.FC = () => {
  const user = useGlobalStore((state) => state.user);
  const { setTransparent } = useTabletStore((state) => ({
    setTransparent: state.setTransparent,
  }));

  const { LL } = useI18nContext();

  return (
    <div className='p-5' onMouseEnter={() => setTransparent(true)} onMouseLeave={() => setTransparent(false)}>
      <h2 className='text-2xl text-neutral-200 font-bold tracking-tight'>{LL.header.title()}</h2>
      <p className='text-card-foreground/80 font-semibold text-lg capitalize'>
        {LL.header.welcome({ name: `${rankString()} ${user.lastname}` })}
      </p>
    </div>
  );
};

export default Header;
