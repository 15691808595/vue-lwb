import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import project from '../components/project'
import article from '../components/article'
import person from '../components/person'
import contact from '../components/contact'
import blog from '../components/blog'

import all from '../components/article/all.vue'
import detail from '../components/article/detail.vue'
import postArticle from '../components/article/postArticle.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
        {
      path: '/article',
      name: 'article',
      component: article
    },
        {
      path: '/project',
      name: 'project',
      component: project
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog,
      redirect:'/blog/all',
      children:[
        {
          path:'all',
          component:all
        },
        {
          path:'detail',
          component:detail
        },
        {
          path:'postArticle',
          component:postArticle
        }
      ]
    },
    {
    	path:'/*',
    	redirect:'/home'
    }
  ]
})
