$(function() {
    const baseUrl = 'https://www.youtube.com/embed/',
        key = YOUTUBE_KEY,
        requestUrl = 'https://www.googleapis.com/youtube/v3/search?key=' + key + '&type=video&part=snippet&q=Ballet Evolved&maxResults=15&order=date&channelId=UCHS5XKgf2FCBF8pZllE_bjw';
    

    $.get(requestUrl)
    .done(function(data) {
        data.items.reverse().forEach((obj, i) => {
            const title = obj.snippet.title;
            const link = baseUrl + obj.id.videoId;
            const iframe = '<iframe src="' + link + '" frameborder="0" allowfullscreen></iframe>';
            $('#results').append('<li><h3>' + (i + 1) + '. ' + title + '</h3>' + iframe + '</li>');
        });
    })
    .fail(function() {
        $('.container').append('<p>Cannot load videos. Please check again later.</p>');
    })
    .always(function() {
        $('.loader').hide();
        $('.container').css('filter', 'blur(0px)');
    });
});