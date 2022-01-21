<template>
  <div class="c-modal">
      <div class="c-container">
          <a @click="$emit('fechar')">fechar</a>
          <p>adicionar um comentário</p>
          <form @submit.prevent>
              <textarea v-model.trim="comentario"></textarea>
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
        async addComentario() {
            // criar comentario
            await colecaoComentarios.add({
                criadoEm: new Date(),
                content: this.comentario,
                postagemId: this.postagem.id,
                userId: auth.currentUser.uid,
                userName: this.$store.state.userProfile.name 
            })

            // atualizar contagem de comentários na postagem
            await colecaoPostagens.doc(this.postagem.id).update({
                comentarios: parseInt(this.postagem.comentarios) + 1
            })
        }
    }
}
</script>

<style>

</style>