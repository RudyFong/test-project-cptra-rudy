import React from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import styles from './PokemonBag.styles';
import {uppercaseFisrtLetter} from '../Utils/transformer.util';
import DeleteIcon from '../Asset/deleteIcon.png';

class HomeScreenComponent extends React.Component {
  static propTypes = {
    pokemonListOwn: PropTypes.array,
    goToDetailPoke: PropTypes.func,
    funcdeletePokemonToBag: PropTypes.func,
    navigation: PropTypes.object
  }

  onDeletePokemon = (nickName) => () => {
    this.props.funcdeletePokemonToBag(nickName);
  }

  renderMappingPokemon = (data) => {
    const {goToDetailPoke = {}} = this.props;
    const namePoke = uppercaseFisrtLetter(result(data, 'name', ''));
    const nickName = result(data, 'nickName', '');
    const UrlImagepoke = result(data, 'imagePoke');
    return (
      <View> 
        <View style={styles.containercollcection}>
          <TouchableOpacity style={styles.containerCard} onPress={goToDetailPoke(data)}>
            <View>
              <View>
                <Text style={styles.nickNameText}>{nickName}</Text>
              </View>
              <View>
                <Text style={styles.pokeNameText}>{namePoke}</Text>
              </View>
              <TouchableOpacity onPress={this.onDeletePokemon(nickName)} style={styles.containerDeletePoke}>
                <Image source={DeleteIcon} style={styles.deletePoke}/>
              </TouchableOpacity>
            </View>
            <View style={styles.containerImage}>
              <Image source={{uri: UrlImagepoke}} style={styles.imagePoke}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  goToHome = () => {
    this.props.navigation.navigate('Home');
  }

  render () {
    const {pokemonListOwn = []} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerNavigation}>
          <TouchableOpacity onPress={this.goToHome}><Text style={styles.navigationnText}>Home</Text></TouchableOpacity>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.titleText}>PokeBag</Text>
        </View>
        {pokemonListOwn.map(this.renderMappingPokemon)}
      </ScrollView>
    );
  }
}





export default HomeScreenComponent;