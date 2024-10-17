import { ImageError } from "@/errors/Error";
import { useEffect, useRef } from "react";
import { Animated, Easing, ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native"

type AutoscrollImageProps = {
  zIndex: number;
  source: ImageSourcePropType;
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
  const animation = useRef(Animated.loop(
    Animated.timing(
      imageRef,
      {
        toValue: -speed,
        duration: duration,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ), {iterations: -1}
  )).current

  function move (element: Animated.Value, speed: number = 0) {
    animation.start()
  }

  useEffect(() => {
    console.log("cambia source")
    animation.stop()
    imageRef.setValue(0)
    move(imageRef, speed)
  }, [source])

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