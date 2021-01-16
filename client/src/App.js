import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import AddUser from './components/profiles/AddUser';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Settings from './components/settings/Settings';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddTraining from './components/profile-forms/AddTraining';
import PrivateRoute from './components/routing/PrivateRoute';
import Employees from './components/employees/Employees';
import Profile from './components/profile/Profile';
import Employee from './components/employee/Employee';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './Main.css';

if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Container>
                        <Alert />
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path="/create-profile"
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/edit-profile"
                                component={EditProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/add-training"
                                component={AddTraining}
                            />
                            <PrivateRoute
                                exact
                                path="/settings"
                                component={Settings}
                            />
                            <PrivateRoute
                                exact
                                path="/employees"
                                component={Employees}
                            />
                            <PrivateRoute
                                exact
                                path="/profile/:id"
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path="/add-user"
                                component={AddUser}
                            />
                            <PrivateRoute
                                exact
                                path="/employee/:id"
                                component={Employee}
                            />
                        </Switch>
                    </Container>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
