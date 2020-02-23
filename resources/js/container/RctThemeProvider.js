/**
 * Rct Theme Provider
 */
import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

// App locale
import AppLocale from '../lang';

// themes
import primaryTheme from './themes/primaryTheme';
import darkTheme from './themes/darkTheme';

class RctThemeProvider extends Component {
   render() {
      const { locale, darkMode, rtlLayout, activeTheme, children } = this.props;
      const currentAppLocale = AppLocale[locale.locale];
      // theme changes
      let theme = '';

      if (darkMode) {
         theme = darkTheme
      }
      else{
         theme = primaryTheme
      }
      return (
         <MuiThemeProvider theme={theme}>
            <IntlProvider
               locale={currentAppLocale.locale}
               messages={currentAppLocale.messages}
            >
               <Fragment>
                  {children}
               </Fragment>
            </IntlProvider>
         </MuiThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ settings }) => {
   return settings
}

export default connect(mapStateToProps)(RctThemeProvider);
