<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar size="60px">
            <q-icon name="dashboard" />
          </q-avatar>
          {{ $route.name ? $route.name : "" }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item to="/" clickable exact>
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section class="text-subtitle1">Home</q-item-section>
        </q-item>
        <q-item to="/faculty/profile" clickable>
          <q-item-section avatar
            ><q-icon name="account_circle"
          /></q-item-section>
          <q-item-section class="text-subtitle1">Profile</q-item-section>
        </q-item>
        <q-item @click="logout" clickable class="text-negative">
          <q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section class="text-subtitle1">Log Out</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Main imports
//Components imports
//Composables imports
//Stores imports
// Define Stores, Composables

// Main imports
import { ref } from "vue";
//Components imports
//Composables imports
//Stores imports
import { useAuthStore } from "src/stores/auth";
// Define Stores, Composables
const authStore = useAuthStore();
// Other States
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = () => authStore.logOutUser();
</script>
