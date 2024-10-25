import { FlatList, TouchableOpacity, View, StyleSheet, useWindowDimensions } from "react-native"
import { ThemedText } from "../ThemedText"
import { useTheme } from "@/hooks/useTheme"
import { useAppStore } from "@/zustand/useStore"
import dayjs from "dayjs"

export const PathSelection = () => {
  
  const theme = useTheme()
  const dimensions = useWindowDimensions()

  // STORE
  const allPaths = useAppStore(state => state.ruta)
  const selectedPath = useAppStore(state => state.selectedRuta)
  const selectPath = useAppStore(state => state.setSelectedRuta)
  const setStartingDate = useAppStore(state => state.setInicioRuta)
  const setPathSteps = useAppStore(state => state.setPasosRuta)

  const handleSelectPath = (uuid: string) => {
    let selection = undefined
    if (selectedPath !== uuid) {
      selection = uuid
    }
    selectPath(selection)
    if (selection) {
      setStartingDate(dayjs().format('DD-MM-YYYY HH:mm'))
    } else {
      setStartingDate(undefined)
      setPathSteps(0)
    }
  }

  const themedStyles = StyleSheet.create({
    pathBox: {
      borderColor: theme.colors.border,
      width: Math.floor(dimensions.width / 2) - 32,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    pathBoxSelected: {
      backgroundColor: theme.colors.button.success.color,
    }
  })

  return (
    <View>
      <FlatList
        data={allPaths}
        style={{ minHeight: 100 }}
        keyExtractor={(item) => item.uuid}
        numColumns={dimensions.width >= 768 ? 4 : 2}
        columnWrapperStyle={{gap: 8}}
        renderItem={({ item }) => (
          // TODO: Preguntar si está seguro de seleccionar o deseleccionar ruta, ya que la que pudiera haber seleccionada se reseteará, perdiendo todo el progreso
          <TouchableOpacity style={[styles.pathBox, themedStyles.pathBox, selectedPath === item.uuid && themedStyles.pathBoxSelected]} onPress={() => handleSelectPath(item.uuid)}>
            <ThemedText type="default">{ item.nombre }</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pathBox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
  }
})