<template>
  <div class="c-modal">
      <div class="c-container">
          <a @click="$emit('close')">fechar</a>
          <p>adicionar um comentário</p>
          <form @submit.prevent>
              <textarea v-model.trim="comentario"></textarea>
              <button @click="adicionarComentario()" :disabled="comment == ''" class="button">Adicione Comentário</button>
          </form>
      </div>
  </div>
</template>

<script>
import { colecaoComentarios, colecaoPostagens, auth } from '@/firebase'
export default {
    props: ['postagem'],
    data() {
        return {
            comentario: ''
        }
    },
    methods: {
        async adicionarComentario() {
            // criar comentario
            await colecaoComentarios.add({
                criadoEm: new Date(),
                content: this.comentario,
                postagemId: this.postagem.id,
                usuarioId: auth.currentUser.uid,
                usuarioNome: this.$store.state.usuarioPerfil.nome 
            })

            // atualizar contagem de comentários na postagem
            await colecaoPostagens.doc(this.postagem.id).update({
                comentarios: parseInt(this.postagem.comentarios) + 1
            })

            // fechar modal
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>