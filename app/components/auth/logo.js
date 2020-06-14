import React from 'react';
import {View, Image} from 'react-native';
import LoginImage from '../../assets/images/loginPanel.jpg';

const LogoComponent = () => (
  <View style={{alignItems: 'center'}}>
    <Image
      source={LoginImage}
      resizeMode={'contain'}
      style={{
        width: 270,
        height: 150,

        marginBottom: 10,
      }}
    />
  </View>
);
export default LogoComponent;
