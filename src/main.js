import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import LogInPage from './components/LogInPage.vue'
import ApiTest from './components/ApiTest.vue'
import RegisterPage from './components/RegisterPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const router = createRouter({
   history: createWebHistory(),
   routes: [
       {path: '/', redirect: '/logIn'},
       {path: '/main', component: MainPage},
       {path: '/logIn', component: LogInPage},
       {path: '/test', component: ApiTest},
       {path: '/register', component: RegisterPage},
       {path: '/profile', component: ProfilePage}
       
       
   ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')


