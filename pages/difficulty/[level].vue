<template>
  <div :class="backgroundClass" class="counter-root">
    <!-- Cabeçalho com o nível e as repetições -->
    <div class="header-section">
      <div class="header-title">
        <span>{{ levelTitle }} Level</span>
      </div>
      <div class="repetitions-list">
        <span
          v-for="(rep, index) in repetitions"
          :key="index"
          :class="{
            'completed-rep': index < currentExerciseIndex,
            'current-rep': index === currentExerciseIndex,
            'future-rep': index > currentExerciseIndex,
          }"
          class="rep-item"
        >
          {{ rep }}
        </span>
      </div>
    </div>

    <!-- Seção do descanso -->
    <div v-if="isResting">
      <div class="timer">Rest</div>
      <h2>{{ restTimeLeft }}</h2>
    </div>

    <!-- Seção do contador -->
    <div v-else class="counter-section">
      <h2>{{ currentCount }}</h2>
    </div>

    <!-- Seção do botão Start -->
    <div class="start-button-section">
      <button @click.stop="startCounting" :disabled="isCounting || isResting">
        Start
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

// Pega a rota atual
const route = useRoute();

// Dados de dificuldade
const difficulties = {
  begginer: { title: "Beginners", repetitions: [5, 6, 7, 8], restTime: 3 },
  easy: { title: "Easy", repetitions: [8, 10, 12, 14, 16], restTime: 60 },
  medium: { title: "Medium", repetitions: [10, 12, 14, 16, 18], restTime: 55 },
  intermediate: {
    title: "Intermediate",
    repetitions: [12, 14, 16, 18, 20, 22],
    restTime: 55,
  },
  advanced: {
    title: "Advanced",
    repetitions: [15, 18, 20, 25, 25, 30],
    restTime: 50,
  },
};

// Pega o parâmetro `level` da URL
const level = route.params.level;

// Define os valores da dificuldade
const { title: levelTitle, repetitions, restTime } = difficulties[level] || {};

// Controle do índice do exercício atual
const currentExerciseIndex = ref(0); // Alterar conforme o progresso do exercício

// Dados do contador
const currentCount = ref(0); // Valor do contador
const isCounting = ref(false); // Flag para indicar se está contando
const isResting = ref(false); // Flag para indicar se está no período de descanso
const restTimeLeft = ref(restTime); // Tempo de descanso inicial

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
  if (currentExerciseIndex.value < repetitions.length) {
    isCounting.value = true;
    window.addEventListener("click", incrementCount);
  }
};

// Função para incrementar o contador ao tocar na tela
const incrementCount = () => {
  if (!isCounting.value) return;

  currentCount.value += 1;

  // Verifica se atingiu o valor atual do exercício
  if (currentCount.value >= repetitions[currentExerciseIndex.value]) {
    finishCurrentExercise();
  }
};

// Função para finalizar o exercício atual e iniciar o descanso
const finishCurrentExercise = () => {
  isCounting.value = false;
  currentExerciseIndex.value += 1;

  if (currentExerciseIndex.value < repetitions.length) {
    startRestPeriod();
  } else {
    reset();
  }

  window.removeEventListener("click", incrementCount);
};

// Função para iniciar o período de descanso
const startRestPeriod = () => {
  isResting.value = true;
  restTimeLeft.value = restTime;

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
.default-background {
  background-color: #4caf50;
}

.counting-background {
  background-color: #ff9800;
}

.resting-background {
  background-color: #81d4fa;
}

.counter-root {
  display: grid;
  grid-template-rows: auto 4fr auto;
  height: 100vh;
  width: 100%;
  align-items: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.header-section {
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.header-title {
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  padding: 8px 0;
  background-color: #212121;
  color: #ffffff;
}

.repetitions-list {
  font-size: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  align-items: center;
  justify-items: center;
  background-color: #bdbdbd;
}

.rep-item {
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.completed-rep {
  color: #757575;
}

.current-rep {
  color: #ff9800;
  font-weight: bold;
  background-color: #eeeeee;
}

.future-rep {
  color: #212121;
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
