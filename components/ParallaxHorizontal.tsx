import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  images: string[];
}>;

export default function ParallaxHorizontal({
  children,
  headerImage,
  images
}: Props) {
  return (
    <ThemedView style={styles.container}>
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
