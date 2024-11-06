import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, interpolate, useDerivedValue } from 'react-native-reanimated';

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

  const animatedValue = useSharedValue(0)
  const animation = withTiming(
    1, 
    {
      duration: 3000 + Math.random() * 2000, 
      easing: Easing.out(Easing.ease)
    }
  )

  useEffect(() => {
    animatedValue.value = animation
  }, [])

  const translateY = useDerivedValue(() => {
    return interpolate(animatedValue.value, [0, 1], [-CONFETTI_SIZE, screenHeight])
  })

  const initialX = startPos + (Math.random() - 0.5) * screenWidth / 2;// Necesita estar fuera de useDerivedValue para que cada trozo de confeti conserve el valor y no se mueva por toda la pantalla
  const confettiMoveX = (Math.random() - 0.5) * 200;
  const translateX = useDerivedValue(() => {  
    return interpolate(animatedValue.value, [0, 1], [initialX, initialX + confettiMoveX])
  })

  const rotationDeg = 360 * (Math.random() > 0.5 ? 1 : -1)
  const rotate = useDerivedValue(() => {
    return `${interpolate(animatedValue.value, [0, 1], [0, rotationDeg])}deg`
  })

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