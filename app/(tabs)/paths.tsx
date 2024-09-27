import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppStore } from '@/zustand/useStore';
import { useTheme } from '@/hooks/useTheme';
import { PathSelection } from '@/components/paths/PathSelection';

export default function TabTwoScreen() {

  const theme = useTheme()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#65b459', dark: '#15491a' }}
      headerImage={<FontAwesome6 name="person-walking" size={310} color="#65b459" />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rutas</ThemedText>
      </ThemedView>
      <ThemedText>Selecciona o deselecciona una ruta entre las que ya hay añadidas.</ThemedText>
      <ThemedText>¿No has creado o configurado una ruta?. Ve a la sección "Configurar" y hazlo allí.</ThemedText>
      
      <ThemedText type="subtitle">Selección de ruta</ThemedText>

      <PathSelection />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
