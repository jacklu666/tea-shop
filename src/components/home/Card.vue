<template>
	<div class="title">
		<slot>
			<span>爆款推荐</span>
		</slot>
	</div>
</template>

<script>
</script>

<style scoped>
	.title{
		padding: 0.266667rem 0;
		width: 100%;
		text-align: center;
		font-size: 0.426667rem;
	}
	
	.title span{
		position: relative;
	}
	
	.title span::after{
		content:"";
		position: absolute;
		width: 0.213333rem;
		height: 0.213333rem;
		border-radius: 50%;
		display: block;
		background-color: #d4c0a7;
		top: 50%;
		margin-top: -4px;
		right: -0.5rem;
	}
	
	.title span::before{
		content:"";
		position: absolute;
		width: 0.213333rem;
		height: 0.213333rem;
		border-radius: 50%;
		display: block;
		background-color: #d4c0a7;
		top: 50%;
		margin-top: -4px;
		left: -0.5rem;
	}
</style>