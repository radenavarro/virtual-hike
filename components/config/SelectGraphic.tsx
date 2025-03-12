import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, ImageBackground, ImageSourcePropType, LayoutChangeEvent, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { GraphicsDirectory, Split, SpriteType } from "@/app/types";

export const SelectGraphic = (
  {
    options, 
    source, 
    type, 
    labelText = "", 
    resizeMode = "contain",
    alias,
    onSelect = () => {}
  }: {
    options: {[key: string]: {[key: string] : any}}, 
    source: ImageSourcePropType, 
    type: keyof SpriteType, 
    labelText?: string, 
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center',
    alias?: {[key in GraphicsDirectory]: string},
    onSelect?: (directory: keyof SpriteType, source: ImageSourcePropType) => void
  }
) => {
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useTheme();

  const themedStyles = StyleSheet.create({
    modalWrapper: {
      minWidth: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modal: {
      minHeight: "100%",
      width: "100%",
      marginHorizontal: "auto",
    },
    modalSuperiorBar: {
      backgroundColor: theme.colors.card,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      color: theme.colors.text,
      padding: 10,
      height: 64
    },
    buttonDefault: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      fontWeight: "bold",
      backgroundColor: theme.colors.button?.default?.color
    },
    buttonDefaultText: {
      color: theme.colors.button?.default?.text
    },
    buttonSelected: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      fontWeight: "bold",
      backgroundColor: theme.colors.button.success.color
    },
    closeButton: { 
      width: 48, height: 48, backgroundColor: theme.colors.background,
      display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"
    },
    blockSeparator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      paddingTop: 10,
      paddingBottom: 20
    },
  })

  function handleModalClose () {
    setModalVisible(false)
  }

  return (
    <>
      <Modal 
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => handleModalClose()}
      >
        {/* Título */}
        <View style={[themedStyles.modalSuperiorBar]}>
          <ThemedText type="subtitle">Seleccionar gráfico</ThemedText>
          <TouchableOpacity style={[themedStyles.closeButton]} onPress={() => handleModalClose()}>
            <Ionicons name="close" size={24} style={[themedStyles.buttonDefaultText]} />
          </TouchableOpacity>
        </View>
        {/* Contenido */}
        <View style={themedStyles.modalWrapper}>
          {/* Seleccionar key (directorio) */}
          <View style={[styles.elementContainer]}>
            <FlatList 
              data={Object.entries(options)}
              keyExtractor={(item) => item[0]}
              renderItem={({ item }) => {
                const _source = item[1]?.[type]
                const itemAlias: string = alias?.[item[0]] ?? item[0]
                return (
                  <TouchableOpacity
                    style={[styles.roundedButton, themedStyles.buttonDefault, {flexDirection: "row", justifyContent: "space-between"}]}
                    onPress={() => {
                      onSelect(type, _source)
                      handleModalClose()
                    }}
                  >
                    <ThemedText style={[themedStyles.buttonDefaultText]}>{itemAlias}</ThemedText>
                    <ImageBackground style={[styles.thumbnail, {width: 128}]} resizeMode={resizeMode} source={_source}/>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      </Modal>
      {/* Botón que despliega el modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImageBackground style={[styles.thumbnail]} resizeMode={resizeMode} source={source}/>
        <ThemedText>{labelText}</ThemedText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  option: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  submenu: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 1,
    padding: 8
  },
  thumbnail: {
    height: 32
  },
  elementContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    alignItems: 'center'
  },
  roundedButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
    padding: 8
  },
})