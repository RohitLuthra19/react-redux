import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';

import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';

const history = createHistory();

export default class App extends React.PureComponent {
    constructor(props){
        super(props);
        state = {
            links: ['Login', 'Register', 'Dashboard'],
        }
    }
    render(){
        const { links } = this.state;
        return( 
            <Router history={history}>
                <div>
                    <Header links={links}/>
                    <div >
                        <Switch>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={Register}/>
                            <Route path='/dashboard' component={Dashboard}/>
                            <Route path='/' component={Dashboard}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

