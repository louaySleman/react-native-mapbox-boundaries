/* eslint-disable prettier/prettier */
/**
 * react native map boundaries
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import { ThemeProvider } from 'styled-components/native';
 import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
 import defaultTheme, { PRIMARY_COLOR } from './theme';
 import Home from './screens/home';
 
 const STYLES = ['default', 'dark-content', 'light-content'];
 const TRANSITIONS = ['fade', 'slide', 'none'];
 const App = () => {
   const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
   const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);
   
   return (
     <ThemeProvider theme={defaultTheme}>
       <SafeAreaView style={StyleSheet.absoluteFill}>
         <Home />
       </SafeAreaView>
       <StatusBar
         animated
         backgroundColor={PRIMARY_COLOR}
         barStyle={statusBarStyle}
         showHideTransition={statusBarTransition}
       />
     </ThemeProvider >
   );
 }
 export default App;
 