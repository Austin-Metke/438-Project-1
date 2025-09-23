import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function AppLogo() {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.icon}
      />
      <Text style={styles.title}>Portivo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B4C6B', // match your icon's deep blue
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
