import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import LogInPage from './components/LogInPage.vue'
import ApiTest from './components/ApiTest.vue'


const router = createRouter({
   history: createWebHistory(),
   routes: [
       {path: '/main', component: MainPage},
       {path: '/logIn', component: LogInPage},
       {path: '/test', component: ApiTest},
       
       
   ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')


