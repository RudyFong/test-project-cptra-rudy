import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actionCreators from '../State/actions/index.actions';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import PokeDetailComponent from '../Component/PokemonDetail.component';
import {savePokemonToBag} from '../State/function/generalFunction';

class PokeDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    pokemonListOwn: PropTypes.array,
    funcsavePokemonToBag: PropTypes.func
  }


  render() {
      const {navigation, pokemonListOwn=[], funcsavePokemonToBag={}} = this.props;
      const pokeData = result(this.props.route, 'params.finalResult', {});
    return (
      <PokeDetailComponent pokeData={pokeData} navigation={navigation} pokemonListOwn={pokemonListOwn} funcsavePokemonToBag={funcsavePokemonToBag}/>
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
  funcsavePokemonToBag:(data) => dispatch(savePokemonToBag(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeDetailScreen);