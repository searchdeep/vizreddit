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

            <a class="navbar-brand" href="#/">Reddit Visualization</a>
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
    <router-view></router-view>
  </div>
</template>

<script>
import reddit from './components/reddit'

export default {
  name: 'app',
  components: {
    reddit
  }
}
</script>

<style>
</style>
