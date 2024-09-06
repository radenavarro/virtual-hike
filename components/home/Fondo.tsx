import { ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { ThemedView } from "../ThemedView"
import { Animated, StyleSheet, Easing, ImageBackground, Dimensions } from "react-native"
import { ImageError } from "@/errors/Error"

type HikeBg = {
  overlay?: ReactElement,
  skybox?: ReactElement,
  ground?: ReactElement
}

type Bg = {
  [index:string]:HikeBg
}

/**
 * 
 * @param directory 
 * @returns 
 */
export const Fondo = ({children, directory = "grass"}:{children?: ReactNode, directory?:'grass'}) => {

  const skybox = useRef(new Animated.Value(0)).current
  const ground = useRef(new Animated.Value(0)).current
  const overlay = useRef(new Animated.Value(0)).current

  const { width, height } = Dimensions.get('window')

  const duration = 4000
  const scale = Math.ceil(1024 / width) < 1 ? 1 : Math.ceil(1024 / width)

  function move (element: Animated.Value, speed: number) {
    Animated.timing(
      element,
      {
        toValue: -speed,
        duration: 4000,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start(() => {
      // Resetear la posición cuando llegue al final, e inmediatamente iniciar la siguiente animación para simular movimiento constante hacia la izquierda
      element.setValue(0);
      move(element, speed);
    });
  }

  useEffect(() => {
    move(skybox, Math.ceil(duration / 30 * scale));
    move(ground, Math.ceil(duration / 20 * scale));
    move(overlay, Math.ceil(duration / 11 * scale));
  }, []);

  const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)

  const bgs:Bg = {
    grass: {
      skybox: (
        <AnimatedBackground 
          key={'skybox'} 
          source={require('@/assets/images/backgrounds/grass/skybox.png')}
          resizeMode={"repeat"} 
          style={[styles.image, {width: (1024 * 4), transform: [{translateX: skybox}, {scale}]}]}
          onError={() => { throw new ImageError('Error al cargar la imagen de skybox') }}
        />
      ),
      ground: (
        <AnimatedBackground 
          key={'ground'} 
          source={require('@/assets/images/backgrounds/grass/ground.png')}
          resizeMode={"repeat"} 
          style={[styles.image, {width: (1024 * 4), transform: [{translateX: ground}, {scale}]}]}
          onError={() => { throw new ImageError('Error al cargar la imagen de ground') }}
        />
      ),
      overlay: (
        <AnimatedBackground 
          key={'overlay'} 
          source={require('@/assets/images/backgrounds/grass/overlay.png')} 
          resizeMode={"repeat"}
          style={[styles.image, {width: (1024 * 4), transform: [{translateX: overlay}, {scale}]}]}
          onError={() => { throw new ImageError('Error al cargar la imagen de overlay') }}
        />
      )
    }
  }

  const [backgroundImages, setBackgroundImages] = useState<HikeBg>({overlay: undefined, skybox: undefined, ground: undefined})

  useEffect(() => {
    requireImages()
  },[directory])

  function requireImages () {
    let imageSet = {...backgroundImages}
    if (directory) {
      imageSet = bgs[directory]
    }
    
    setBackgroundImages(imageSet)
  }

  return (
    <ThemedView style={{alignItems: "center"}}>
      <ThemedView style={styles.imageContainer}>
        {backgroundImages && Object.entries(backgroundImages).map(([idx, imagen]) => {
          return (imagen)
        })}
      </ThemedView>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    zIndex: 1,
    height: 250,
    bottom: 0
  },
  imageContainer: {
    position: "relative", height: 250, width: 1024, overflow: "hidden", marginHorizontal: 0,
  }
})