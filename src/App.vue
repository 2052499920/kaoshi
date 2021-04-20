<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
body {
  height: 100%;
}

html,
body,
#app {
  height: 100%;
}

.no_data_txt {
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #c1bfbf;
  line-height: 31px;
  margin-top: 10px;
  text-align: center;
}

.button {
  width: 73px;
  height: 28px;
  background: linear-gradient(
    90deg,
    #517CF7,
    #517EF8
  );
  box-shadow: 1px 3px 5px 1px rgba(9, 65, 255, 0.19);
  border-radius: 3px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #ffffff;
  line-height: 28px;
  text-align: center;
  margin-top: 20px;
  margin-left: 20px;
  cursor: pointer;
  float: left;
}

.center_box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>