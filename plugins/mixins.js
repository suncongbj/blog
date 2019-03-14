// plugins/global.js
import Vue from 'vue'

Vue.mixin({
  methods: {
    $succ(str) {
      this.$message({
          message: str,
          type: 'success'
        });
    },
    $error(str) {
      this.$message.error(str);
    },
  }
})