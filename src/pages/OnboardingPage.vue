<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Welcome to Our App</h1>
      <p>
        This is the onboarding page. Here you can introduce your app to new
        users.
      </p>
      <ion-button expand="block" @click="goToLogin">Go to Login</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};
</script>
