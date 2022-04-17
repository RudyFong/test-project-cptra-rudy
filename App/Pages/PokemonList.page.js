import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import HomeScreenComponent from '../Component/PokemonList.component';
import {getDetailPokemonFromApi, getPokemonFromApiContinue} from '../State/function/generalFunction';

class HomeScreen extends React.Component {
  static propTypes = {
    pokemonList: PropTypes.array,
    goToDetailPoke: PropTypes.func,
    navigation: PropTypes.object,
    funcgetPokemonFromApiContinue: PropTypes.func,
    pokemonPagination: PropTypes.object
  }

  getDetailPoke = (data) => () => {
    this.props.goToDetailPoke(data, this.props);
  }
t
  render() {
      const {pokemonList, funcgetPokemonFromApiContinue, navigation, pokemonPagination} = this.props;
    return (
      <HomeScreenComponent pokemonList={pokemonList} goToDetailPoke={this.getDetailPoke} getPokemonFromApiContinue={funcgetPokemonFromApiContinue} navigation={navigation}
      pokemonPagination={pokemonPagination}/>
    );
  }
}

const mapStateToProps = (state) => {
  const pokemonList = result(state,'pokemonnList', []);
  const pokemonPagination = result(state,'pokemonPagination', []);
  return {
    pokemonList,
    pokemonPagination
  };
};
const mapDispatchToProps = (dispatch) => ({
  goToDetailPoke: (data, navigateOption) => dispatch(getDetailPokemonFromApi(data, navigateOption)),
  funcgetPokemonFromApiContinue: () => dispatch(getPokemonFromApiContinue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);