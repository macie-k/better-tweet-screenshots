const TWITTER_TOKEN =
    'AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB';

export function parseTweetInformation(data: any) {
    const tweet_data = data.data; // save tweet information
    const user = data.includes.users[0]; // save user information
    const media = data.includes.media; // save media information
    const ref = tweet_data.referenced_tweets;

    // console.log(tweet_data)
    const textSplit = tweet_data.text.split(' ');
    if (data.includes.media || ref)
        // remove t.co media link
        textSplit.pop();

    const tweet = {
        media: media ?? [],
        id: tweet_data.id,
        likes: tweet_data.public_metrics.like_count,
        date: tweet_data.created_at,
        text: textSplit.join(' '), // remove t.co/id link from tweet text
        reference: ref ? tweet_data.referenced_tweets[0] : null,
    };

    return { tweet: tweet, user: user };
}

export async function fetchTweetData(id: string) {
    const endpointURL = 'https://api.twitter.com/2/tweets/'; // API endpoint
    const prefix = 'https://cors.bridged.cc/'; // CORS proxy server
    const params = {
        'tweet.fields': 'created_at,author_id,public_metrics,referenced_tweets', // tweet parameters
        expansions: 'author_id,attachments.media_keys', // additional fields
        'user.fields': 'created_at,profile_image_url,username,verified,name', // user parameters
        'media.fields': 'url,preview_image_url,height,width', // media parameters
    };

    /* build params string to URL-like format ...?param=val&param2=val2 */
    let combinedParams = '';
    for (let p in params) {
        combinedParams += combinedParams === '' ? '?' : '&';
        combinedParams += `${p}=${(params as any)[p]}`;
    }

    /* make request and return response */
    const requestURL = `${prefix}${endpointURL}${id}${combinedParams}`;
    const res = await fetch(requestURL, {
        headers: {
            Authorization: `Bearer ${TWITTER_TOKEN}`,
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error('Could not fetch tweet data: ' + response.status);
            return response.json();
        })
        .catch(() => null);
    return res;
}

export function getTweetID(inputVal: string) {
    const split = inputVal.split('/'); // check if full URL was provided, if yes extract id and set variable

    let id = inputVal; // if input is empty set id to undefined otherwise to its value
    if (split.length > 1) {
        id = split[split.length - 1];
        id = id.split('?')[0];
    }

    return id.trim();
}
