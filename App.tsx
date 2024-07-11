/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';

const App = ()=>{
  try{
    return(
      <AppNavigation/>
    ) 
  }catch(e){
    console.log("Error from app root", e)
  }
}


export default App;
