import React, {useState} from 'react';
import {AppContext} from './AppContext';
import { useColorScheme } from 'react-native';

const AppProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme()==='dark');
  const [loading, setLoading] = useState(false)

  const value = {
    isDarkMode,
    setIsDarkMode : ()=> setIsDarkMode((prevState) => !prevState),
    loading,
    setLoading : ()=> setLoading((prev)=> !prev)
  };

  return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
