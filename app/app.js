const story_id_regex = /\/(story\/show|stories)\/(\d+)/
const commit_preface_regex = /\[.*(#\d+\s*)\]/

function removeDuplicates(a) {
  var temp = {};
  for (var i = 0; i < a.length; i++)
    temp[a[i]] = true;
  var r = [];
  for (var k in temp)
      r.push(k);
  return r;
}

function getPivotalStoryIds() {
  let commentBody = document.getElementsByClassName('edit-comment-hide')[0].innerHTML;
  let matches = commentBody.match(story_id_regex);
  let storyIds = [];

  for (var i = 0; i < matches.length; i++) {
    match = matches[i];
    id = match.match(/\d+/);
    if (id) {
      storyIds.push(`#${id[0]}`);
    }
  }

  return removeDuplicates(storyIds);
}

function setCommitMessage(pivotalStoryIds) {
  if (pivotalStoryIds.length > 0) {
    let commitField = document.getElementById('merge_title_field');
    let matches = commitField.value.match(commit_preface_regex);
    let commitPreface = `[Delivers ${pivotalStoryIds.join(' ')}]`;
    let commitMessage = `${commitPreface} ${commitField.value}`;

    if (matches && matches.length > 0) {
      commitField.value = commitField.value.replace(matches[0], commitPreface)
    } else {
      commitField.value = commitMessage;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded!')
  let pivotalStoryIds = getPivotalStoryIds();
  setCommitMessage(pivotalStoryIds);
})
