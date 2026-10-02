<script setup lang="ts">
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <button class="theme-toggle" :title="isDark ? '切换到亮色' : '切换到暗色'" @click="toggle">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>
