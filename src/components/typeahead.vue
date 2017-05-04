<template>
  <div class="Typeahead">
    <i class="fa fa-spinner fa-spin" v-if="loading"></i>
    <template v-else>
      <i class="fa fa-search" v-show="isEmpty"></i>
      <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
    </template>

    <input type="text"
           class="Typeahead__input"
           placeholder="Start typing for options"
           autocomplete="off"
           v-model="query"
           @keydown.down="down"
           @keydown.up="up"
           @keydown.enter="hit"
           @keydown.enter.prevent=""
           @keydown.esc="hit"
           @blur="hideItems"
           @input="update"/>

    <ul v-show="showList">
      <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
        <span class="name" v-text="item.facet"></span>
        <span class="screen-name">Posts: {{item.count}}</span>
      </li>
    </ul>
  </div>
</template>



<script>
import VueTypeahead from 'vue-typeahead'

export default {
  extends: VueTypeahead,
  props: ['value', 'type'],

  data () {
    return {
      url: 'http://searchreddit.net:443/1/datastores/reddit2/query?x-searchera-application-id=aaaaaaaa&x-searchera-rest-api-key=kZDjVuFmWMACuirvmjn5U3YzH31DeEIP',
      limit: 10,
      minChars: 0,
      query: this.value,
      showItem: true
    }
  },

  methods: {
    onHit (item) {
      this.myreset()
      console.log(item)
      this.$emit('selected', item.facet)
      this.query = item.facet
    },

    hideItems () {
      this.showItem = false
    },

    prepareResponseData (data) {
      console.log(data)
      return data.facets[this.type]
    },

    myreset () {
      this.reset()
      this.showItem = true
    },

    fetch (x) {
      return this.$http.post(this.url, {q: this.query, inFields: [this.type], hitsPerPage: 0, getFacets: ['subreddit', 'author', 'domain']}, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
    }
  },

  computed: {
    showList: function () {
      if (this.showItem) {
        return this.hasItems
      }
      return false
    }
  },

  watch: {
    type (val) {
      this.reset()
    },

    query (val) {
      this.showItem = true
    }
  }
}
</script>



<style scoped>
.Typeahead {
  position: relative;
}

.Typeahead__input {
  width: 100%;
  font-size: 13px;
  color: #444;
  line-height: 1.42857143;
  box-shadow: inset 0px 0px 1px rgba(0,0,0,.8);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  font-weight: 400;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  letter-spacing: 1px;
  box-sizing: border-box;
}

.Typeahead__input:focus {
  border-color: #0288D1;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px #0288d1;
}

.fa-times {
  cursor: pointer;
}

i {
  float: right;
  position: relative;
  top: 27px;
  right: 22px;
  opacity: 0.4;
}

ul {
  position: absolute;
  padding: 0;
  margin-top: 8px;
  min-width: 100%;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.25);
  z-index: 1000;
}

li {
  padding: 10px 16px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

li:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

li:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
}

span {
  display: block;
  color: #2c3e50;
}

.active {
  background-color: #0288d1;
}

.active span {
  color: white;
}

.name {
  font-weight: 600;
  font-size: 14px;
}

</style>
