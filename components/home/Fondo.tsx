import { ReactNode, useEffect, useState } from "react"
import { ThemedView } from "../ThemedView"
import { ImageSourcePropType, StyleSheet } from "react-native"
import { AutoscrollImage } from "./AutoscrollImage"
import { useAppStore } from "@/zustand/useStore"
import { Ruta, SpriteType } from "@/app/types"

/**
 * 
 * @returns 
 */
export const Fondo = ({children}:{children?: ReactNode}) => {
  const [rutaSelecc, setRutaSelecc] = useState<Ruta | undefined>(undefined)

  const uuidRutaSelecc = useAppStore(state => state.selectedRuta);
  const todasLasRutas = useAppStore(state => state.ruta);

  const fondoPorDefecto: SpriteType = {
    skybox: require('@/assets/images/backgrounds/grass/skybox.png'),
    ground: require('@/assets/images/backgrounds/grass/ground.png'),
    overlay: require('@/assets/images/backgrounds/grass/overlay.png'),
  }

  return (
    <ThemedView style={{alignItems: "center"}}>
      <ThemedView 
        style={styles.imageContainer} 
      >
        <AutoscrollImage 
          zIndex={1}
          source={(fondoPorDefecto.skybox) as ImageSourcePropType}
          duration={10240 * 16}
          speed={1024}
          resizeMode={"cover"}
        />
        <AutoscrollImage 
          zIndex={10}
          source={(fondoPorDefecto.ground) as ImageSourcePropType}
          duration={10240 * 2}
          speed={1024}
          resizeMode={"cover"}
        />
        <AutoscrollImage
          zIndex={100}
          source={(fondoPorDefecto.overlay) as ImageSourcePropType}
          duration={10240}
          speed={1024}
          resizeMode={"cover"}
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