import { StyleSheet, Platform } from 'react-native';

import { Pasos } from '@/components/home/Pasos';
import { Fondo } from '@/components/home/Fondo';

export default function HomeScreen() {
  return (
    <Fondo>
      <Pasos/>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
