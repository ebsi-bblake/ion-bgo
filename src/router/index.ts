import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import DashboardLayout from "@/pages/Dashboard/DashboardLayout/DashboardLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*", // This is the catch-all route
    name: "NotFound",
    redirect: "/",
  },
  {
    path: "/",
    name: "Onboarding",
    component: () => import("@/pages/OnboardingPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        redirect: "/dashboard/home",
      },
      {
        path: "home",
        name: "home",
        component: () => import("@/pages/Dashboard/HomePage.vue"),
      },
      {
        path: "inbox",
        name: "inbox",
        component: () => import("@/pages/Dashboard/InboxPage.vue"),
      },
      {
        path: "contact-us",
        name: "contact-us",
        component: () => import("@/pages/Dashboard/ContactUsPage.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/pages/Dashboard/SettingsPage.vue"),
      },
      {
        path: "to-do-list",
        name: "to-do-list",
        component: () => import("@/pages/Dashboard/ToDoListPage.vue"),
      },
      {
        path: "ai-chat",
        name: "ai-chat",
        component: () => import("@/pages/Dashboard/AiChatPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
