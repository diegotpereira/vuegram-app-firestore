<template>
  <header>
      <section>
          <div class="col1">
              <router-link to="/">
                <h3>Vuegram</h3>
              </router-link>
              <ul class="inline">
                  <li>
                      <router-link to="/">Painel</router-link>
                  </li>
                  <li>
                      <router-link to="/settings">Configurações</router-link>
                  </li>
                  <li><a @click="sair()">Sair</a></li>
              </ul>
          </div>
      </section>
  </header>
</template>

<script>
export default {
    methods: {
        sair() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style>

</style>