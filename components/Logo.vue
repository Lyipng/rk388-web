<template>
  <img
    class="MteaLogo"
    alt="Mtea Logo"
    src="/logo.png"
  >
</template>

<style>
.MteaLogo {
  width: 510px;
  transform: rotateY(360deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
