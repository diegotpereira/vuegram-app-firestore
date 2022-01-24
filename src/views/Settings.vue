<template>
  <section id="settings">
    <div class="col1">
      <h3>Configurações</h3>
      <p>Atualize seu perfil</p>

      <transition name="fade">
        <p v-if="exibirSucesso" class="success">perfil atualizado</p>
      </transition>

      <form @submit.prevent>
        <label for="nome">Nome</label>
        <input v-model.trim="nome" type="text" :placeholder="usuarioPerfil.nome" id="nome" />

        <label for="titulo">Cargo</label>
        <input v-model.trim="titulo" type="text" :placeholder="usuarioPerfil.titulo" id="titulo" />

        <button @click="alterarPerfil()" class="button">Atualizar perfil</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      nome: '',
      titulo: '',
      exibirSucesso: false
    }
  },
  computed: {
    ...mapState(['usuarioPerfil'])
  },
  methods: {
    alterarPerfil() {
      this.$store.dispatch('alterarPerfil', {
        nome: this.nome !== '' ? this.nome : this.usuarioPerfil.nome,
        titulo: this.titulo !== '' ? this.titulo : this.usuarioPerfil.titulo
      })

      this.nome = ''
      this.titulo = ''

      this.exibirSucesso = true

      setTimeout(() => {
        this.exibirSucesso = false
      }, 2000)
    }
  }
}
</script>
