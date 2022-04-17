import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import pokemonnList from './pokemonList.reducer';
import pokemonPagination from './pokemonPagination.reducer';
import mypokemonList from './myPokemonList.reducer';

const appReducers = combineReducers({
  form: formReducer,
  pokemonnList,
  pokemonPagination,
  mypokemonList
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
