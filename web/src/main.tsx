import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/nunito';
import './styles.css';
import './index.css';
import { isEnvBrowser } from './lib/fetchNui.ts';
import TabletContainer from './components/tablet/container.tsx';

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
  root!.style.backgroundImage =
    'url(https://cdn.discordapp.com/attachments/1050556033396908085/1121926630202429542/image.png)';
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TabletContainer />
  </React.StrictMode>,
);
