import Vue from 'vue';
import Router from 'vue-router';
import Layout from './components/layout/Layout.vue';
import NavbarLayout from './components/layout/NavbarLayout.vue';
// import { camelCase, upperFirst } from 'lodash';

Vue.use(Router);

// // console.log(import);
// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   './routers',
//   // 是否查询其子目录
//   true,
//   /\w+\.(vue|js)$/,
// );
// console.log(requireComponent.keys());
// const routes = requireComponent.keys().map((fileName: string) => {
//   // 获取组件的 PascalCase 命名
//   const componentName = camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'));
//   const routerName = upperFirst(componentName);
//   return {
//     path: '/' + componentName,
//     name: componentName,
//     component: (r: any) => (require as any).ensure([], () => r(require(`./routers/${routerName}.vue`))),
//     // component: () => import(/* webpackChunkName: "group-foo" */ `./routers/${fileName}`),
//   };
// });

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  // routes,
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ './pages/home.vue'),
          meta: {
            title: '首页',
          },
        },
      ],
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './pages/login/login.vue'),
    },
    {
      path: '/user',
      component: NavbarLayout,
      children: [
        {
          path: 'register',
          component: () => import(/* webpackChunkName: "register" */ './pages/login/register.vue'),
          meta: {
            title: '新用户注册',
          },
        },
        {
          path: 'forgetPassword',
          component: () => import(/* webpackChunkName: "forgetPassword" */ './pages/login/forgetPassword.vue'),
          meta: {
            title: '忘记密码',
          },
        },
      ],
    },

  ],
});
