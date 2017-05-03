<template>
  <div>
    <div class="page-header ">
      <div class="page-header-content row bg-blue-700 no-margin">
        <div class="col-md-8 col-md-offset-2 no-padding mb-10 mt-10">
          <div class="has-feedback has-feedback-left">
            <input type="text" class="form-control input-xlg" value="" placeholder="Search title" style="width:100%;" v-model="q" @change="queryReddit()" autofocus>
            <div class="form-control-feedback">
              <i class="fa fa-search text-muted text-size-large"></i>
            </div>
          </div>
        </div>
      </div>


      <div class="breadcrumb-line">
        <ul class="breadcrumb mb-5">
          <li>
            <span class="pl-10">NSFW :</span>
            <select class="sel ml-10" v-model="nsfw">
              <option v-for="option in nsfwOptions" :value="option">
              {{ option }}
              </option>
            </select>
          </li>
        </ul>
        <ul class="breadcrumb-elements">
          <li>
            <span style="display:block; padding:13px 15px;" v-if="data.totalHits">{{data.totalHits | number}} results ({{data.tookMS/1000.0}} secs)</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="content" v-if="!data.hits || data.hits.length === 0">
      <div class="jumbotron mt-20 pt-20">
        <h2>No matching results found</h2>
      </div>
    </div>

    <div class="content" v-else>

      <div class="row">

        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h6 class="panel-title">Posts by year</h6>
            </div>
            <div class="panel-body">
              <chart :config="dateChart"></chart>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h6 class="panel-title">Posts by subreddit</h6>
            </div>
            <div class="panel-body">
              <chart :config="subChart"></chart>
            </div>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h6 class="panel-title">Posts by domain</h6>
            </div>
            <div class="panel-body">
              <chart :config="domChart"></chart>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import chart from './chart.vue'
import utils from '../utils.js'
import debounce from 'debounce'

export default {
  name: 'reddit',
  components: {chart},

  data () {
    return {
      url: 'http://searchreddit.net:443/1/datastores/reddit/query?x-searchera-application-id=aaaaaaaa&x-searchera-rest-api-key=kZDjVuFmWMACuirvmjn5U3YzH31DeEIP',
      // Route params
      q: this.$route.query.q || '',
      nsfw: this.$route.query.nsfw || 'Any',

      nsfwOptions: ['Any', 'None', 'Only'],

      data: {},

      cache: {},

      // Charts
      subChart: utils.getBarChart('subreddit-chart', ['#94ae0a']),
      dateChart: utils.getBarChart('date-chart', ['#115fa6']),
      domChart: utils.getBarChart('domain-chart', ['#24ad9a'])
    }
  },

  computed: {
    subreddits: function () {
      return this.data.facets ? this.data.facets.subreddit : []
    },

    years: function () {
      return this.data.facets ? this.data.facets.year.sort(function (a, b) { return (a.facet > b.facet) ? 1 : ((b.facet > a.facet) ? -1 : 0) }) : []
    },

    domains: function () {
      return this.data.facets ? this.data.facets.domain : []
    }
  },

  methods: {
    queryReddit (now = false) {
      var q = {q: this.q}
      q.getFacets = ['subreddit', 'domain', 'year']
      q.aggregate = ['over_18', 'is_self']
      this.performQuery(q, now)
    },

    performQuery (q, now) {
      let qs = JSON.stringify(q)
      if (this.cache[qs]) {
        this.data = this.cache[qs]
        if (now) {
          this.drawCharts()
        } else {
          this.setupCharts()
        }
        return
      }
      this.$http.post(this.url, q, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
      .then(r => {
        if (this.q === r.body.queryText) {
          this.data = r.body
          if (now) {
            this.drawCharts()
          } else {
            this.setupCharts()
          }
        }
        this.cache[qs] = this.data
      }, err => {
        console.log(err)
      })
    },

    fillChart (f, chart) {
      if (this[f]) {
        var cols = [['x'], ['Post Count']]
        this[f].forEach(({facet, count}) => {
          cols[0].push(facet)
          cols[1].push(count)
        })
        chart.data.columns = cols
      }
    },

    drawCharts () {
      console.log('Draw charts')
      // subreddit bar
      this.fillChart('subreddits', this.subChart)
      // Year chart
      this.fillChart('years', this.dateChart)
      // Domain chart
      this.fillChart('domains', this.domChart)
    },

    setupCharts: debounce(function () {
      this.drawCharts()
      this.$router.push({path: '', query: {q: this.q, nsfw: this.nsfw}})
    }, 1000)

  },

  mounted () {
    this.queryReddit(true)
  },

  watch: {
    q (value) {
      this.queryReddit()
    }
  }

}
</script>

<style scoped>

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

.row {
  margin-left: 0px;
  margin-right: 0px;
}

.panel-heading {
  padding: 10px 20px;
}

.panel-body {
  padding: 5px;
}

</style>
