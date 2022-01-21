<template>
  <div id="dashboard">
      <transition name="fade">
          <CommentModal v-if="exibirComentarioModal" :postagem="selecionarPost" @close="alternarComentarioModal()"></CommentModal>
      </transition>
      <section>
          <div class="col1">
              <div class="profile">
                  <h5>{{ usuarioPerfil.nome }}</h5>
                  <p>{{ usuarioPerfil.titulo }}</p>
                  <div class="create-post">
                      <p>criar uma postagem</p>
                      <form @submit.prevent>
                          <textarea v-model.trim="postagem.content"></textarea>
                          <button @click="criarPostagem()" :disabled="postagem.content === ''" class="button">postagem</button>
                      </form>
                  </div>
              </div>
          </div>
          <div class="col2">
              <div v-if="postagens.length">
                  <div v-for="postagem in postagens" :key="postagem.id" class="post">
                      <h5>{{ postagem.usuarioNome }}</h5>
                      <span>{{ postagem.criadaEm | formatDate }}</span>
                      <p>{{ postagem.content | trimLength }}</p>
                      <ul>
                          <li><a @click="alternarComentarioModal(postagem)">Comentários {{ postagem.comentarios }}</a></li>
                          <li><a @click="curtirPost(postagem.id, postagem.curtidas)">curtidas {{ postagem.curtidas }}</a></li>
                          <li><a @click="exibirPost(postagem)">ver postagem completa</a></li>
                      </ul>
                  </div>
              </div>
              <div v-else>
                  <p class="no-results">No momento não há postagens</p>
              </div>
          </div>
      </section>

      <!--full post modal-->
      <transition name="fade">
          <div v-if="exibirPostModal" class="p-modal">
              <div class="p-container">
                  <a class="close" @click="fecharPostModal()">fechar</a>
                  <div class="post">
                      <h5>{{ completoPostagem.usuarioNome }}</h5>
                      <span>{{ completoPostagem.criadoEm | formatDate }}</span>
                      <p>{{ completoPostagem.content }}</p>
                      <ul>
                          <li><a>comentários {{ completoPostagem.comentarios }}</a></li>
                          <li><a>curtidas {{ completoPostagem.curtidas }}</a></li>
                      </ul>
                  </div>
                  <div v-show="postagemComentarios.length" class="comments">
                      <div class="comment" v-for="comentario in postagemComentarios" :key="comentario.id">
                          <p>{{ comentario.usuarioNome }}</p>
                          <span>{{ comentario.criadoEm | formatDate }}</span>
                          <p>{{ comentario.content }}</p>
                      </div>
                  </div>
              </div>
          </div>
      </transition>
  </div>
</template>

<script>
import CommentModal from '@/components/CommentModal'
import { mapState} from 'vuex'
import moment from 'moment'
import { colecaoComentarios } from '@/firebase'

export default {
    components: {
        CommentModal
    },
    data() {
        return {
            postagem: {
                content: ''
            },

            exibirComentarioModal: false,
            selecionarPostagem: {},
            exibirPostModal: false,
            completoPost: {},
            postagemComentarios: []
        }
    },
    computed: {
        ...mapState(['usuarioPerfil', 'postagens'])
    },
    methods: {

        criarPostagem() {
            this.$store.dispatch('criarPostagem', { content: this.postagem.content })
            this.postagem.content = ''
        },

        alternarComentarioModal(postagem) {
            this.exibirComentarioModal = !this.exibirComentarioModal

            // se estiver abrindo o conjunto modal selecionarPostagem, 
            // caso contrário, desmarque
            if (this.exibirComentarioModal) {
                this.selecionarPostagem = postagem
            } else {
                this.selecionarPostagem = {}
            }
        },
        curtirPostagem(id, curtidasContagem) {
            this.$store.dispatch('curtirPostagem', { id, curtidasContagem })
        },
        async exibirPostagem(postagem) {

            const docs = await colecaoComentarios.where('postagemId', '==', postagem.id).get()

            docs.forEach(doc => {
                let comentario = doc.data()
                comentario.id = doc.id 
                this.postagemComentarios.push(comentario)
            })
            this.completoPost = []
            this.exibirPostModal = true 
        },

        fecharPostModal() {
            this.postagemComentarios = []
            this.exibirPostModal = false
        }
    },
    filters: {
        formatDate(val) {
            if (!val) {
                
                '-'
            }
            let data = val.toDate()

            return moment(data).fromNow()
        },

        trimLength(val) {
            if(val.length < 200) { return val }
            return `${val.substring(0, 200)}...`
        }
    }
}
</script>

<style>

</style>