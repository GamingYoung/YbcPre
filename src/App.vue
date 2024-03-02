<template>
  <nav>D3：
    <router-link to="/view1">平行坐标图</router-link> |
    <router-link to="/view1_1">玫瑰图</router-link> |
    <router-link to="/view2">雷达图</router-link> |
    <router-link to="/view3_1">树状图</router-link> |
    <router-link to="/view3_2">转换矩阵图</router-link> |
    <router-link to="/view3_3">层次圆环图</router-link> |
    <router-link to="/view4">时序差分折线图</router-link>
    <br>
    Vega-Lite:
    <router-link to="/vegaChart">柱状图</router-link>
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
