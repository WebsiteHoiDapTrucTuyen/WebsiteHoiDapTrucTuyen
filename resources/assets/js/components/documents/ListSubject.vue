<template>
	<option :value='subject.id'>
     	{{ subject.name }}
    </option>
</template>
<script>
    export default {
        props: ['subject'],  
    }
</script>