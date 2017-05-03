<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">Add Filter</h4>
        </div>
        <div class="panel-body">
          <form class="form-horizontal" action="blah">

            <div class="form-group">
              <label class="control-label col-lg-2">Filter type</label>
              <div class="col-lg-10">
                <select class="sel form-control" v-model="sfilter">
                  <option v-for="option in filterOptions" :value="option">
                  {{ option }}
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

            <typeahead></typeahead>

          </form>
          <div style="display: inline-block;" class="pull-right">
            <button type="button" class="btn btn-primary btn-sm" @click="cancel">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm">Add</button>
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
      filterOptions: ['Subreddit', 'User', 'Domain'],
      sfilter: 'Subreddit',
      negate: false,
      vi: '',
      sugg: []
    }
  },

  methods: {
    cancel () {
      this.$emit('cancel')
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

