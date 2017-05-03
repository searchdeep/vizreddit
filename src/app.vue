<template>
  <div id="app">
    <div class="header">
      <div class="navbar navbar-inverse bg-blue-800 navbar-xs" role="navigation">
          <div class="navbar-header">

            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand" href="/">Reddit Visualization</a>
            <button class="btn btn-primary btn-head pull-right" data-toggle="modal" data-target="#myModal">About</button>
            <a class="navbar-brand pull-right" target="_blank" href="https://searchera.io">Powered by Searchera.io</a>
          </div>

          <!--
          <div class="collapse navbar-collapse" id="js-navbar-collapse">

            <ul class="nav navbar-nav">
                <router-link to="/" tag="li" active-class="active"><a>Search All</a></router-link>
              <li><a ng-href="/repo">Repo</a></li>
              <li><a ng-href="/user">User</a></li>
              <li><a ng-href="/about">About</a></li>
            </ul>
          </div>
          -->
      </div>
    </div>

    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Reddit Visualization</h4>
          </div>
          <div class="modal-body">
            <p>This visualization is powered by <a href="https://searchera.io" target="_blank">Searchera</a> hosted search API.</p>
            <p>Thanks to <a href="https://reddit.com/u/stuck_in_the_matrix" target="_blank">/u/stuck_in_the_matrix</a> for collecting the data and <a href="https://reddit.com/u/fhoffa" target="_blank">/u/fhoffa</a> for loading it on Google BigQuery</p>
            <p>The data mirrored on Searchera is hosted in New York.  Performance is not ideal outside of USA and parts of Europe.</p>
            <p>If you are interested in just search results, please use <a href="http://searchreddit.net">http://searchreddit.net</a></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import reddit from './components/reddit'

export default {
  name: 'app',
  components: {
    reddit
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style>
.navbar-header{
  margin-left:5px;
  width:100%;
}
.btn-head {
  margin-top: 4px;
  padding: 5px 15px;
  font-weight: 600;
}
</style>
