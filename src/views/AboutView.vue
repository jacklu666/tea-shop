<template>
  <div class="about">
    <header>
		<div>µÇÂ¼/×¢²á</div>
	</header>
	<section></section>
	<Tabber></Tabber>
  </div>
</template>

<script>
	import Tabber from '@/components/common/Tabbar.vue'
	export default {
	  name: 'AboutView',
	  components:{
		  Tabber
	  }
	}
</script>

<style scoped lang="scss">
	.about{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	header{
		width: 100%;
		height: 4.266667rem;
		background-color: #b0352f;
	}
	section{
		flex: 1;
		overflow: hidden;
	}
</style>