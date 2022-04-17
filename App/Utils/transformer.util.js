import {upperCase} from 'lodash';

export const uppercaseFisrtLetter = (name='') => {
  const firsTletter = upperCase(name.substring(0, 1));
  const length = name.length;
  const substringOther = name.substring(1,length);
  const finalLetter = firsTletter + substringOther;
  return finalLetter;
};

