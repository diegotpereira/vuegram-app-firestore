<template>
  <div id="app">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'
export default {
    components: {
        SiteNav
    },
    computed: {
        ...mapState(['usuarioPerfil']),
        showNav() {
            return Object.keys(this.usuarioPerfil).length > 1
        }
    }
}
</script>