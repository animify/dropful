import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './modules/History';
import RootPage from './pages/root/RootPage';
import tracker from './modules/tracker';

const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={tracker(RootPage)} />
    </Router>
);

export default Routes;
