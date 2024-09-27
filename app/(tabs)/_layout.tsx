import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import {  TemplateTabLayout } from '../types';
import { useTemplate } from '@/hooks/useTemplate';
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
        name="paths"
        options={{
          title: template?.pathsText,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'footsteps' : 'footsteps-outline'} color={color} />
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
