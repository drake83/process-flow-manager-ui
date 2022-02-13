import { CircularProgress } from '@mui/material';
import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./index'),
  module => module.Login,
  {
    fallback: <CircularProgress />,
  },
);
