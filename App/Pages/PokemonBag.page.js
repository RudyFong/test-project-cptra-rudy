import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../State/actions/index.actions';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import MyPokemonComponent from '../Component/PokemonBag.component';
import {getDetailPokemonFromApi, deletePokemonToBag} from '../State/function/generalFunction';

class MyPokemon extends React.Component {
  static propTypes = {
    pokemonListOwn: PropTypes.array,
    goToDetailPoke: PropTypes.func,
    navigation: PropTypes.object,
    funcdeletePokemonToBag:PropTypes.func
  }

  getDetailPoke =(data)=>()=>{
    this.props.goToDetailPoke(data, this.props);
  }
t
  render() {
      const {pokemonListOwn, navigation, funcdeletePokemonToBag} = this.props;
    return (
      <MyPokemonComponent pokemonListOwn={pokemonListOwn} goToDetailPoke={this.getDetailPoke} navigation={navigation} funcdeletePokemonToBag={funcdeletePokemonToBag}/>
    );
  }
}

const mapStateToProps = (state) => {
  const pokemonListOwn = result(state,'mypokemonList', []);
  return {
    pokemonListOwn
  };
};
const mapDispatchToProps = (dispatch) => ({
  goToDetailPoke: (data, navigateOption) => dispatch(getDetailPokemonFromApi(data, navigateOption)),
  funcdeletePokemonToBag: (data) => dispatch(deletePokemonToBag(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);