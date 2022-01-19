<template>
  <div id="login">
      <section>
          <div class="col1">
              <h1>Vuegram</h1>
                <p>Bem vindo a <a href="#" target="_blank">DTP Software</a> com exemplo de aplicativo da Web de mídia social desenvolvido com Vue.js e Firebase.
                    Criei este projeto consultando o Guia definitivo de introdução ao Vue.js</p>
          </div>
          <div class="col2">
              <form>
                  <h1>Bem vindo de volta</h1>
                  <div>
                      <label for="email1">E-mail</label>
                      <input type="text" placeholder="seu@email.com" id="email1" />
                  </div>
                  <div>
                      <label for="password1">Senha</label>
                      <input type="text" placeholder="**********" id="password1" />
                  </div>
                  <button class="button">Entrar</button>
                  <div class="extras">
                      <a href="#">Esqueceu a senha?</a>
                      <a href="#">Criar uma conta?</a>
                  </div>
              </form>
              <form action="">
                  <h1>Iniciar</h1>
                  <div>
                      <label for="name">Nome</label>
                      <input type="text" id="" placeholder="seu nome">
                  </div>

                   <div>
                      <label for="title">Titulo</label>
                      <input type="text" id="title" placeholder="digite um titulo">
                  </div>

                  <div>
                      <label for="email2">Titulo</label>
                      <input type="text" id="email2" placeholder="seu@email.com">
                  </div>

                  <div>
                      <label for="password2">Senha</label>
                      <input type="password" id="password2" placeholder="minimo 6 caracteres">
                  </div>
                  <button class="button">Cadastrar-se</button>
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

}
</script>

<style>

</style>