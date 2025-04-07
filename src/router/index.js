import { createRouter, createWebHistory } from "vue-router";

// Import the components used in your routes
import IntroSection from "@/components/IntroSection.vue";
import SocialProof from "@/components/SocialProof.vue";
import FeaturesPage from "@/components/FeaturesPage.vue";
import ProcessInt from "@/components/ServiceSection.vue";
import BlogPost from "@/components/BlogPost.vue";
import ContactUs from "@/components/ContactUs.vue";
import Project from "@/components/ProjectSection.vue";
import AboutUs from "@/components/AboutUs.vue";
import Service from "@/components/ServiceSection.vue";
import DetailedBlog1 from "@/components/detailedblogpage/DetailedBlog1.vue";
import EsmartCreatorAIPage from "../components/EsmartCreatorAIPage.vue";import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import { useAuthStore } from '@/stores/auth'

import MarketingAssessment from '@/components/MarketingAssessment.vue';


const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresAuth: false }  
  },
  { path: '/sign-up', name: 'SignUp', component: SignUp,  meta: { requiresAuth: false } },
  { path: "/intro", name: "Intro", component: IntroSection },
  { path: "/social-proof", name: "SocialProof", component: SocialProof },
  { path: "/features", name: "FeaturesPage", component: FeaturesPage },
  { path: "/process", name: "ProcessInt", component: ProcessInt },
  { path: "/blog", name: "BlogPost", component: BlogPost },
  { path: "/contact", name: "ContactUs", component: ContactUs },
  { path: "/project", name: "Project", component: Project },
  { path: "/about-us", name: "AboutUs", component: AboutUs },
  { path: "/service", name: "Service", component: Service },
  {
    path: "/detailed-blog-1",
    name: "DetailedBlog1",
    component: DetailedBlog1,
  },
  {
    path: '/marketing-assessment',
    name: 'MarketingAssessment',
    component: MarketingAssessment,
  },
  {
    path: "/creator-ai",
    name: "EsmartCreatorAI",
    component: EsmartCreatorAIPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: EsmartCreatorAIPage,
  },
  {
    path: "/project/:id",
    name: "ProjectDetail",
    component: EsmartCreatorAIPage,
    props: (route) => ({ id: route.params.id, type: "project" }),
  },
  {
    path: "/content/:id",
    name: "ContentDetail",
    component: EsmartCreatorAIPage,
    props: (route) => ({ id: route.params.id, type: "content" }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { x: 0, y: 0 };
  },
});

// Route navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication status
  const isAuthenticated = authStore.user !== null

  // Handle protected routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login with return URL
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath }
    })
  } 
  // Prevent access to auth pages when already logged in
  else if ((to.name === 'SignIn' || to.name === 'SignUp') && isAuthenticated) {
    next('/intro') // Redirect to main page
  } 
  // Allow access for all other cases
  else {
    next()
  }
})

export default router;
