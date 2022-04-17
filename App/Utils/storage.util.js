import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  'MYLIST_POKEMON' : 'listpokemonOwn',
};

// // methods for storing and retrieving objects
export const set = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

export const get = (key) => AsyncStorage.getItem(key).then((value) => JSON.parse(value));