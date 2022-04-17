import React from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView, Modal, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {result, filter, random, size} from 'lodash';
import styles from './PokemonDetail.styles';
import {uppercaseFisrtLetter} from '../Utils/transformer.util';
import PokeBall from '../Asset/Pokeball.png';

class HomeScreenComponent extends React.Component {
  static propTypes = {
    pokeData: PropTypes.object,
    navigation: PropTypes.object,
    pokemonListOwn: PropTypes.array,
    funcsavePokemonToBag: PropTypes.func
  }
  state={
    modalVisibleOne: false,
    modalVisibleTwo: false,
    modalVisibleThree: false,
    valueInput: '',
    errorValue: false,
  }

  catchPokemon=() => {
    const randomNumberChance = random(1);
    if (randomNumberChance === 1) {
      this.setState({modalVisibleTwo: true});
    } else {
      this.setState({modalVisibleOne: true});
    }

  }

  onChangeText=(newInput) => {
    this.setState({valueInput: newInput});
  }

  closeModalOne =() => {
    this.setState({modalVisibleOne: false});
  }

  closeModalTwo =() => {
    this.setState({modalVisibleTwo: false});
  }
  closeModalThree =() => {
    this.setState({modalVisibleThree: false});
  }

  goTobag = () => {
    this.props.navigation.navigate('MyPokemon');
    this.setState({modalVisibleThree: false});
  }

  goToHome = () => {
    this.props.navigation.navigate('Home');
  }

  savePokemon=() => {
    const {pokemonListOwn, pokeData = {}, funcsavePokemonToBag = {}} = this.props;
    const name = result(pokeData, 'name', '');
    const imagePoke = result(pokeData, 'sprites.front_default', '');
    const nickNameRaw = this.state.valueInput;
    const filtername = size(filter(pokemonListOwn, function (val) {
      const nickNameTaken = result(val, 'nickName', '');
      return nickNameTaken === nickNameRaw;
    }));
    if (filtername === 1) {
      this.setState({errorValue: true});
    } else {
      funcsavePokemonToBag({name, imagePoke, nickName: nickNameRaw});
      this.setState({modalVisibleTwo: false});
      this.setState({modalVisibleThree: true});
      this.setState({errorValue: false});
      this.setState({valueInput: ''});
    }

  }
  render () {
    const {pokeData = {}} = this.props;
    const pokeName = uppercaseFisrtLetter(result(pokeData, 'name', ''));
    const typePoke = result(pokeData, 'types', []);
    const imagePoke = result(pokeData, 'sprites.front_default', '');
    const pokeMove = result(pokeData, 'moves', []);
    const disableButton = this.state.valueInput === '';
    return (
      <View>
        <Modal visible={this.state.modalVisibleOne} animationType='fade'
          transparent={true} >
          <View style={styles.containerModalOne}>
            <View style={styles.containerModalInnerOne}>
              <View style={styles.containerOneBox}>
                <View style={styles.missBoxText}>
                  <Text style={styles.missText}>Sorry, Lady luck not in your side!</Text>
                </View>
                <TouchableOpacity style={styles.buttonBoxOne} onPress={this.closeModalOne}>
                  <Text style={styles.buttonBoxOneText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


        <Modal visible={this.state.modalVisibleTwo} animationType='fade'
          transparent={true} >
          <View style={styles.containerModalTwo}>
            <View style={styles.containerModalInnerTwo}>
              <View style={styles.containerBoxGot}>
                <Text style={styles.gotText}>Gotcha!</Text>
              </View>
              <View style={styles.nickNameContainer}>
                <View style={styles.nickNameBox}>
                  <Text>Now enter your {pokeName} nickname </Text>
                </View>
                <TextInput
                  style={styles.textinputGotstyle}
                  onChangeText={this.onChangeText} placeholder='Give nickname your pokemon'
                />
              </View>
              {this.state.errorValue && <View style={styles.errorContainer}><Text style={styles.errorText}>Nickname already exist, use different name</Text></View>}
              <View style={styles.buttonBoxTwoContainer}>
                <TouchableOpacity style={styles.buttonBoxTwo}  onPress={this.savePokemon} disabled={disableButton}>
                  <Text style={styles.buttonBoxTwoText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


        <Modal visible={this.state.modalVisibleThree} animationType='fade'
          transparent={true} >
          <View style={styles.containerModalThree}>
            <View style={styles.containerModalInnerThree}>
              <View style={styles.containerBoxThreeWrapper}>
                <View style={styles.conatinerBoxThreeTitle}>
                  <Text style={styles.conatinerBoxThreeTitleText}>Your Pokemon is safe and sound in your PokeBag.</Text>
                </View>
                <View style={styles.containerWrapperButtonBoxThree}>
                  <View style={styles.buttonOneBoxThreeContainer}>
                    <TouchableOpacity style={styles.buttonOneBoxThree} onPress={this.closeModalThree}>
                      <Text style={styles.buttonOneBoxThreeText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonTwoBoxThreeContainer}>
                    <TouchableOpacity style={styles.buttonTwoBoxThree} onPress={this.goTobag}>
                      <Text style={styles.buttonTwoBoxThreeText}>See PokeBag</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView contentContainerStyle={styles.containerScrollview}>
          <View style={styles.containerNavigation}>
            <TouchableOpacity onPress={this.goToHome}><Text style={styles.buttonHomeText}>Home</Text></TouchableOpacity>
            <TouchableOpacity onPress={this.goTobag}><Text style={styles.buttonBagText}>Pokebag</Text></TouchableOpacity>
          </View>
          <View style={styles.containerPokeName}>
            <Text style={styles.pokeNameText}>{pokeName}</Text>
          </View>
          <View style={styles.containerTypePoke}>
            {typePoke.map((value, i) => (
              <View key={i} style={styles.containBoxTypePoke}>
                <Text style={styles.pokeTypeText}>{result(value, 'type.name', '')}</Text>
              </View>
            ))
            }
          </View>
          <View style={styles.containerImagePoke}>
            <Image source={{uri: imagePoke}} style={styles.imagePokeStyle}/>   
          </View>
          <View style={styles.containerMoves}>
            <View style={styles.moveTitleBox}><Text style={styles.moveTitleStyle}>Moves</Text></View>
            <View style={styles.variantMoveBox}>
              {pokeMove.map((value, i) => (
                <View key={i} style={styles.boxcontainMoves}>
                  <Text style={styles.variantMoveText}>{result(value, 'move.name', '')}</Text>
                </View>
              ))
              }
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.containerBoxCatchPoke} onPress={this.catchPokemon}>
          <Image source={PokeBall} style={styles.pokeBallStyle}/>
        </TouchableOpacity>
      </View>
    );
  }
}





export default HomeScreenComponent;