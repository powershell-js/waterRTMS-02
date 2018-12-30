<template>
    <div>
        <div id="mapAccuracy" class="mapAccuracy"></div>  
    </div>
</template>
<script>
import manager from '../js/AccuracyFollowing/methods_manager'
export default {
    name:"mapAccuracy",
    data () {
        return {
            maoObj:{}
        }
    },
    mounted () {
        this.loadArcgis ()
    },
    methods: {
        loadArcgis:manager.loadArcgis,
        loading:manager.loading, 
        initMap:manager.initMap, 
    } 
}
</script>
<style scoped>
.mapAccuracy{
    width: 100%;;
     height: 100%; 
    background-color:#eeeeee;
}
</style>


