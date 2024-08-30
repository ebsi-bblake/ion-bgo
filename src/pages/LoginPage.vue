<template>
  <ion-page :fullscreen="true">
    <ion-content class="ion-padding">
      <ion-toolbar></ion-toolbar>
      <h1>Login</h1>
      <ion-item>
        <ion-label position="floating">Username</ion-label>
        <ion-input v-model="username" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input v-model="password" type="password"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="login">Login</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToolbar,
} from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  // Here you would typically handle the login logic
  console.log("Login with", username.value, password.value);
  router.push("/dashboard");
};
</script>
