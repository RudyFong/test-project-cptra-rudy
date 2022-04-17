import {createAction} from 'redux-actions';

// ==================
//  ACTION CONSTANTS
// ==================
// FEEDBACK Action constants

// save pokemon list
export const SAVE_POKEMON_LIST = 'SAVE_POKEMON_LIST';
export const CLEAR_POKEMON_LIST = 'CLEAR_POKEMON_LIST';

// save pokemon pagination
export const SAVE_POKEMON_PAGINATION = 'SAVE_POKEMON_PAGINATION';
export const CLEAR_POKEMON_PAGINATION = 'CLEAR_POKEMON_PAGINATION';

// save to my bag pokemon
export const SAVE_MYPOKEMON_LIST = 'SAVE_MYPOKEMON_LIST';
export const CLEAR_MYPOKEMON_LIST = 'CLEAR_MYPOKEMON_LIST';


// =================
//  ACTION CREATORS
// =================


// action save list pokemon
export const updatePokemonList = createAction(SAVE_POKEMON_LIST);
export const clearPokemonList = createAction(CLEAR_POKEMON_LIST);

// action save pagination pokemon
export const updatePokemonPagination = createAction(SAVE_POKEMON_PAGINATION);
export const clearPokemonPagination = createAction(CLEAR_POKEMON_PAGINATION);

// action save to bag
export const updateMyPokemonList = createAction(SAVE_MYPOKEMON_LIST);
export const clearMyPokemonList = createAction(CLEAR_MYPOKEMON_LIST);


