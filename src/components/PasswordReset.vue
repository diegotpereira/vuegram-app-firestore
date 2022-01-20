<template>
  <div class="modal">
      <div class="modal-content">
          <div class="close" @click="$emit(close)">Fechar</div>
          <h3>Redefinir senha</h3>
          <div v-if="!exibirSucesso">
              <p>Insira seu e-mail para redefinir sua senha</p>
              <form action="">
                  <input type="email" placeholder="seu@email.com" v-model.trim="email">
              </form>
              <p v-if="erroMsg !== ''" class="error">{{ erroMsg }}</p>
              <button class="button" @click="redefinirSenha()"></button>
          </div>
          <p v-else>Sucesso! Verifique seu e-mail para um link de redefinição.</p>
      </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
export default {
    data() {
        return {
            email: '',
            exibirSucesso: false,
            erroMsg: ''
        }
    },
    methods: {
        async redefinirSenha() {
            this.erroMsg = ''

            try {
                await auth.sendPasswordResetEmail(this.email)
                this.exibirSucesso = true 
            } catch (error) {
                this.erroMsg = error.message
            }
        }
    }
}
</script>

<style>

</style>