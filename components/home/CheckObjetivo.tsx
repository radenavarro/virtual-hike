import { usePathFinished } from "@/hooks/home/usePathFinished"
import ConfettiAnimation from "../Confetti"
import { useCallback, useRef, useState } from "react";
import Toast from "react-native-root-toast";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export const CheckObjetivo = () => {
  const { success } = usePathFinished();
  // const success = undefined
  const [modalVisible, setModalVisible] = useState<boolean>(true)

  const theme = useTheme();
  const themedStyles = StyleSheet.create({
    modal: {
      minHeight: 200,
      width: "84%",
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
    <ConfettiAnimation/>
  ).current

  const showFailurePopup = () => {
    return (
      <Modal 
        visible={modalVisible} 
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <View style={themedStyles.modal}>
          <View style={[themedStyles.modalSuperiorBar]}>
            <ThemedText type="subtitle"></ThemedText>
            <TouchableOpacity style={[themedStyles.closeButton]} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} style={[themedStyles.buttonDefaultText]} />
            </TouchableOpacity>
          </View>
          <View style={themedStyles.modalBody}>
            <ThemedText type="title">NO PUDO SER</ThemedText>
            <ThemedText type="subtitle">No has completado el objetivo a tiempo.</ThemedText>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <>
      {success === "si" && showConfetti}
      {success === "no" && showFailurePopup()}
    </>
  )
}