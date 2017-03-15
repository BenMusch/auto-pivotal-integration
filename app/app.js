const story_id_regex = /\/(story\/show|stories)\/(\d+)/
const commit_preface_regex = /\[.*(#\d+\s*)\]/

function getPivotalStoryIds() {
  let commentBody = $('.edit-comment-hide')[0].innerHTML;
  let matches = commentBody.match(story_id_regex);
  let storyIds = [];

  for (var i = 0; i < matches.length; i++) {
    match = matches[i];
    id = match.match(/\d+/);
    if (id) {
      storyIds.push(`#${id[0]}`);
    }
  }

  return $.unique(storyIds);
}

function setCommitMessage(pivotalStoryIds) {
  if (pivotalStoryIds.length > 0) {
    let commitField = $('#merge_title_field')[0];
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

$(document).ready(() => {
  let pivotalStoryIds = getPivotalStoryIds();
  setCommitMessage(pivotalStoryIds);
})
