/**
   * Sample JavaScript code for youtube.comments.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

var items = [];
let div = document.getElementById('item')
let pageToken = ""




  function loadClient() {
      gapi.client.init({
          'clientId': '474162292949-s1h66rvhgc16puo74hv9r48d6a37cdjj.apps.googleusercontent.com',
        //   'client_secret': '0-hxbgtK9z8MxGSBsV6JJ8IY'
      })
    gapi.client.setApiKey("AIzaSyCAZn7EnOjI-Jybz6UZSwozi8KDooSfnUs");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  // Make sure the client is loaded before calling this method.

  function execute() {
    return gapi.client.youtube.commentThreads.list({
      "part": "snippet,replies",
      "maxResults": 20,
      "pageToken": pageToken,
      "videoId": "NmYGsP0Flhw",
      "fields": "nextPageToken,pageInfo,items(snippet(totalReplyCount,topLevelComment/snippet(authorDisplayName,textDisplay,likeCount)))"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                items = response.result.items;

                const itemsFiltered = items.filter(item => item.snippet.topLevelComment.snippet.likeCount > 150 && item.snippet.totalReplyCount > 0)
                pageToken = response.result.nextPageToken ? response.result.nextPageToken : ''

                itemsFiltered.forEach(item => {
                  div.innerHTML += `
                    <br>
                    Autor do comentário: ${item.snippet.topLevelComment.snippet.authorDisplayName}
                    <br>
                    Texto: ${item.snippet.topLevelComment.snippet.textDisplay}
                    <br>
                    Likes: ${item.snippet.topLevelComment.snippet.likeCount}
                    <br>
                    Comentários: ${item.snippet.totalReplyCount}
                    <br>
                  `
                });
              },
              function(err) { console.error("Execute error", err); });
  }

  gapi.load("client");

    async function loopExecute() {
      do {
        await execute()
      } while (pageToken.length > 0)
    }

