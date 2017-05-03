<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">Add Filter</h4>
        </div>
        <div class="panel-body">
          <form class="form-horizontal">

            <div class="form-group">
              <label class="control-label col-lg-2">Filter type</label>
              <div class="col-lg-10">
                <select class="sel form-control" v-model="sfilter">
                  <option v-for="option in filterOptions" :value="option.id">
                  {{ option.text }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-lg-2">Negate Filter</label>
              <div class="col-lg-10">
 
              <div class="checkbox">
                <label>
                  <div class="checker border-primary-600 text-primary-800"><span class="checked"><input type="checkbox" class="control-primary" checked="checked" v-model="negate"></span></div> Filter is treated as 'NOT'
                </label>
              </div>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-lg-2">Filter</label>
              <div class="col-lg-10">
                <typeahead :value="fvalue" :type="sfilter" v-on:selected="selected" style="margin-top: -8px;"></typeahead>
              </div>
            </div>


          </form>
          <div style="display: inline-block;" class="pull-right">
            <button type="button" class="btn btn-primary btn-sm" @click="cancel">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" @click="add">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Typeahead from './typeahead'
export default {
  name: 'rfilter',
  components: {Typeahead},

  data () {
    return {
      filterOptions: [{text: 'Subreddit', id: 'subreddit'}, {text: 'User', id: 'author'}],
      sfilter: 'subreddit',
      negate: false,
      fvalue: ''
    }
  },

  methods: {
    cancel () {
      this.$emit('cancel')
    },

    add () {
      this.$emit('add', {type: this.sfilter, negate: this.negate, value: this.fvalue})
    },

    selected (f) {
      console.log(f)
      this.fvalue = f
    }
  }
}
</script>
<style scoped>

.panel-heading {
  padding: 10px 20px;
}

.sel {
    padding: 2px 5px;
    font-size: 13px;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.btn-sm {
  font-weight: bold;
}



</style>

