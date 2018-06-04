<template>
	<div class="documentation-summary">
		<div class="row">
			<div class="col-lg-2">
				<div class="statistic">
					<div class="documentation-favorite">
						<span class="oi oi-heart"></span> {{documentation.voted}}
					</div>
					<div class="documentation-count-views">
						<span>{{documentation.viewed}}</span>
						<div>lượt xem</div>
					</div>
				</div>
			</div>
			<div class="col-lg-10">
				<div class="summary">
					<div class="summary-title">
						<h6>
							<router-link :to="{ name: 'detail-document', params: { id: documentation.id } }">{{documentation.title}}</router-link>
						</h6>
					</div>
					<div class="summary-description">
						{{documentation.summary}}
					</div>
					<div class="list-tag">
						<a v-for="tag in documentation.tags">
							<p class="tag">{{tag.name}}</p>
						</a>
					</div>
					<div class="started col-lg-4">
						<div class="row">
							<p class="user hide-text"><a href="">{{ documentation.user_last_interact.name }}</a></p>
		                    <p class="action">{{ documentation.user_last_interact.interact }}</p>
		                    <p class="time">{{ documentation.user_last_interact.date_interact.date | moment("DD-MM-YYYY") }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br>
	</div>
</template>
<script>
    export default {
        props: ['documentation'],  
    }
</script>
