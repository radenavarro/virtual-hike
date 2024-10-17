import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

type ConfettiPieceProps = {
  startPos: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CONFETTI_SIZE = 10;
const CONFETTI_COUNT = 100;

const randomColor = () => {
  const colors = ['#ff00ff', '#00ff00', '#ffff00', '#00ffff', '#ff0000'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ConfettiPiece = ({ startPos }: ConfettiPieceProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3000 + Math.random() * 2000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-CONFETTI_SIZE, screenHeight],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startPos, startPos + (Math.random() - 0.5) * 200],
  });

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${360 * (Math.random() > 0.5 ? 1 : -1)}deg`],
  });

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          backgroundColor: randomColor(),
          transform: [{ translateX }, { translateY }, { rotate }],
        },
      ]}
    />
  );
};

const ConfettiAnimation = () => {

  return (
    <View style={StyleSheet.absoluteFill}>
      {[...Array(CONFETTI_COUNT)].map((_, index) => (
        <ConfettiPiece
          key={index}
          startPos={Math.random() * screenWidth}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    zIndex: 1000
  },
});

export default ConfettiAnimation;