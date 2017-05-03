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
            <span>NSFW :</span>
            <select class="sel ml-5" v-model="nsfw">
              <option v-for="option in nsfwOptions" :value="option">
              {{ option }}
              </option>
            </select>
          </li>

          <li>
            <span>Post Type :</span>
            <select class="sel ml-5" v-model="type">
              <option v-for="option in typeOptions" :value="option">
              {{ option }}
              </option>
            </select>
          </li>

          <li>
            <span>Year :</span>
            <select class="sel ml-5" v-model="year">
              <option v-for="option in yearOptions" :value="option">
              {{ option }}
              </option>
            </select>
          </li>

          <li>
            <button type="button" class="btn btn-primary btn-xs" @click="addFilter = !addFilter">Add Filter</button>
          </li>
 
        </ul>
        <ul class="breadcrumb-elements">
          <li>
            <span style="display:block; padding:13px 15px;" v-if="data.totalHits">{{data.totalHits | number}} results ({{data.tookMS/1000.0}} secs)</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- start filters -->
      <div class="breadcrumb-line mb-10" v-if="filters.length > 0">
        <ul class="breadcrumb">

          <li>
            <span>Filters :</span>
          </li>

          <li v-for="(fil,idx) in filters">
            <button type="button" class="btn bg-pink btn-filter">{{fil.type}} : {{fil.negate?'! ':''}}{{fil.value}}<i class="fa fa-close position-right" @click="removeFilter(idx)"></i></button>
          </li>

        </ul>
        <ul class="breadcrumb-elements">
          <li>
            <button type="button" class="btn btn-primary btn-clear" @click="filters = []">Clear All</button>
          </li>
        </ul>
      </div>
      <!-- end filters -->


    <div class="mb-15"/>

    <div class="content" v-if="addFilter">
      <rfilter v-on:cancel="addFilter = false" v-on:add="newFilter"/>
    </div>

    <div class="content" v-if="!(!data.hits || data.hits.length === 0)">

      <div class="row">

        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h6 class="panel-title" v-if="year === 'Any'">Posts By Year</h6>
              <h6 class="panel-title" v-else>Posts By Month - {{year}}</h6>
            </div>
            <div class="panel-body">
              <chart :config="dateChart"></chart>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h6 class="panel-title">Posts By Subreddit</h6>
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
              <h6 class="panel-title">Posts By Domain</h6>
            </div>
            <div class="panel-body">
              <chart :config="domChart"></chart>
            </div>
          </div>
        </div>

        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h6 class="panel-title">NSFW & Self Text Posts</h6>
                </div>
                <div class="panel-body">
                    <div class='row'>
                        <div class="col-md-6">
                            <chart :config="nsfwChart"/>
                        </div>
                        <div class="col-md-6">
                            <chart :config="selfChart"/>
                        </div>
                    </div>
                </div>
            </div>
       </div>
     </div>

     <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">Search Results</h5>
            </div>
            <div class="panel-body no-padding">
                <div class="vote-item" v-for="hit in data.hits">
                  <post :hit="hit"/>
                </div>
            </div>
          </div>
        </div>
     </div>

    </div>

    <div class="content" v-else>
      <div class="jumbotron mt-20 pt-20">
        <h2>No matching results found</h2>
      </div>
    </div>

  </div>
</template>
<script>
import chart from './chart.vue'
import rfilter from './rfilter.vue'
import post from './post.vue'
import utils from '../utils.js'
import debounce from 'debounce'

