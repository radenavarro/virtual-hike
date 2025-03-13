import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { PathSelection } from '@/components/paths/PathSelection';
import { useTemplate } from '@/hooks/useTemplate';
import { TemplatePaths } from '../types';
import History from '@/components/paths/History';

export default function TabTwoScreen() {

  const theme = useTheme()

  const { template } = useTemplate<TemplatePaths>('tabs/paths')

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#65b459', dark: '#15491a' }}
      headerImage={<FontAwesome6 name="person-walking" size={310} color="#65b459" />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{template.header}</ThemedText>
      </ThemedView>
      <ThemedText>{template.descriptionP1Text}</ThemedText>
      <ThemedText>{template.descriptionP2Text}</ThemedText>
      
      <ThemedText type="subtitle">{template.pathSelectText}</ThemedText>
      <PathSelection />

      <ThemedText type="subtitle">{template.viewHistoryText}</ThemedText>
      <History />
      
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
