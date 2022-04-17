// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonPage from '../Pages/PokemonList.page';
import PokemonDetailPage from '../Pages/PokemonDetail.page';
import PokemonBag from '../Pages/PokemonBag.page';

const Stack = createNativeStackNavigator();

function  MainRoutes () {
  return (
    <NavigationContainer>
      <Stack.Navigator     
        initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={PokemonPage}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
          name='DetailPokemon'
          component={PokemonDetailPage}
          options={{ title: 'Detail Poke' }}
        />
        <Stack.Screen
          name='MyPokemon'
          component={PokemonBag}
          options={{ title: 'Pokebag' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainRoutes;