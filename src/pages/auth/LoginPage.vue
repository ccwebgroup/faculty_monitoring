<template>
  <q-page class="flex flex-center">
    <q-card flat>
      <q-card-section>
        <img
          src="~assets/svg/undraw_teaching.svg"
          alt=""
          style="max-width: 250px"
        />
        <div class="text-subtitle1 text-center text-bold">
          Faculty Monitoring
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="login" class="q-gutter-y-sm">
          <q-input v-model="user.email" placeholder="Email"
            ><template v-slot:prepend><q-icon name="email" /></template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            v-model="user.password"
            placeholder="Password"
            ><template v-slot:prepend><q-icon name="key" /></template>
            <template v-slot:append
              ><q-icon
                @click="isPwd = !isPwd"
                :name="isPwd ? 'visibility_off' : 'visibility'"
            /></template>
          </q-input>
          <q-btn
            type="submit"
            class="full-width q-mt-lg"
            color="primary"
            rounded
            no-caps
            label="Log In"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { reactive, ref } from "vue";

const isPwd = ref(true);
const user = reactive({
  email: "",
  password: "",
});

const login = () => {};
</script>
