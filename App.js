import React from "react";


import Todo from './components/Todo'
import Home from './components/Home'
import Main from './components/Main'

import {createStackNavigator} from 'react-navigation'


const App  = createStackNavigator({
  Main: Main,
  HomeScreen: Home,
  TodoScreen: Todo,
},
{
  navigationOptions : {
    header: null
  },
},
)

export default App
