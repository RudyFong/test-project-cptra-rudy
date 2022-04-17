import * as actionCreators from '../actions/index.actions';
import { isEmpty, result , filter} from 'lodash';
import {set, get, storageKeys} from '../../Utils/storage.util';

export function getPokemonFromApi (name) {
  return (dispatch, getState) => {
    const state = getState();
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0').then((response) => response.json()).then((realResponse) => {
      const finalResult= result(realResponse, 'results', []);
      const nextPage = result(realResponse, 'next', '');
      const previousPage = result(realResponse, 'previous', '');
      dispatch(actionCreators.updatePokemonList(finalResult));
      dispatch(actionCreators.updatePokemonPagination({nextPage, previousPage}));
    }).catch(() => {
      
    });
  };
}

export function getDetailPokemonFromApi (data, navigateOption) {
  return (dispatch, getState) => {
    const state = getState();
    const namePoke = result(data, 'name', '')
    const pagination = 'https://pokeapi.co/api/v2/pokemon/' + namePoke;
    return fetch(pagination).then((response) => response.json()).then((realResponse) => {
      dispatch(navigateOption.navigation.navigate('DetailPokemon', {finalResult: realResponse}));
    }).catch(() => {
    });
  };
}

export function getPokemonFromApiContinue () {
  return (dispatch, getState) => {
    const state = getState();
    const nextPage = result(state, 'pokemonPagination.nextPage', '');
    const currentList = result(state, 'pokemonnList', []);
    return fetch(nextPage).then((response) => response.json()).then((realResponse) => {
      const finalResult= result(realResponse, 'results', []);
      const nextPage = result(realResponse, 'next', '');
      const previousPage = result(realResponse, 'previous', '');
      dispatch(actionCreators.updatePokemonList(finalResult));
      dispatch(actionCreators.updatePokemonPagination({nextPage, previousPage}));
    }).catch(() => {
      
    });
  };
}

export function savePokemonToBag (data) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMyList = isEmpty(result(state, 'mypokemonList', [])) ? [] : result(state, 'mypokemonList', []);
    const finalBagPoke = [data, ...currentMyList];
    dispatch(actionCreators.updateMyPokemonList(finalBagPoke));
    set(storageKeys['MYLIST_POKEMON'], finalBagPoke).catch(() => {
        
    });
 
  };
}
export function loadPokemonToBag () {
  return (dispatch) => {
    get(storageKeys['MYLIST_POKEMON']).then((res) => {
    if(!isEmpty(res)){
      dispatch(actionCreators.updateMyPokemonList(res));
    }
    });
  };
}

export function deletePokemonToBag (nickName) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMyList = isEmpty(result(state, 'mypokemonList', [])) ? [] : result(state, 'mypokemonList', []);
    const existingFilter = filter(currentMyList, function (val) {
      const nickNameTaken = result(val, 'nickName', '');
      return nickNameTaken !== nickName;
    });
    dispatch(actionCreators.updateMyPokemonList(existingFilter));
    set(storageKeys['MYLIST_POKEMON'], existingFilter).catch(() => { 
    });
 
  };
}