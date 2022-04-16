<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card>
      <q-card-section class="text-center">
        <div class="text-h6 q-mb-lg">Crop Photo</div>
        <vue-cropper
          :src="blob"
          :stencil-props="{
            handlers: {},
            movable: false,
            scalable: false,
          }"
          :stencil-size="{
            width: 280,
            height: 280,
          }"
          style="max-height: 400px"
          image-restriction="stencil"
          stencil-component="circle-stencil"
          ref="cropper"
          class="cropper"
        ></vue-cropper>
      </q-card-section>
      <q-card-actions class="q-pb-md" align="center">
        <q-btn
          class="text-bold"
          outline
          padding="xs lg"
          rounded
          no-caps
          label="Cancel"
          @click="onCancelClick"
        />
        <q-btn
          class="text-bold"
          padding="xs xl"
          rounded
          color="primary"
          no-caps
          label="Crop"
          @click="saveCropImage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useDialogPluginComponent } from "quasar";

const $q = useQuasar();
const emit = defineEmits([...useDialogPluginComponent.emits]);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  fileImage: Object,
});
const blob = ref();
onMounted(() => {
  blob.value = URL.createObjectURL(props.fileImage);
});

const cropper = ref();
const onCancelClick = () => onDialogCancel();
const saveCropImage = () => {
  const { canvas } = cropper.value.getResult();
  if (canvas) {
    onDialogOK(canvas);
  }
};
</script>
