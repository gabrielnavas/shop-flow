import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // ou a biblioteca que você usa

const LoadingIcon = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      rotateAnim.setValue(0);
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000, // duração de 1 segundo
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Icon name="loading1" size={24} color="#fff" />
    </Animated.View>
  );
};


export default LoadingIcon;
