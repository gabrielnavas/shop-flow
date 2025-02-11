import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // ou a biblioteca que você usa

const LoadingIcon = ({ size = 24, color = '#000' }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      rotateAnim.setValue(0);
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
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
    <Animated.View style={{ transform: [{ rotate }], justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="loading1" size={size} color={color} />
    </Animated.View>
  );
};

export default LoadingIcon;
