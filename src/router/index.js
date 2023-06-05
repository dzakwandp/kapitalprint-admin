// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../layouts/Dashboard.vue'
import Login from '../layouts/Login.vue'

import Home from '../views/Home.vue'
import Product from '../views/Products/MainProduct.vue'
import AddProduct from '../views/Products/AddProduct.vue'
import DetailProduct from '../views/Products/DetailProduct.vue'
import Blog from '../views/Blogs/MainBlog.vue'
import AddPost from '../views/Blogs/AddPost.vue'
import DetailPost from '../views/Blogs/DetailPost.vue'

import { useAuthStore } from '@/store/authStore'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'product',
        name: 'product',
        component: Product
      },
      {
        path: 'addproduct',
        name: 'addproduct',
        component: AddProduct
      },
      {
        path: 'detailproduct/:id',
        name: 'detailproduct',
        component: DetailProduct
      },
      {
        path: 'blog',
        name: 'blog',
        component: Blog
      },
      {
        path: 'addpost',
        name: 'addpost',
        component: AddPost
      },
      {
        path: 'detailpost/:id',
        name: 'detailpost',
        component: DetailPost
      }
    ],
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next)=>{
  const authStore=useAuthStore()
  const isAuth=authStore.isLoggedIn
  if (to.name !== 'login' && !isAuth) next ({name:"login"})
  if (to.name == 'login' && isAuth) next({name:"home"})
  else next()
})
export default router
