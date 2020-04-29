<template>
  <div class="page" style="position:relative;">
    组件开发
  </div>
</template>
<style lang="scss" scoped>
  * {margin: 0; padding: 0; box-sizing: border-box;}
  body {background:white;}
  .page {
    display: flex;
    justify-content: center;
  }
  .parent {
    height: 400px;
    overflow: hidden;
    width: 400px;
    border: 5px solid red;
    box-sizing: border-box;
  }
  .child {
    border: 5px solid green;
    box-sizing: border-box;
  }
  .test {
    height: 100px; width: 100px; border: 1px solid red; position: absolute; top: 0; left: 0; z-index: 1;
  }
  .hide {
    transform: translateX(-9999px);
  }
</style> 