<template>
  <div :class="backgroundClass" class="counter-root">
    <!-- Seção dos inputs e timer -->
    <div class="inputs-section">
      <div
        v-for="(val, index) in exerciseArray"
        :key="index"
        class="input-container"
      >
        <input
          v-model="exerciseArray[index]"
          type="number"
          min="1"
          max="100"
          class="exercise-input"
          :disabled="isCounting || isResting"
        />
      </div>
    </div>

    <!-- Seção do descanso -->
    <div>
      <div v-if="isResting" class="timer">Rest: {{ restTimeLeft }}</div>
    </div>
    <!-- Seção do contador -->
    <div class="counter-section">
      <h2>{{ currentCount }}</h2>
    </div>

    <!-- Seção do botão Start -->
    <div class="start-button-section">
      <button @click="startCounting" :disabled="isCounting || isResting">
        Start
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const exerciseArray = ref([10, 10, 10, 10, 10]); // Array inicial com valores 1

const currentCount = ref(0); // Valor do contador
const currentExerciseIndex = ref(0); // Índice do exercício atual
const isCounting = ref(false); // Flag para indicar se está contando
const isResting = ref(false); // Flag para indicar se está no período de descanso
const restTimeLeft = ref(5); // Tempo de descanso inicial (50 segundos)

let restInterval = null; // Intervalo para o descanso

// Computed para determinar a classe de fundo
const backgroundClass = computed(() => {
  if (isResting.value) {
    return "resting-background";
  } else if (isCounting.value) {
    return "counting-background";
  } else {
    return "default-background";
  }
});

// Função para iniciar o contador
const startCounting = () => {
  if (currentExerciseIndex.value < exerciseArray.value.length) {
    isCounting.value = true;
    window.addEventListener("click", incrementCount); // Substitua o 'click' por 'touchstart'
  }
};

// Função para incrementar o contador ao tocar na tela
const incrementCount = () => {
  if (!isCounting.value) return;

  currentCount.value += 1;

  // Verifica se atingiu o valor atual do exercício
  if (currentCount.value >= exerciseArray.value[currentExerciseIndex.value]) {
    finishCurrentExercise();
  }
};

// Função para finalizar o exercício atual e iniciar o descanso
const finishCurrentExercise = () => {
  isCounting.value = false;
  currentExerciseIndex.value += 1;

  if (currentExerciseIndex.value < exerciseArray.value.length) {
    startRestPeriod();
  } else {
    reset();
  }

  window.removeEventListener("click", incrementCount); // Substitua o 'click' por 'touchstart'
};

// Função para iniciar o período de descanso
const startRestPeriod = () => {
  isResting.value = true;
  restTimeLeft.value = 5;

  restInterval = setInterval(() => {
    restTimeLeft.value -= 1;

    if (restTimeLeft.value <= 0) {
      clearInterval(restInterval);
      isResting.value = false;
      currentCount.value = 0; // Reseta o contador para o próximo exercício
      startCounting();
    }
  }, 1000);
};

// Função para resetar o app após terminar o último exercício
const reset = () => {
  currentCount.value = 0;
  currentExerciseIndex.value = 0;
};
</script>

<style scoped>
/* Cor de fundo padrão */
.default-background {
  background-color: #4caf50;
}

/* Cor de fundo quando o contador está ativo */
.counting-background {
  background-color: #ff9800;
}

/* Cor de fundo quando está no período de descanso */
.resting-background {
  background-color: #81d4fa;
}

.counter-root {
  display: grid;
  grid-template-rows: 1fr 1fr 4fr 1fr;
  height: 100vh;
  width: 100vw;
  justify-items: center;
  align-items: center;
}

.inputs-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.exercise-input {
  width: 60px;
  text-align: center;
  font-size: 18px;
}
.timer {
  margin-top: 10px;
  font-size: 20px;
  color: red;
}
.counter-section {
  text-align: center;
  font-size: 6rem;
  margin-bottom: 6rem;
}
.start-button-section {
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
