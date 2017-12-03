$(function() {
    const baseLink = 'https://newsapi.org/v2/top-headlines?',
        key = MY_API_KEY,
        result = $('#result'),
        error = $('#error');
    let requestUrl;

    $('form').on('submit', validateForm);

    function validateForm(e) {
        e.preventDefault();

        const keyword = $('#keyword').val(),
            category = $('#category option:selected').val(),
            language = $('#language option:selected').val();

        if (keyword === '' || (/[\W\d_]/gi).test(keyword)) {
            error.text('Please enter a valid keyword or phrase!').fadeIn(2000).fadeOut(2000);
            return;
        }

        if (category === 'all' && language === 'all') {
            console.log('no category or lang selected!');
            requestUrl = `${baseLink}apiKey=${key}&q=${keyword}`;
        }

        else if (category === 'all') {
            requestUrl = `${baseLink}apiKey=${key}&q=${keyword}&language=${language}`;
        }

        else if (language === 'all') {
            requestUrl = `${baseLink}apiKey=${key}&q=${keyword}&category=${category}`;            
        }

        else requestUrl = `${baseLink}apiKey=${key}&q=${keyword}&category=${category}&language=${language}`;        
        
        console.log(requestUrl);

        fetchArticles(requestUrl);
    }

    function fetchArticles(requestUrl) {
        $.getJSON(requestUrl)
        .done(function(data) {
            result.empty();

            if (data['articles'].length === 0) {
                result.append('<h2>No results were found. Please try another keyword and/or category.</h2>');
                return;
            }

            data['articles'].forEach(article => {
                const title = article['title'],
                    description = article['description'],
                    sourceName = article['source']['name'],
                    sourceUrl = article['url'],
                    image = article['urlToImage'],
                    date = article['publishedAt'];
                
            result.append('<li><h2>' + title + '</h2></li>');
            });
        })
        .fail(function() {
            result.empty();
            result.append('<h2>No results were found.</h2>');
            $('form').reset();
            console.log('error occured');
        })
        .always(function() {
            console.log('request completed');
        });
    }
});