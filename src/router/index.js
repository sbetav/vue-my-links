import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../layouts/HomeLayout.vue";
import HomeView from "../views/HomeView.vue";
import LoginLayout from "../layouts/LoginLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import SetUsernameLayout from "../layouts/SetUsernameLayout.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/explore",
      name: "explore",
      component: HomeLayout,
      children: [
        {
          path: "/explore",
          name: "explore",
          component: () => import("../views/ExploreView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/LoginView.vue"),
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: LoginLayout,
      children: [
        {
          path: "/register",
          name: "register",
          component: () => import("../views/RegisterView.vue"),
        },
      ],
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: LoginLayout,
      children: [
        {
          path: "/forgot-password",
          name: "forgot-password",
          component: () => import("../views/ForgotPassView.vue"),
        },
      ],
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/dashboard/DashboardView.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard/preview",
      name: "preview",
      component: DashboardLayout,
      children: [
        {
          path: "/dashboard/preview",
          name: "preview",
          component: () => import("../views/dashboard/PreviewView.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard/set-username",
      name: "set-username",
      component: SetUsernameLayout,
      children: [
        {
          path: "/dashboard/set-username",
          name: "set-username",
          component: () => import("../views/dashboard/SetUsernameView.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:username",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      props: true,
    },
    {
      path: "/not-found",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener();
      resolve(user);
    });
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else if (to.path === "/login" && (await getCurrentUser())) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
