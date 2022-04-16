<style lang="sass" scoped>
.camera-btn
  right: -3px
  bottom: 5px
</style>
<template>
  <q-page padding>
    <q-card flat class="q-pa-sm">
      <q-card-section>
        <q-avatar
          class="relative-position"
          size="100px"
          @mouseover="showUploadIcon = true"
          @mouseout="showUploadIcon = false"
        >
          <img
            ref="img_profile"
            :src="
              facultyData.photoURL
                ? facultyData.photoURL
                : 'img/avatar-empty.png'
            "
            alt=""
          />
          <q-file
            class="invisible"
            v-model="fileImage"
            ref="fileInput"
            accept="image/*"
            @rejected="fileInvalid"
            @update:model-value="initCropper"
          />
          <q-btn
            @click="handleFileInput"
            class="camera-btn absolute"
            round
            icon="camera"
            size="sm"
          />

          <q-inner-loading :showing="imgLoading">
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </q-avatar>

        <div class="text-subtitle1 text-bold">
          {{ facultyData.displayName }}
        </div>
        <div class="text-primary text-caption">CCS Instructor</div>
      </q-card-section>
      <!-- Email -->
      <div style="max-width: 280px">
        <q-list dense>
          <q-item>
            <q-item-section avatar><q-icon name="email" /></q-item-section>
            <q-item-section>
              <q-item-label> {{ facultyData.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Mobile Contact -->
          <q-item>
            <q-item-section avatar
              ><q-icon name="phone_android"
            /></q-item-section>
            <q-item-section>
              <q-item-label>{{
                facultyData.phoneNumber
                  ? facultyData.phoneNumber
                  : "not available"
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
// Main imports
import { computed, onBeforeMount, ref } from "vue";
import { useQuasar } from "quasar";
//Components imports
import CropperDialog from "src/components/CropperDialog.vue";
//Composables imports
//Stores imports
import { useFacultyStore } from "src/stores/faculty";
// Define Stores, Composables
const facultyStore = useFacultyStore();
const $q = useQuasar();
// Methods and State

const imgLoading = ref(false);
const cropResultToBlob = ref();
const fileInput = ref();
const fileImage = ref();
const img_profile = ref();
const initCropper = (val) => {
  $q.dialog({
    component: CropperDialog,
    componentProps: {
      fileImage: val,
    },
  })
    .onOk((result) => {
      imgLoading.value = true;

      result.toBlob(async (blob) => {
        const res = await facultyStore.updateFacultyAvatar(blob);
        if (res) {
          img_profile.value.src = URL.createObjectURL(blob);
        }
      }, "image/png");

      setTimeout(() => {
        imgLoading.value = false;
      }, 1500);
    })
    .onCancel(() => {
      fileImage.value = null;
    });
};
const handleFileInput = () => {
  fileInput.value.pickFiles();
};
const fileInvalid = (rejectedEntries) => {
  $q.dialog({
    title: "Try another one",
    message: "File is not a valid image.",
    persistent: true,
  });
};

const facultyData = computed(() => facultyStore.facultyProfile);
onBeforeMount(() => facultyStore.getFacultyProfile());
</script>
