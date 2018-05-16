<template>
	<div class="col-lg-3 break-word" id="one-tag">
		<div class="card-deck" style="height:">
			<div class="card">
				<div class="card-body">
					<div class="card-title">
						<div class="tag-item ToolTip">
							<a href="">
								<button class="btn btn-tag">
									{{ tag.name}} <span class="badge badge-pill badge-primary">x{{ tag.count }}</span>
								</button>
							</a>
							<div class="show-hide">
								<div class="head-popup">
									<p><span class="oi oi-eye"></span></span></p>
									<p>{{ tag.question_used }}</p>
									<p class="header-popup-question mr-2">Questions</p>
									<p>{{ tag.documentation_used }}</p>
									<p class="header-popup-question mr-2">Documents</p>
									<p class="header-popup-info float-right">
										<span class="oi oi-star"></span>
										<span class="oi oi-star" style="color: yellow;"></span>
										<span class="oi oi-star" style="color: yellow;"></span>
										<span class="oi oi-star" style="color: yellow;"></span>
										<span class="oi oi-star" style="color: yellow;"></span>
									</p>
								</div>
								<div class="body-popup">
									<p>{{ tag.description }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="card-text card-text-height">
						<p class="tag-description line-clamp">{{ tag.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        props: ['tag'],  
    }
</script>