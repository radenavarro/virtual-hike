import { FlatList, TouchableOpacity, View, StyleSheet, useWindowDimensions, Modal } from "react-native"
import { ThemedText } from "../ThemedText"
import { useTheme } from "@/hooks/useTheme"
import { useAppStore } from "@/zustand/useStore"
import dayjs from "dayjs"
import { useState } from "react"

export const PathSelection = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [pathHelper, setPathHelper] = useState<string>("")
  
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
      console.log("seleccion nueva ruta")
      setStartingDate(dayjs().format('DD-MM-YYYY HH:mm'))
    } else {
      console.log("deseleccionar")
      setStartingDate(undefined)
    }
    setPathSteps(0)
    setModalVisible(false)
    setPathHelper("")
  }

  const themedStyles = StyleSheet.create({
    pathBox: {
      borderColor: theme.colors.border,
      width: Math.floor(dimensions.width / 2) - 36,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    pathBoxSelected: {
      backgroundColor: theme.colors.button.success.color,
    },
    buttonDefault: {
      flex: 1,
      backgroundColor: theme.colors.button.default.color,
      padding: 8,
      borderColor: theme.colors.button.default.disabledText,
      borderWidth: 1,
      borderRadius: 8
    },
    buttonDefaultText: {
      color: theme.colors.button.default.text,
      textAlign: 'center',
    },
    buttonPrimary: {
      flex: 1,
      backgroundColor: theme.colors.button.primary.color,
      padding: 8,
      borderColor: theme.colors.button.primary.disabledText,
      borderWidth: 1,
      borderRadius: 8
    },
    buttonPrimaryText: {
      color: theme.colors.button.primary.text,
      textAlign: 'center',
    }
  })

  function confirmChangeToPath(uuid: string) {
    setModalVisible(true)
    setPathHelper(uuid)
  }

  return (
    <View>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        transparent
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            width: '100%',
            height: '100%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginVertical: 'auto',
            }}
          >
            <View
              style={{
                padding: 16,
              }}
            >
              <ThemedText>¿Seguro que deseas cambiar de ruta?</ThemedText>
              <ThemedText>Se reiniciaran los pasos recorridos en la ruta actual.</ThemedText>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                gap: 32,
              }}
            >
              <TouchableOpacity
                style={themedStyles.buttonDefault}
                onPress={() => {
                  setModalVisible(false)
                  setPathHelper("")
                }}
              >
                <ThemedText type="defaultSemiBold" style={themedStyles.buttonDefaultText}>No</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyles.buttonPrimary}
                onPress={() => {
                  handleSelectPath(pathHelper)
                }}
              >
                <ThemedText type="defaultSemiBold" style={themedStyles.buttonPrimaryText}>Si</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={allPaths}
        style={{ minHeight: 100 }}
        keyExtractor={(item) => item.uuid}
        numColumns={dimensions.width >= 768 ? 4 : 2}
        columnWrapperStyle={{gap: 8}}
        renderItem={({ item }) => (
          // TODO: Preguntar si está seguro de seleccionar o deseleccionar ruta, ya que la que pudiera haber seleccionada se reseteará, perdiendo todo el progreso
          <TouchableOpacity style={[styles.pathBox, themedStyles.pathBox, selectedPath === item.uuid && themedStyles.pathBoxSelected]} onPress={() => confirmChangeToPath(item.uuid)}>
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