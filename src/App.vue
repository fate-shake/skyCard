<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body{
  height: 100%;
  width: 100%;
}
blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend, li, ol,p,pre,td,textarea,th,ul{
  margin: 0;
  padding: 0;
}
body{
  font: 12px/1.5 tahoma,arial,"\5b8b\4f53";
  color: #666;
}
p{
	font-size: 14px;
}
#app{
  height: 100%;
  width: 100%;
}
@font-face {
  font-family: 'iconfont';  /* project id 412875 */
  src: url('//at.alicdn.com/t/font_412875_96jno1ell5v78pvi.eot');
  src: url('//at.alicdn.com/t/font_412875_96jno1ell5v78pvi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_412875_96jno1ell5v78pvi.woff') format('woff'),
  url('//at.alicdn.com/t/font_412875_96jno1ell5v78pvi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_412875_96jno1ell5v78pvi.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.el-message-box{
  margin-top: -200px;
}
</style>