export default {
  name: 'reddit',
  components: {chart, post, rfilter},

  data () {
    return {
      url: 'http://searchreddit.net:443/1/datastores/reddit/query?x-searchera-application-id=aaaaaaaa&x-searchera-rest-api-key=kZDjVuFmWMACuirvmjn5U3YzH31DeEIP',
      // Route params
      q: this.$route.query.q || '',
      nsfw: this.$route.query.nsfw || 'Any',
      type: this.$route.query.type || 'Any',
      year: this.$route.query.year || 'Any',
      subreddit: this.$route.query.subreddit || '',
      user: this.$route.query.user || '',

      // Filter
      addFilter: false,
      filters: [],

      // Select options
      nsfwOptions: ['Any', 'None', 'Only'],
      typeOptions: ['Any', 'Link', 'Text'],
      yearOptions: ['Any', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],

      // Result data
      data: {},

      // Cache results for reuse
      cache: {},

      // Charts
      subChart: utils.getBarChart('subreddit-chart', ['#94ae0a']),
      dateChart: utils.getBarChart('date-chart', ['#115fa6']),
      domChart: utils.getBarChart('domain-chart', ['#24ad9a']),
      nsfwChart: {
        chart_id: 'nsfw-chart',
        data: { type: 'donut', unload: true, columns: [], selection: { enabled: false, grouped: false } },
        options: { donut: {title: 'NSFW'}, color: { pattern: ['#a61120', '#94ae0a', '#ff8809', '#ffd13e', '#a61187'] } }
      },
      selfChart: {
        chart_id: 'self-chart',
        data: { type: 'donut', unload: true, columns: [], selection: { enabled: false, grouped: false } },
        options: {donut: {title: 'Post Type'}, color: {pattern: ['#24ad9a', '#115fa6', '#ff8809', '#ffd13e', '#a61187']}}
      }

    }
  },

  computed: {
    subreddits: function () {
      return this.data.facets ? this.data.facets.subreddit : []
    },

    years: function () {
      if (this.year === 'Any') {
        return this.data.facets ? this.data.facets.year.sort(function (a, b) { return (a.facet > b.facet) ? 1 : ((b.facet > a.facet) ? -1 : 0) }) : []
      } else {
        return this.data.facets ? this.data.facets.month : []
      }
    },

    domains: function () {
      return this.data.facets ? this.data.facets.domain : []
    }
  },

  methods: {
    queryReddit (now = false) {
      // Basic query
      var q = {q: this.q}
      q.getFacets = ['subreddit', 'domain']
      q.aggregate = ['over_18', 'is_self']

      // Filters
      let f = {}
      if (this.nsfw !== 'Any') {
        f.over_18 = this.nsfw === 'Only'
      }
      if (this.type !== 'Any') {
        f.is_self = this.type === 'Text'
      }
      if (this.year !== 'Any') {
        f.year = this.year
        q.getFacets.push('month')
      } else {
        q.getFacets.push('year')
      }

      if (this.filters) {
        // track filters for subreddit and user
        let sf = []
        let uf = []
        // track negation values for sub and u
        let sfn = false
        let ufn = false

        this.filters.forEach((ff) => {
          if (ff.type === 'subreddit') {
            sf.push(ff.value)
            sfn = ff.negate
          } else if (ff.type === 'author') {
            uf.push(ff.value)
            ufn = ff.negate
          }
        })

        if (sf.length > 0) {
          if (sfn) {
            f.subreddit = {'$nin': sf}
          } else {
            f.subreddit = {'$or': sf}
          }
        }

        if (uf.length > 0) {
          if (ufn) {
            f.author = {'$nin': uf}
          } else {
            f.author = {'$or': uf}
          }
        }
      }

      if (f) {
        q.filter = f
      }

      this.performQuery(q, now)
    },

    newFilter (f) {
      if (f.value.length > 0) {
        this.filters.push(f)
      }
      this.addFilter = false
    },

    removeFilter (idx) {
      this.filters.splice(idx, 1)
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
      // subreddit bar
      this.fillChart('subreddits', this.subChart)

      // Year chart
      this.fillChart('years', this.dateChart)

      // Domain chart
      this.fillChart('domains', this.domChart)

      // Aggregate chart
      if (this.data.aggregates) {
        if (this.data.aggregates.over_18) {
          let cols = []
          cols.push(['nsfw', this.data.aggregates.over_18.true])
          cols.push(['sfw', this.data.aggregates.over_18.false])
          this.nsfwChart.data.columns = cols
        }
        if (this.data.aggregates.is_self) {
          let cols = []
          cols.push(['text', this.data.aggregates.is_self.true])
          cols.push(['link', this.data.aggregates.is_self.false])
          this.selfChart.data.columns = cols
        }
      }

      // Update route
      this.$router.push({path: '', query: {q: this.q, nsfw: this.nsfw, type: this.type, year: this.year}})
    },

    setupCharts: debounce(function () {
      this.drawCharts()
    }, 1000)

  },

  mounted () {
    this.queryReddit(true)
  },

  watch: {
    q (value) {
      this.queryReddit()
    },

    nsfw (value) {
      this.queryReddit(true)
    },

    year (value) {
      this.queryReddit(true)
    },

    type (value) {
      this.queryReddit(true)
    },

    filters (value) {
      this.queryReddit(true)
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

.breadcrumb>li+li:before {
  content: "";
}

.btn-xs {
  padding: 2px 10px;
  margin-top: -3px;
  font-weight: bold;
}

.btn-clear {
  padding: 2px 10px;
  margin-top: 10px;
  font-weight: bold;
}

.btn-filter {
  padding: 2px 10px;
  margin-top: 1px;
}

.page-header-content+.breadcrumb-line {
    margin-bottom: 0px;
    border-bottom: 1px solid #ddd;
}

.breadcrumb-line {
    border-bottom: 1px solid #ddd;
}

</style>
