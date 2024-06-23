// src/router/index.js
import Home from '@/components/IntroSection.vue';
import SocialProof from '@/components/SocialProof.vue';
import Features from '@/components/FeaturesPage.vue';
import Process from '@/components/OurProcess.vue';
import Blog from '@/components/BlogPost.vue';
import Contact from '@/components/ContactUs.vue';
import Project from '@/components/ProjectSection.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/social-proof', name: 'SocialProof', component: SocialProof },
    { path: '/features', name: 'Features', component: Features },
    { path: '/process', name: 'Process', component: Process },
    { path: '/blog', name: 'Blog', component: Blog },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/project', name: 'Project', component: Project },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

