<template>
  <div>
    <!-- optional indicators -->
    <i class="fa fa-spinner fa-spin" v-if="loading"></i>
    <template v-else>
      <i class="fa fa-search" v-show="isEmpty"></i>
      <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
    </template>

    <!-- the input field -->
    <input type="text"
           placeholder="..."
           autocomplete="off"
           v-model="query"
           @keydown.down="down"
           @keydown.up="up"
           @keydown.enter="hit"
           @keydown.esc="reset"
           @blur="reset"
           @input="update"/>

    <!-- the list -->
    <ul v-show="hasItems">
      <!-- for vue@1.0 use: ($item, item) -->
      <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
        <span v-text="item.name"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypeahead from 'vue-typeahead'

export default {
  extends: VueTypeahead, // vue@1.0.22+
  // mixins: [VueTypeahead], // vue@1.0.21-

  data () {
    return {
      // The source url
      // (required)
      src: '...',

      // The data that would be sent by request
      // (optional)
      data: {},

      // Limit the number of items which is shown at the list
      // (optional)
      limit: 5,

      // The minimum character length needed before triggering
      // (optional)
      minChars: 3,

      // Highlight the first item in the list
      // (optional)
      selectFirst: false,

      // Override the default value (`q`) of query parameter name
      // Use a falsy value for RESTful query
      // (optional)
      queryParamName: 'search'
    }
  },

  methods: {
    // The callback function which is triggered when the user hits on an item
    // (required)
    onHit (item) {
      // alert(item)
    },

    // The callback function which is triggered when the response data are received
    // (optional)
    prepareResponseData (data) {
      // data = ...
      return data
    }
  }
}
</script>

<style>
li.active {
  /* ... */
}
</style>
