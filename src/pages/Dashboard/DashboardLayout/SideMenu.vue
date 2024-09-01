<template>
  <!-- MENU -->
  <ion-menu content-id="main-content" type="overlay" class="full-width">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button @click="navigateTo('/dashboard/home')">
          <ion-icon slot="start" :icon="homeOutline"></ion-icon>
          Home
        </ion-item>

        <ion-accordion-group>
          <ion-accordion value="health-wellness">
            <ion-item slot="header">
              <ion-icon slot="start" :icon="heartOutline"></ion-icon>
              Health & Wellness
            </ion-item>
            <ion-list slot="content" class="ion-padding-start">
              <ion-item button @click="navigateTo('/dashboard/medical')">
                <ion-icon slot="start" :icon="medkitOutline"></ion-icon>
                Medical
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/dental')">
                <ion-icon slot="start" :icon="heartOutline"></ion-icon>
                Dental
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/vision')">
                <ion-icon slot="start" :icon="eyeOutline"></ion-icon>
                Vision
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/employee-assistance')">
                <ion-icon slot="start" :icon="helpBuoyOutline"></ion-icon>
                Employee Assistance
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/supplemental-benefits')">
                <ion-icon slot="start" :icon="leafOutline"></ion-icon>
                Supplemental Benefits
              </ion-item>
            </ion-list>
          </ion-accordion>

          <ion-accordion value="financial-wellness">
            <ion-item slot="header">
              <ion-icon slot="start" :icon="walletOutline"></ion-icon>
              Financial Wellness
            </ion-item>
            <ion-list slot="content" class="ion-padding-start">
              <ion-item button @click="navigateTo('/dashboard/retirement')">
                <ion-icon slot="start" :icon="cardOutline"></ion-icon>
                Retirement
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/health-savings-account')">
                <ion-icon slot="start" :icon="cashOutline"></ion-icon>
                Health Savings Account
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/flex-spending-account')">
                <ion-icon slot="start" :icon="walletOutline"></ion-icon>
                Flex Spending Account
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/life-and-add')">
                <ion-icon slot="start" :icon="cashOutline"></ion-icon>
                Life and AD&D
              </ion-item>
            </ion-list>
          </ion-accordion>

          <ion-accordion value="life-experiences">
            <ion-item slot="header">
              <ion-icon slot="start" :icon="giftOutline"></ion-icon>
              Life Experiences
            </ion-item>
            <ion-list slot="content" class="ion-padding-start">
              <ion-item button @click="navigateTo('/dashboard/growing-your-family')">
                <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
                Growing Your Family
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/marriage')">
                <ion-icon slot="start" :icon="sparkles"></ion-icon>
                Marriage
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/divorce')">
                <ion-icon slot="start" :icon="documentsOutline"></ion-icon>
                Divorce
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/other-qualifying-events')">
                <ion-icon slot="start" :icon="layersOutline"></ion-icon>
                Other Qualifying Events
              </ion-item>
              <ion-item button @click="navigateTo('/dashboard/change-current-benefits')">
                <ion-icon slot="start" :icon="pencilOutline"></ion-icon>
                Change Current Benefits
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group>

        <ion-item button @click="navigateTo('/dashboard/contact-us')">
          <ion-icon slot="start" :icon="callOutline"></ion-icon>
          Contact Information
        </ion-item>

        <ion-item button @click="navigateTo('/dashboard/benefits')">
          <ion-icon slot="start" :icon="cardOutline"></ion-icon>
          Your Benefits
        </ion-item>

        <ion-item button @click="navigateTo('/dashboard/settings')">
          <ion-icon slot="start" :icon="settingsOutline"></ion-icon>
          Settings
        </ion-item>

        <ion-item button @click="navigateTo('/dashboard/forms')">
          <ion-icon slot="start" :icon="documentOutline"></ion-icon>
          Forms
        </ion-item>

        <ion-item button @click="navigateTo('/dashboard/learning-center')">
          <ion-icon slot="start" :icon="schoolOutline"></ion-icon>
          Learning Center
        </ion-item>

        <ion-item button @click="openLanguageMenu()" class="menu-footer">
          <ion-icon slot="start" :icon="globeOutline"></ion-icon>
          <ion-label>English</ion-label>
          <ion-icon :icon="chevronForward" v-if="isWeb" slot="end"></ion-icon>
        </ion-item>

        <!-- <ion-footer> -->
        <!--   <ion-item button> -->
        <!--     <ion-icon :icon="language" slot="start"></ion-icon> -->
        <!--   </ion-item> -->
        <!-- </ion-footer> -->
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
} from "@ionic/vue";
import {
  homeOutline,
  callOutline,
  settingsOutline,
  heartOutline,
  medkitOutline,
  eyeOutline,
  helpBuoyOutline,
  leafOutline,
  walletOutline,
  giftOutline,
  cardOutline,
  documentOutline,
  schoolOutline,
  cashOutline,
  personAddOutline,
  documentsOutline,
  layersOutline,
  pencilOutline,
  sparkles,
  globeOutline,
  chevronForward,
} from "ionicons/icons";
import { menuController, getPlatforms } from "@ionic/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};
const isWeb = getPlatforms().includes("web");
const openLanguageMenu = () => {
  menuController.open("language-menu");
};
</script>

<style scoped>
ion-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-footer {
  margin-top: auto;
}

.full-width {
  --width: 100%;
}
</style>
