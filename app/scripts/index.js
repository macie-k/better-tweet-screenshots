import {$, isDesktop} from './common.js'
import dom2Img from 'retina-dom-to-image'   // modified scale to 3
import { PostBuilder } from './obj/PostBuilder.js'
import { saveAs } from 'file-saver'
import { loadOptions } from './obj/option.js'

export var activePost                  // storing activePost object from postBuilder
var showingPost = false
var showingSettings = false
var options = []

export const urlRegex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB'

window.addEventListener('load', () => {
    $('.container').style.opacity = 1

    // disable dragging and context menu for all images
    $('img').forEach(img => {
        img.draggable = false
        img.addEventListener('contextmenu', (e) => e.preventDefault())
    })

    // todo: reading cookie for selected settins
    options = loadOptions()
    // console.log(options)
    // console.log(JSON.stringify(options))
    console.log('%c Made by: %c https://kazmierczyk.me/', 'background: linear-gradient(to left bottom, #d16ba5, #cf6fb1, #cb73be, #c678cb, #be7ed7, #b388e2, #a692ec, #999bf4, #8ba9f8, #83b5f9, #82c0f6, #89c9f2); color: #fff;', '')

    // load post if url contains id
    const id = location.href.split("=")[1]
    if(id !== undefined) {
        loadPost(id)
    }
})

$('.reload-container').addEventListener('click', function() {
    const img = $('img', this);
    img.classList.add('rotate')

    setTimeout(() => {
        window.history.pushState({} , '', `?id=${getTweetID()}`);
        window.location.reload();
    }, 1200)
    setTimeout(() => {
        img.classList.remove('rotate')
    }, 3000)
})

function getTweetID() {
    const input = $('.tweet-input').value   // input node's value
    const split = input.split('/')          // check if full URL was provided, if yes extract id and set variable

    let id = input || '1343331784621256709' // if input is empty set id to undefined otherwise to its value
    if(split.length > 1) {
        id = split[split.length-1]
        id = id.split('?')[0]
    }

    return id
}

async function loadPost(id) {
    id = id || getTweetID()
    
    $('.load').classList.add('dots')                    // start loading animation
    try {
        const results = await getTweetInformation(id)       // fetch tweet information
        const tweetData = parseTweetInformation(results)    // parse tweet information
    
        const reference = results.data.referenced_tweets
        if(reference !== undefined) {
            const refResults = await getTweetInformation(reference[0].id)
            tweetData.tweet.referenced_tweet = parseTweetInformation(refResults)
            tweetData.tweet.text = tweetData.tweet.text.split(' ').slice(0, -1).join(' ')       // remove t.co link to referenced post
        }
    
        /* wait 0.5s and show post */
        setTimeout(() => {
            $('.load').classList.remove('dots')
            $('.input-overlay').style.top = -window.innerHeight-200
            $('.top-arrow').style.top = 10
            $('.top-arrow').classList.add('pulse')

            fetch(new Request(tweetData.user.profile_image_url)).catch(() => {
                setTimeout(() => {
                    $('.blocked-by-client-bg').fadeIn(300, 'flex')
                    $('.post-container').style.marginTop = ''
                }, 1000)
            })
            
        }, 300)    
        showTweet(tweetData)

        if($('.input-overlay').classList.contains('error')) {
            $('.input-overlay').classList.remove('error')
            $('.load > span').innerHTML = 'LOAD'
        }
    } catch (error) {
        setTimeout(() => {
            $('.load').classList.remove('dots')
            $('.input-overlay').classList.add('error')
            $('.load > span').innerHTML = 'TRY AGAIN'
        }, 300)
        console.error(error)
    }
}

function hideSettings() {
    setTimeout(() => {
        $('.settings-container').classList.remove('visible')
    }, 200)
    $('.option').forEach(option => {
        if(option.classList.contains('settings')) {
            return
        }
        option.fadeOut(300, true)
    })
    showingSettings = false
}

function showSettings() {
    $('.settings-container').classList.add('visible')

    setTimeout(() => {
        $('.option').forEach(option => {
            if(option.classList.contains('settings')) {
                return
            }
            option.fadeIn(300, 'flex')
        })
    }, 600)
    showingSettings = true
}

