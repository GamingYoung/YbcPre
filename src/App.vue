<template>
  <nav>
    <router-link to="/view1">View1</router-link> |
    <router-link to="/view2">View2</router-link> |
    <router-link to="/view3_1">View3_1</router-link> |
    <router-link to="/view3_2">View3_2</router-link> |
    <router-link to="/view3_3">View3_3</router-link> |
    <router-link to="/view4">View4</router-link> |
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
