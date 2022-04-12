<template>
  <q-page padding class="flex">
    <q-card flat class="q-pa-sm">
      <q-card-section>
        <q-avatar size="100px">
          <img src="~assets/img/avatar-empty.png" alt="" />
        </q-avatar>
        <div class="text-subtitle1 text-bold">Dexter G. Dandan</div>
        <div class="text-primary text-caption">CCS Instructor</div>
      </q-card-section>
      <!-- Email -->
      <q-list dense>
        <q-item>
          <q-item-section avatar><q-icon name="email" /></q-item-section>
          <q-item-section>
            <q-item-label>dexter@me.com</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Mobile Contact -->
        <q-item>
          <q-item-section avatar
            ><q-icon name="phone_android"
          /></q-item-section>
          <q-item-section>
            <q-item-label>+63 9954517845</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-section>
        <div class="text-subtitle2 text-bold">Address</div>
        <div class="text-body3">San Carlos City, Negros Occ.</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup></script>
