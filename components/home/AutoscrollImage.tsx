import { ImageError } from "@/errors/Error";
import { useEffect, useRef } from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet, View } from "react-native"
import Animated, { useSharedValue, withRepeat, withTiming, Easing, cancelAnimation } from "react-native-reanimated";

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
    resizeMode = "cover",
    ...restProps
  }: AutoscrollImageProps
) => {
  const translateX = useSharedValue(0)
  const animation = withRepeat(
    withTiming(
      -speed, 
      {
        duration, 
        easing: Easing.linear,
      }
    ),
    -1,
    false,
    () => {}
  )

  useEffect(() => {
    translateX.value = animation
  }, [])

  const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)
  return (
    <View style={[styles.flexHProps, {zIndex, position: "absolute", width: 2048, height: 250}]}>
      <AnimatedBackground 
        source={source}
        resizeMode={resizeMode}
        style={[styles.image, {transform: [{translateX}]}]}
        onError={() => { throw new ImageError('Error al cargar la imagen de fondo') }}
      />
      <AnimatedBackground 
        source={source}
        resizeMode={resizeMode}
        style={[styles.image, {transform: [{translateX}]}]}
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