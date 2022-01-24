<template>
  <div id="login">
      <PasswordReset v-if="exibirSenhaRedefinir" @close="alternarRedefinicaoSenha()"></PasswordReset>
      <section>
          <div class="col1">
              <h1>Vuegram</h1>
                <p>Bem vindo a <a href="#" target="_blank">DTP Software</a> com exemplo de aplicativo da Web de mídia social desenvolvido com Vue.js e Firebase.
                    Criei este projeto consultando o Guia definitivo de introdução ao Vue.js</p>
          </div>
          <div class="col2" :class="{ 'signup-form': !exibirEntrarForm }">
              <form v-if="exibirEntrarForm" @submit.prevent>
                  <h1>Bem vindo de volta</h1>
                  <div>
                      <label for="email1">E-mail</label>
                      <input type="text" placeholder="seu@email.com" id="email1" v-model.trim="entrarForm.email" />
                  </div>
                  <div>
                      <label for="password1">Senha</label>
                      <input type="password" placeholder="**********" id="password1" v-model.trim="entrarForm.password" />
                  </div>
                  <button class="button" @click="entrar()">Entrar</button>
                  <div class="extras">
                      <a @click="alternarRedefinicaoSenha()">Esqueceu a senha?</a>
                      <a @click="alternarForm()">Criar uma conta?</a>
                  </div>
              </form>
              <form v-else @submit.prevent>
                  <h1>Iniciar</h1>
                  <div>
                      <label for="name">Nome</label>
                      <input type="text" id="name" placeholder="seu nome" v-model.trim="cadastrarForm.name" /> 
                  </div>

                   <div>
                      <label for="title">Titulo</label>
                      <input type="text" id="title" placeholder="digite um titulo" v-model.trim="cadastrarForm.title" />
                  </div>

                  <div>
                      <label for="email2">Email</label>
                      <input type="text" id="email2" placeholder="seu@email.com" v-model.trim="cadastrarForm.email" />
                  </div>

                  <div>
                      <label for="password2">Senha</label>
                      <input type="password" id="password2" placeholder="minimo 6 caracteres" v-model.trim="cadastrarForm.password" />
                  </div>
                  <button class="button" @click="cadastrar()">Cadastrar-se</button>
                  <div class="extras">
                      <a @click="alternarForm()">Volte ao login</a>
                  </div>
              </form>
          </div>
      </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
export default {
    components: {
        PasswordReset
    },
    data() {
        return {
            entrarForm: {
                email: '',
                password: ''
            },

            cadastrarForm: {
                name: '',
                title: '',
                email: '',
                password: ''
            },
            exibirEntrarForm: true,
            exibirSenhaRedefinir: false
        }
    },
    methods: {
        alternarForm() {
            this.exibirEntrarForm = !this.exibirEntrarForm
        },
        alternarRedefinicaoSenha() {
            this.exibirSenhaRedefinir = !this.exibirSenhaRedefinir
        },
        entrar() {
            this.$store.dispatch('entrar', {
                email: this.entrarForm.email,
                password: this.entrarForm.password
            })
        },
        cadastrar() {
            this.$store.dispatch('cadastrar', {
                email: this.cadastrarForm.email,
                password: this.cadastrarForm.password,
                name: this.cadastrarForm.name,
                title: this.cadastrarForm.title
            })
        }
    }
}
</script>

<style>

</style>