import { ImageError } from "@/errors/Error";
import { useEffect, useRef } from "react";
import { Animated, Easing, ImageBackground, StyleSheet, View } from "react-native"

type AutoscrollImageProps = {
  zIndex: number;
  source: any;
  duration: number;
  speed: number;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

export const AutoscrollImage = (
  {
    zIndex = 1,
    source,
    duration = 4000,
    speed = 1024,
    resizeMode = "cover"
  }: AutoscrollImageProps
) => {
  const imageRef = useRef(new Animated.Value(0)).current
  const animation = Animated.timing(
    imageRef,
    {
      toValue: -speed,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear
    }
  )

  function move (element: Animated.Value, speed: number = 0) {
    animation.start(() => {
      // Resetear la posición cuando llegue al final, e inmediatamente iniciar la siguiente animación para simular movimiento constante hacia la izquierda
      element.setValue(0);
      move(element, speed);
    })
  }

  useEffect(() => {
    setTimeout(() => {
      move(imageRef, speed)
    }, 100); 
  }, [])

  const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)
  return (
    <View style={[styles.flexHProps, {zIndex, position: "absolute", width: 2048, height: 250}]}>
      <AnimatedBackground 
        source={source}
        resizeMode={resizeMode}
        style={[styles.image, {transform: [{translateX: imageRef}]}]}
        onError={() => { throw new ImageError('Error al cargar la imagen de fondo') }}
      />
      <AnimatedBackground 
        source={source}
        resizeMode={resizeMode}
        style={[styles.image, {transform: [{translateX: imageRef}]}]}
        onError={() => { throw new ImageError('Error al cargar la imagen de fondo') }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexHProps: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  image: {
    flexGrow: 1,
  },
})