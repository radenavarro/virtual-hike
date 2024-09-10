import { ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { ThemedView } from "../ThemedView"
import { Animated, StyleSheet, Easing, ImageBackground, Dimensions, View } from "react-native"
import { ImageError } from "@/errors/Error"
import { AutoscrollImage } from "./AutoscrollImage"

/**
 * 
 * @returns 
 */
export const Fondo = ({children}:{children?: ReactNode}) => {

  return (
    <ThemedView style={{alignItems: "center"}}>
      <ThemedView 
        style={styles.imageContainer} 
      >
        <AutoscrollImage 
          zIndex={1}
          source={require('@/assets/images/backgrounds/grass/skybox.png')}
          duration={10240 * 16}
          speed={1024}
          resizeMode={"cover"}
        />
        <AutoscrollImage 
          zIndex={10}
          source={require('@/assets/images/backgrounds/grass/ground.png')}
          duration={10240 * 2}
          speed={1024}
          resizeMode={"cover"}
        />
        <AutoscrollImage
          zIndex={100}
          source={require('@/assets/images/backgrounds/grass/overlay.png')}
          duration={10240}
          speed={1024}
          resizeMode={"contain"}
        />
        
      </ThemedView>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flexHProps: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start"
  },
  image: {
    height: 250,
    width: 1024,
  },
  imageContainer: {
    position: "relative", height: 250, width: 1024, overflow: "hidden", marginHorizontal: 0,
  }
})