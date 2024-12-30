import { usePathFinished } from "@/hooks/home/usePathFinished"
import ConfettiAnimation from "../Confetti"
import { useRef, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export const CheckObjetivo = () => {
  const { success } = usePathFinished();
  // const success = undefined
  const [modalFracasoVisible, setModalFracasoVisible] = useState<boolean>(true)
  const [modalExitoVisible, setModalExitoVisible] = useState<boolean>(false)

  const theme = useTheme();
  const themedStyles = StyleSheet.create({
    modal: {
      minHeight: 200,
      width: "90%",
      margin: "auto",
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 16,
      overflow: "hidden"
    },
    modalSuperiorBar: {
      backgroundColor: theme.colors.button.warning.color,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      color: theme.colors.text,
      padding: 10
    },
    modalSuccessSuperiorBar: {
      backgroundColor: theme.colors.button.success.color,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      color: theme.colors.text,
      padding: 10
    },
    modalSubtitle: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.colors.text,
      textShadowColor: success === "si" ? theme.colors.text : theme.colors.background,
      textShadowRadius: 10,
    },
    modalBody: {
      backgroundColor: theme.colors.background,
      padding: 20,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButton: { 
      width: 48, height: 48, backgroundColor: theme.colors.background,
      display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"
    },
    buttonDefaultText: {
      color: theme.colors.button?.default?.text
    },
  })

  const showConfetti = useRef(
    <ConfettiAnimation onConfettiEnd={() => {setModalExitoVisible(true)}}/>
  ).current

  const showSuccessPopup = () => {
    return (
      <Modal 
        visible={modalExitoVisible} 
        onDismiss={() => setModalExitoVisible(false)}
        onRequestClose={() => setModalExitoVisible(false)}
        transparent
      >
        <View style={themedStyles.modal}>
          <View style={[themedStyles.modalSuccessSuperiorBar]}>
            <ThemedText type="subtitle" style={[themedStyles.modalSubtitle]}>🎉¡CONSEGUIDO!🎉</ThemedText>
            <TouchableOpacity style={[themedStyles.closeButton]} onPress={() => setModalExitoVisible(false)}>
              <Ionicons name="close" size={24} style={[themedStyles.buttonDefaultText]} />
            </TouchableOpacity>
          </View>
          <View style={themedStyles.modalBody}>
            <ThemedText type="subtitle">Has logrado completar la ruta a tiempo. ¡Bien hecho!.</ThemedText>
          </View>
        </View>
      </Modal>
    )
  }

  const showFailurePopup = () => {
    return (
      <Modal 
        visible={modalFracasoVisible} 
        onDismiss={() => setModalFracasoVisible(false)}
        onRequestClose={() => setModalFracasoVisible(false)}
        transparent
      >
        <View style={themedStyles.modal}>
          <View style={[themedStyles.modalSuperiorBar]}>
            <ThemedText type="subtitle" style={[themedStyles.modalSubtitle]}>⌚️ NO PUDO SER ⌚️</ThemedText>
            <TouchableOpacity style={[themedStyles.closeButton]} onPress={() => setModalFracasoVisible(false)}>
              <Ionicons name="close" size={24} style={[themedStyles.buttonDefaultText]} />
            </TouchableOpacity>
          </View>
          <View style={themedStyles.modalBody}>
            <ThemedText type="subtitle">No has completado el objetivo a tiempo. Vuelve a intentarlo.</ThemedText>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <>
      {showSuccessPopup()}{/* Está, pero no visible a menos que se cumpla el objetivo */}
      {success === "si" && showConfetti}
      {success === "no" && showFailurePopup()}
    </>
  )
}