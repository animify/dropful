import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './modules/History';
import Home from './pages/home/Home';
import tracker from './modules/tracker';

const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={tracker(Home)} />
    </Router>
);

export default Routes;
