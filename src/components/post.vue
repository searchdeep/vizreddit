<template>
  <div class="row post-row">
    <div class="col-md-12">
      <div class="vote-actions">
        <i class="fa fa-arrow-up text-grey-300"> </i>
        <div class="text-grey-400">{{hit.score}}</div>
        <i class="fa fa-arrow-down text-grey-300"> </i>
      </div>
      <a href="" class="pull-left" style="margin-right:10px;" v-if="hit.thumbnail.indexOf('http://') > -1"> <img alt="image" :src="hit.thumbnail" height="70" width="70"></a>
      <div class="media-body">
        <div>
          <span><a target="_blank" :href="hit.url" class="vote-title ml-5" v-html="hit.title"></a></span><span class="vote-info text-muted ml-10"><a :href="'http://'+hit.domain" target="_blank" class="text-muted" >({{hit.domain}})</a></span>
        </div>
        <div class="vote-info ml-5 text-grey-300">
          <span class="label label-flat border-danger text-danger-600" v-if="hit.over_18">nsfw</span>
          submitted {{hit.created | timeAgo}}
          by <a href="#">{{hit.author}}</a>
          to <a href="#">/r/{{hit.subreddit}}</a>
        </div>
        <div class="vote-info ml-5">
          <a target="_blank" :href="'https://reddit.com'+hit.permalink" class="text-grey-600 text-bold">{{hit.num_comments}} Comments</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: ['hit']
}
</script>
<style>
/* Vote list */
.vote-item {
    padding: 10px 25px;
    background: #ffffff;
    border-top: 1px solid #e7eaec;
}
.vote-item:last-child {
    border-bottom: 1px solid #e7eaec;
}
.vote-item:hover {
    background: #fefefe;
}
.vote-actions {
    float: left;
    width: 30px;
    margin-right: 15px;
    text-align: center;
}
.vote-actions a {
    font-weight: 600;
}
.vote-actions {
    font-weight: 600;
}
.vote-title {
    font-size: 18px;
    margin-top: 3px;
    margin-bottom: 1px;
    color: #666;
}
.vote-title a:hover {
    color: #e8e9ea;
}
.vote-info,
.vote-title {
    margin-left: 45px;
}
.vote-info a {
    font-size: 11px;
    line-height: 1.4;
}
.vote-info a:hover {
    text-decoration: underline;
}
.vote-icon {
    text-align: right;
    font-size: 38px;
    display: block;
    color: #e8e9ea;
}
.vote-icon.active {
    color: #1ab394;
}
.post-row {
  margin-left: -20px !important;
  margin-right: -20px !important;
}

.mark {
    background: #ff0 !important;
    padding: 0px !important;
}

</style>
