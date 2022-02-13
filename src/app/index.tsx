/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { LoginPage } from './pages/Login/Loadable';
import { LOGIN } from 'routes';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Process flow Manager"
        defaultTitle="Process flow Manager"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Process flow Manager application" />
      </Helmet>

      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + LOGIN}
          component={LoginPage}
        />
      </Switch>
    </BrowserRouter>
  );
}
