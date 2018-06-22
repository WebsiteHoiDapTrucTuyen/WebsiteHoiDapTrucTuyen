<template>
	<div class="col-lg-3 break-word" id="one-tag">
		<div class="media">
			<a href="" ><img :src="sourceImage(user.avatar)" class="rounded-circle mr-3" width="50" height="50"></a>
			<div class="media-body">
				<router-link :to="{ name: 'information-user', params: { id: user.id } }" class="name-list-user">{{ user.name }}</router-link>
				<div class="text-muted info-list-user">
					<span>{{ user.location }}</span>
					<span>Điểm: {{ user.point }}</span>
					<span>Tham gia: {{ user.date.date | moment("DD-MM-YYYY") }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        props: ['user'], 
        methods: {
        	sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
        } 
    }
</script>