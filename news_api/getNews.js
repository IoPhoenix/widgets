// News API: https://newsapi.org/

$(function() {
    const baseLink = 'https://newsapi.org/v2/top-headlines?',
        key = 'c05ac19310884a75a3a267b398fc1c36',
        articles = $('#articles'),
        error = $('#error');
    let requestUrl;

    $('form').on('submit', validateForm);

    function validateForm(e) {
        e.preventDefault();

        const keyword = $('#keyword').val(),
            category = $('#category option:selected').val(),
            language = $('#language option:selected').val();

        if (keyword === '' || (/[^\s\w-]/gi).test(keyword) || (/[\d_]/gi).test(keyword)) {
            $('#keyword').css({'border-color' : '#F83A3A'});
            setTimeout(function() {
                $('#keyword').css({'border-color': 'rgba(0,0,0,.15)'})
            }, 1000);
            error.text('Please enter a valid keyword or phrase!').fadeIn(1000).fadeOut(2000);
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
            // empty the previous results if any
            articles.empty();

            // display error message if no results found
            if (data['articles'].length === 0) {
                articles.append('<h2 class="no-results">No results were found. Please try another keyword and/or category.</h2>');
                return;
            }

            // create li tag for each result and append data
            data['articles'].forEach(article => {
                const title = article['title'],
                    description = article['description'],
                    sourceName = article['source']['name'],
                    sourceUrl = article['url'],
                    imageUrl = article['urlToImage'];
                let date = article['publishedAt'];
                date = (date === null ? '' : date.slice(0, 10));
                
            // do not show description and button on small screens:
            const isSmallScreen = $(window).width() < 768;
            const descriptionAndLink = isSmallScreen ?  '' : ('<p class="article__description">' + truncateText(description) + '</p>' + 
            '<a class="article__more" href="' + sourceUrl + '" target="_blank"><i class="arrow-right"></i> More</a>');
            const result = 
            
            '<li>' + 
                '<div class="article" style="background-image: url(' + imageUrl + ')">' +
                    '<div class="article__content">' + 
                        '<div class="article__info"><span class="article__source">' + sourceName + ' //</span><span class="article__date">' + date + '</span></div>' + 
                        '<h2 class="article__title"><a href="' + sourceUrl +  '" class="article__link" target="_blank">' + title + '</a></h2>'
                        + descriptionAndLink +
                    '</div>' + 
                '</div>' + 
            '</li>';


            articles.append(result);
            });
        })
        .fail(function() {
            articles.empty();
            articles.append('<h2>No results were found.</h2>');
            $('form').reset();
            console.log('error occured');
        })
        .always(function() {
            console.log('request completed');
            // slowly scroll to results div
            $('html, body').animate({
                scrollTop: $("#articles").offset().top
            }, 1000);
        });
    }

    // shorten description text if any
    function truncateText(text) {
        if (text === null) return;
        if (text.length > 300) return text.slice(0, 300) + '...';
        else return text;
    }
});