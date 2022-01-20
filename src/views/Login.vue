<template>
  <div id="login">
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
                      <input type="text" placeholder="**********" id="password1" v-model.trim="entrarForm.password" />
                  </div>
                  <button class="button" @click="entrar()">Entrar</button>
                  <div class="extras">
                      <a href="#">Esqueceu a senha?</a>
                      <a href="#">Criar uma conta?</a>
                  </div>
              </form>
              <form action="">
                  <h1>Iniciar</h1>
                  <div>
                      <label for="name">Nome</label>
                      <input type="text" id="nome" placeholder="seu nome" v-model.trim="cadastrarForm.nome" /> 
                  </div>

                   <div>
                      <label for="title">Titulo</label>
                      <input type="text" id="titulo" placeholder="digite um titulo" v-model.trim="cadastrarForm.titulo" />
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
                      <a href="">Volte ao login</a>
                  </div>
              </form>
          </div>
      </section>
  </div>
</template>

<script>
export default {
    data() {
        return {
            entrarForm: {
                email: '',
                password: ''
            },

            cadastrarForm: {
                nome: '',
                titulo: '',
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
                nome: this.cadastrarForm.nome,
                titulo: this.cadastrarForm.titulo
            })
        }
    }
}
</script>

<style>

</style>