<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <p>
      The information below is being fetched from your Serverless Cloud API:
    </p>
    <div v-if="loading">Loading users...</div>
    <div v-else-if="users.length == 0"><strong>No users found</strong></div>
    <div v-else id="users">
      <div v-for="user in users" v-bind:key="user.id">
        <strong>{{ user.value.name }}: </strong>
        <span :class="user.value.status">{{ user.value.status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  created() {
    axios.get("/api/users").then((response) => {
      this.users = response.data.users;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}

#users {
  margin: 0 auto;
}

.active {
  color: #42b983;
}
.inactive {
  color: #cc0000;
}
</style>
