import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast'

// import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';

// const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = 'clientSideEmotionCache', pageProps } = props;

  return (
    // <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Toaster position='bottom-center'/>
      </ThemeProvider>
    // </CacheProvider>
  );
};

export default MyApp;

/* import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} >
    <Toaster />
  </Component>
}
 */