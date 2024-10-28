import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/backoffice/LoginPage.vue'
import FormationsPage from '../views/backoffice/FormationsPage.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/formations', name: 'formations', component: FormationsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
