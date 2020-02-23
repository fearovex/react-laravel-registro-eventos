/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';
import AppForgotPassword from './ForgotPassword';
import AppResetPassword from './ResetPassword';

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser,  ...rest}) =>
   <Route
      {...rest}
      render={props =>
         authUser
         ? <Component {...props} />
         : <Redirect
            to={{
                  pathname: '/signin',
                  state: { from: props.location }
               }}
            />}
   />;

class App extends Component {


   render() {
      const { location, match, user } = this.props;
      
      if (location.pathname == '/') {
         if (user === null) {
            return (<Redirect to={'/signin'} />);
         } else {
            return (<Redirect to={/* localStorage.user_dashboard */ "/app/blank"} />);
         }
      }
      return (
        
         <RctThemeProvider>
            <NotificationContainer />
            {console.log(user)}
            <InitialPath
               path={`${match.url}app`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route path="/signup" component={AppSignUp} />
            <Route path="/signin" component={AppSignIn} />
            <Route path="/password/reset" component={AppResetPassword} />
            <Route path="/password/email" component={AppForgotPassword} />
         </RctThemeProvider>
         
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user } = authUser;
   return { user };
};

export default connect(mapStateToProps)(App);
