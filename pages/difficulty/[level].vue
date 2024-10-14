<template>
  <div :class="backgroundClass" class="counter-root">
    <!-- Cabeçalho com o nível e as repetições -->
    <div class="header-section">
      <div class="header-title">
        <button @click.stop="backToMain" class="header-button">
          <svg
            width="36px"
            height="36px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <span>{{ levelTitle }} Level</span>
        <button
          class="header-button"
          @click.stop="startCounting"
          :disabled="isCounting || isResting"
          :class="{ 'button-disabled': isCounting || isResting }"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
              fill="currentColor"
            />
          </svg>
        </button>
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

    <div v-if="isResting" class="counter-section">
      <div class="timer">REST</div>
      <h2>{{ restTimeLeft }}</h2>
    </div>

    <div v-else class="counter-section">
      <h2>{{ currentCount }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const difficulties = {
  begginer: { title: "Beginners", repetitions: [4, 6, 8, 10], restTime: 90 },
  easy: { title: "Easy", repetitions: [8, 10, 12, 14, 16], restTime: 80 },
  medium: { title: "Medium", repetitions: [10, 12, 14, 16, 18], restTime: 70 },
  intermediate: {
    title: "Intermediate",
    repetitions: [12, 14, 16, 18, 20],
    restTime: 65,
  },
  advanced: {
    title: "Advanced",
    repetitions: [15, 20, 30, 25, 20, 15],
    restTime: 55,
  },
};

const level = route.params.level;

const { title: levelTitle, repetitions, restTime } = difficulties[level] || {};

const currentExerciseIndex = ref(0);

const currentCount = ref(0);
const isCounting = ref(false);
const isResting = ref(false);
const restTimeLeft = ref(restTime);

let restInterval = null;

const backgroundClass = computed(() => {
  if (isResting.value) {
    return "resting-background";
  } else if (isCounting.value) {
    return "counting-background";
  } else {
    return "default-background";
  }
});

const startCounting = () => {
  if (currentExerciseIndex.value < repetitions.length) {
    isCounting.value = true;
    window.addEventListener("touchstart", incrementCount);
  }
};

const incrementCount = () => {
  if (!isCounting.value) return;

  currentCount.value += 1;

  if (currentCount.value >= repetitions[currentExerciseIndex.value]) {
    finishCurrentExercise();
  }
};

const finishCurrentExercise = () => {
  isCounting.value = false;
  currentExerciseIndex.value += 1;

  if (currentExerciseIndex.value < repetitions.length) {
    startRestPeriod();
  } else {
    reset();
  }

  window.removeEventListener("touchstart", incrementCount);
};

const startRestPeriod = () => {
  isResting.value = true;
  restTimeLeft.value = restTime;

  restInterval = setInterval(() => {
    restTimeLeft.value -= 1;

    if (restTimeLeft.value <= 0) {
      clearInterval(restInterval);
      isResting.value = false;
      currentCount.value = 0;
      startCounting();
    }
  }, 1000);
};

const reset = () => {
  currentCount.value = 0;
  currentExerciseIndex.value = 0;
};

const backToMain = () => {
  router.push("/");
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
  display: grid;
  grid-template-columns: auto 1fr auto;
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
  font-size: 2rem;
  font-weight: bold;
}
.counter-section {
  text-align: center;
  font-size: 6rem;
}

.header-button {
  color: #eeeeee;
  padding: 0 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.button-disabled {
  color: #757575;
}
</style>
