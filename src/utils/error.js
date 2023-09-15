import Vue from 'vue'

Vue.config.errorHandler = (error) => {
    console.error('errorHandler', error)
}