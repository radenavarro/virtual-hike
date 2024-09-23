import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppStore } from '@/zustand/useStore';
import { CustomColors, CustomTheme, Template, TemplateTabLayout } from '../types';
import { useTemplate } from '@/hooks/useTemplate';
import { Theme } from '@react-navigation/native';
import { useTheme } from '@/hooks/useTheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const theme = useTheme()
  const colors = theme.colors
  
  const { template } = useTemplate<TemplateTabLayout>('tabs/layout')

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: template?.homeText,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: template?.configText,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="language"
        options={{
          title: template?.languageText,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'language' : 'language-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
