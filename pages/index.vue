<template>
  <div class="home">
    <h1>Push-ups</h1>
    <ul class="menu">
      <li>
        <NuxtLink
          :to="{ name: 'difficulty-level', params: { level: 'begginer' } }"
          class="menu-item"
        >
          Beginners
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="{ name: 'difficulty-level', params: { level: 'easy' } }"
          class="menu-item"
        >
          Easy
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="{ name: 'difficulty-level', params: { level: 'medium' } }"
          class="menu-item"
        >
          Medium
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="{ name: 'difficulty-level', params: { level: 'intermediate' } }"
          class="menu-item"
        >
          Intermediate
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="{ name: 'difficulty-level', params: { level: 'advanced' } }"
          class="menu-item"
        >
          Advanced
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="menu-item" disabled> Custom (Coming Soon) </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f8fa;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 1rem 2rem;
  text-decoration: none;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background-color: #e8f0fe;
}

@media (max-width: 768px) {
  .menu {
    gap: 1rem;
  }
}
</style>
