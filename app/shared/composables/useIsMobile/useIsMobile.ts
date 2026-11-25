export const useIsMobile = () => {
  const isMobile = ref(false);

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 768;
  }

  onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIsMobile);
  });

  return readonly(isMobile);
}