function showTweet(data) {
    activePost = new PostBuilder(data.tweet, data.user, data.media, PostBuilder.activeTheme)   // create new post
    activePost.display()    // show it
    showingPost = true      // set flag
}

function parseTweetInformation(data) {
    /* if ID is empty // currently overriden */
    if(data === undefined) {
        throw new Error('No post provided')
    }
    const tweet_data = data.data    // save tweet information
    const twDateArray = new Date(tweet_data.created_at).toString().split(" GMT")[0].split(' ')   // split ISO 8601 date to array
    const twTimeArray = twDateArray[twDateArray.length - 1].split(':')                           // separate time from date
    const tweetDate = {
        full: twDateArray.join(' '),
        dayName: twDateArray[0],
        month: twDateArray[1],
        day: twDateArray[2],
        year: twDateArray[3],
        hours: twTimeArray[0],
        minutes: twTimeArray[1],
        seconds: twTimeArray[2]
    }

    // console.log(tweet_data)
    const textSplit = tweet_data.text.split(' ')
        if(data.includes.media)     // remove t.co media link 
            textSplit.pop()

    const tweet = {
        id: tweet_data.id,
        likes: tweet_data.public_metrics.like_count,
        date: tweetDate,
        text: textSplit.join(' ')   // remove t.co/id link from tweet text
    }
    const user = data.includes.users[0]     // save user information
    const media = data.includes.media       // save media information

    return {tweet: tweet, user: user, media:media}
}

// 1409462197147766784
// 1343331784621256709
// 1380044683544567808
async function getTweetInformation(id) {
    const endpointURL = 'https://api.twitter.com/2/tweets/'     // api endpoint
    const prefix = 'https://cors.bridged.cc/'                   // CORS proxy server
    const params = {
        "tweet.fields": "created_at,author_id,public_metrics,referenced_tweets",    // tweet parameters
        "expansions": "author_id,attachments.media_keys",                           // additional fields
        "user.fields": "created_at,profile_image_url,username,verified,name",       // user parameters
        "media.fields": "url,preview_image_url,height,width",                       // media parameters
    }

    /* build params string to URL-like format ...?param=val&param2=val2 */
    let combinedParams = '';
    for(let p in params) {
        combinedParams += (combinedParams === '') ? '?' : '&'
        combinedParams += `${p}=${params[p]}`
    }

    /* make request and return response */
    const requestURL = `${prefix}${endpointURL}${id}${combinedParams}`
    const res = await fetch(requestURL, {
        headers: {
            "Authorization": `Bearer ${TWITTER_TOKEN}`
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.error(err))

    return res
}

export async function createScreenshot(sourceNode, targetNode, download=true) {
    if(download) {
        await dom2Img.toBlob(sourceNode, {
            style: {
                marginTop: 0,
                top: 0,
                position: 'unset',              
            }
        }).then(function (blob) {
            const name = `${activePost.user.username}_${activePost.tweet.id}` 
            saveAs(blob, name); // probably "author_name + date" in the future
        }).catch(function (error) {
            console.error('Something went wrong!: ', error);
        })
    } else {
        await dom2Img.toPng(sourceNode).then(function(dataUrl) {
            const img = document.createElement('img')
                img.src = dataUrl
            const element = targetNode.appendChild(img);
                element.style.position = 'absolute'
                element.style.top = 0
                element.style.zIndex = 2
        }).catch(function (error) {
            console.error('Could not render image: ', error);
        })
    }
}


$('.save').addEventListener('click', () => {
    activePost.createPhoto()
})

/* click event for "LOAD" button at the begininnig */
$('.load').addEventListener('click', async () => {
    loadPost()
})

/* event for top arrow to restore post input */
$('.top-arrow').addEventListener('click', () => {
    $('.input-overlay').style.top = 0
    showingPost = false
    setTimeout(() => {
        $('.media-1 > img').src = ''
        $('.media-content').forEach(el => {
            el.style.backgroundImage = ''
        })
    }, 1000)
})

/* show or hide settings on click */
$('.settings').addEventListener('click', () => {
    if(showingSettings) {
        hideSettings()
    } else {
        showSettings()
    }
})

window.addEventListener('resize', () => {
    if(showingPost) {
        $('.input-overlay').style.top = -window.innerHeight-200     // in case of vertical resize keep overlay above
    }
})