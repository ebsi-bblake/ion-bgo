<template>
  <ion-page>
    <ion-header>
      <ion-toolbar id="dashboard-ion-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title title="logo" class="ion-text-center">
          <ion-img class="logo-img" :src="logoIcon"></ion-img>
        </ion-title>

        <ion-buttons v-if="!showTabs" slot="secondary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="primary">
          <ion-button id="notifications-button" href="/dashboard/to-do-list">
            <ion-icon
              slot="icon-only"
              id="notifications-icon"
              :icon="notificationsOutline"
            ></ion-icon>
            <ion-badge id="notifications-badge" color="danger">1</ion-badge>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <!-- Floating Action Button (FAB) in the center -->
    <ion-fab vertical="bottom" horizontal="start" slot="fixed">
      <ion-fab-button id="ai-fab-btn">
        <ion-icon icon=""></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-footer v-if="showTabs">
      <ion-toolbar>
        <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button class="ai-container" tab="ai">
              <ion-icon class="ai-focus" />
            </ion-tab-button>
            <ion-tab-button tab="home" href="/dashboard/home">
              <ion-icon :icon="homeOutline" />
              <ion-label>Home</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="inbox" href="/dashboard/inbox">
              <ion-icon :icon="mailOutline" />
              <ion-label>Inbox</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="contact-us" href="/dashboard/contact-us">
              <ion-icon :icon="callOutline" />
              <ion-label>Contact Us</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="settings" href="/dashboard/settings">
              <ion-icon :icon="settingsOutline" />
              <ion-label>Settings</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>

    <!-- MENU -->
    <ion-menu content-id="main-content">
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
              <ion-list slot="content">
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
                <ion-item
                  button
                  @click="navigateTo('/dashboard/employee-assistance')"
                >
                  <ion-icon slot="start" :icon="helpBuoyOutline"></ion-icon>
                  Employee Assistance
                </ion-item>
                <ion-item
                  button
                  @click="navigateTo('/dashboard/supplemental-benefits')"
                >
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
              <ion-list slot="content">
                <ion-item button @click="navigateTo('/dashboard/retirement')">
                  <ion-icon slot="start" :icon="cardOutline"></ion-icon>
                  Retirement
                </ion-item>
                <ion-item
                  button
                  @click="navigateTo('/dashboard/health-savings-account')"
                >
                  <ion-icon slot="start" :icon="cashOutline"></ion-icon>
                  Health Savings Account
                </ion-item>
                <ion-item
                  button
                  @click="navigateTo('/dashboard/flex-spending-account')"
                >
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
              <ion-list slot="content">
                <ion-item
                  button
                  @click="navigateTo('/dashboard/growing-your-family')"
                >
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
                <ion-item
                  button
                  @click="navigateTo('/dashboard/other-qualifying-events')"
                >
                  <ion-icon slot="start" :icon="layersOutline"></ion-icon>
                  Other Qualifying Events
                </ion-item>
                <ion-item
                  button
                  @click="navigateTo('/dashboard/change-current-benefits')"
                >
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
        </ion-list>

        <ion-list>
          <ion-item button @click="openLanguageMenu">
            <ion-icon slot="start" :icon="globeOutline"></ion-icon>
            English
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Right Side Language Menu -->
    <ion-menu side="end" menu-id="language-menu" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-toggle menu="language-menu">
              <ion-icon :icon="arrowBackOutline"></ion-icon>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title>Language</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item button>
            <ion-img slot="start" src="/path/to/us-flag.png"></ion-img>
            English
          </ion-item>
          <ion-item button>
            <ion-img slot="start" src="/path/to/mx-flag.png"></ion-img>
            Spanish
          </ion-item>
          <ion-item button>
            <ion-img slot="start" src="/path/to/fr-flag.png"></ion-img>
            French
          </ion-item>
          <ion-item button>
            <ion-img slot="start" src="/path/to/nl-flag.png"></ion-img>
            Dutch
          </ion-item>
          <ion-item button>
            <ion-img slot="start" src="/path/to/ht-flag.png"></ion-img>
            Haitian Creole
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- tabs displayed here / -->
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";
import {
  IonAccordion,
  IonAccordionGroup,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonMenu,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonRouterOutlet,
  IonMenuToggle,
  IonImg,
  IonBadge,
  IonFab,
  IonFabButton,
  menuController,
} from "@ionic/vue";
import {
  homeOutline,
  mailOutline,
  callOutline,
  personCircle,
  notificationsOutline,
  search,
  settingsOutline,
  // centerButtonIcon,
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
  // closeOutline,
  arrowBackOutline,
} from "ionicons/icons";
// import { Plugins } from "@capacitor/core";
// const route  useRoute();
const router = useRouter();
import logoIcon from "./1024.png";

// Inject the screenWidth provided by App.vue
const screenWidth = inject("screenWidth", ref(window.innerWidth));

// Computed property to determine whether to show tabs
const showTabs = computed(() => {
  return screenWidth.value <= 768; // Example: show tabs if width >= 768px
});

const openLanguageMenu = () => {
  menuController.open("language-menu");
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style lang="css">
.dropdown-menu {
  position: absolute;
  top: 56px;
  /* Adjust based on your toolbar height */
  right: 16px;
  /* Align with the ellipses button */
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 4px;
}

#notification-button {
  position: relative;
  /* width: 42px; */
  top: 1px;
  right: 1px;
  overflow: visible !important;
}

#notifications-icon {
  width: 128px;
}

#notifications-badge {
  background-color: maroon;
  position: absolute;
  width: 18px;
  top: -3px;
  right: -3px;
  border-radius: 100%;
}

.logo-img {
  height: 68px;
  width: 256px;
}

#ai-fab-btn {
  width: 76px;
  height: 76px;
}

#dashboard-ion-toolbar {
  --min-height: 100px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}
</style>
