import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import TypesafeI18n from '@/i18n/i18n-react';
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import useGlobalStore from '@/store';
import { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';

const TabletProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { language } = useGlobalStore((state) => ({
    language: state.language,
  }));

  const [localesLoaded, setLocalesLoaded] = useState(false);
  useEffect(() => {
    loadLocaleAsync(language).then(() => setLocalesLoaded(true));
  }, [language]);

  if (!localesLoaded) {
    return null;
  }

  return (
    <>
      <TooltipProvider delayDuration={400}>
        <TypesafeI18n locale={language}>
          <HashRouter>{children}</HashRouter>
        </TypesafeI18n>
      </TooltipProvider>
      <Toaster />
    </>
  );
};

export default TabletProviders;
