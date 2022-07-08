import { createApp, h, provide } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global.css';
import './assets/font-color.css';

import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import {GITHUB_TOKEN} from '@/../config'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: 'Bearer ' + GITHUB_TOKEN,
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
    setup(){
        provide(DefaultApolloClient,apolloClient)
    },

    render: () => h(App)
})

app.use(store).use(router).mount('#app')
