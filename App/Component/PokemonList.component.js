import React from 'react';
import {Image, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {result, toLower} from 'lodash';
import styles from './PokemonList.styles';
import {uppercaseFisrtLetter} from '../Utils/transformer.util';

class HomeScreenComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    pokemonList: PropTypes.array,
    goToDetailPoke: PropTypes.func,
    getPokemonFromApiContinue: PropTypes.func,
    pokemonPagination: PropTypes.object
  }
  state={
    filtering: ''
  }

  renderMappingPokemon = (data, i) => {
    const {goToDetailPoke = {}} = this.props;
    const namePoke = uppercaseFisrtLetter(result(data, 'name', ''));
    const indexPoke = String(i + 1);
    // for simple filtering
    const filterName = String(toLower(result(data, 'name', ''))).indexOf(toLower(this.state.filtering));
    const checkFilter = this.state.filtering !== '';
    const indexOffilter = filterName !== -1 && checkFilter;
    const UrlImagepoke = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + indexPoke + '.png';
    if (!checkFilter || indexOffilter) {
      return (
        <View> 
          <View style={styles.containercollcection}>
            <TouchableOpacity style={styles.cardPokedex} onPress={goToDetailPoke(data)}>
              <View>
                <Text style={styles.pokeName}>{namePoke}</Text>
              </View>
              <View>
                <Image source={{uri: UrlImagepoke}} style={styles.pokeImage}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  goTobag = () => {
    this.props.navigation.navigate('MyPokemon');
  }
  
  onChangeText=(nextTexttype) => {
    this.setState({filtering: nextTexttype});
  }
  render () {
    const {pokemonList = [], getPokemonFromApiContinue = {}, pokemonPagination} = this.props;
    const initialNextPage = result(pokemonPagination, 'nextPage', '');
    return (
      <ScrollView contentContainerStyle={styles.bottomContainer} extraHeight={200}>

        <View style={styles.containerNavigation}>
          <View><Text style={styles.navigation}>Home</Text></View>
          <TouchableOpacity onPress={this.goTobag}><Text style={styles.navigation}>Pokebag</Text></TouchableOpacity>
        </View>

        <View style={styles.containerSearch}>
          <View style={styles.containerSearchText}>
            <Text style={styles.searchText}>Search or Filter</Text>
          </View>
          <TextInput
            style={styles.textBoxSearch}
            onChangeText={this.onChangeText} placeholder='search poke by name'
          />
        </View>

        <View style={styles.containerPokeTitle}>
          <Text style={styles.pokeDexTitle}>Pokedex</Text>
        </View>
        <View>
          { pokemonList.map(this.renderMappingPokemon) }
        </View>
        {this.state.filtering !== '' || initialNextPage === '' || initialNextPage === null ? null : 
          <View style={styles.containerButtonShow}>            
            <TouchableOpacity style={styles.buttonShowMore} onPress={getPokemonFromApiContinue}>
              <Text style={styles.showmoreText}>Show More</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    );
  }
}





export default HomeScreenComponent;