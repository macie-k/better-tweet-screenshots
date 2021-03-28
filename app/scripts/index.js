import {$} from './common.js'
import dom2Img from 'dom-to-image'
import { PostBuilder } from './obj/PostBuilder.js'
import { Themes } from './obj/theme.js'
import { saveAs } from 'file-saver';

var postObj;
var showingPost = false;

const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB'

window.addEventListener('load', () => {
    $('.container').style.opacity = 1
})

$('.load').addEventListener('click', async () => {
    const input = $('.tweet-input').value
    let id = input || undefined
    const split = input.split('/')
    if(split.length > 1) {
        id = split[split.length-1]
    }

    $('.load').classList.add('dots')
    const results = await getTweetInformation(id)
    const tweetData = parseTweetInformation(results)
    setTimeout(() => {
        $('.load').classList.remove('dots')
        $('.input-overlay').style.top = -window.innerHeight-200
        $('.top-arrow').style.top = 10
        $('.top-arrow').classList.add('pulse')
    }, 500)    
    showTweet(tweetData)
})

$('.top-arrow').addEventListener('click', () => {
    $('.input-overlay').style.top = 0
    showingPost = false
})

function showTweet(data) {
    postObj = new PostBuilder(data.tweet, data.user, data.media, Themes.WHITE)
    postObj.display()
    showingPost = true
    setTimeout(() => {
        postObj.createPhoto()
    }, 2000)
}

function parseTweetInformation(data) {
    if(data === undefined) {
        throw new Error('No post provided')
    }
    const tweet_data = data.data

    const twDateArray = new Date(tweet_data.created_at).toString().split(" GMT")[0].split(' ')   // format ISO 8601 date
    const twTimeArray = twDateArray[twDateArray.length - 1].split(':')                          // separate time from date
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
    const tweet = {
        id: tweet_data.id,
        date: tweetDate,
        text: tweet_data.text.split(' ').filter(el => !el.includes('t.co')).join(' ')
    }
    const user = data.includes.users[0]
    const media = data.includes.media

    return {tweet: tweet, user: user, media:media}
}

async function getTweetInformation(id) {
    if(id === undefined) {
        return undefined
    }

    const endpointURL = 'https://api.twitter.com/2/tweets/'
    const prefix = 'https://cors.bridged.cc/'
    const params = {
        "tweet.fields": "created_at,author_id",
        "expansions": "author_id,attachments.media_keys",
        "user.fields": "created_at,profile_image_url,username,verified,name",
        "media.fields": "url,preview_image_url"
    }

    let combinedParams = '';
    for(let p in params) {
        combinedParams += (combinedParams === '') ? '?' : '&'
        combinedParams += `${p}=${params[p]}`
    }

    const requestURL = `${prefix}${endpointURL}${id}${combinedParams}`
    const res = await fetch(requestURL, {
        headers: {
            "Authorization": `Bearer ${TWITTER_TOKEN}`
        }
    }).then((response) => {
        return response.json()
    })

    return res
}

export async function createScreenshot(sourceNode, targetNode, download=false) {
    if(download) {
        // await dom2Img.toBlob(sourceNode).then(function (blob) {
        //     window.saveAs(blob, 'my-node.png');
        // }).catch(function (error) {
        //     console.error('oops, something went wrong!', error);
        // })
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

window.addEventListener('resize', () => {
    if(showingPost) {
        $('.input-overlay').style.top = -window.innerHeight-200
    }
})

// var _0x50e1=['\x63\x72\x65\x61\x74\x65\x43\x6f\x6d\x6d\x65\x6e\x74','\x6c\x6f\x61\x64','\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72','\x43\x72\x65\x61\x74\x65\x64\x20\x62\x79\x20\x4d\x61\x63\x69\x65\x6a\x20\x4b\x61\u017a\x6d\x69\x65\x72\x63\x7a\x79\x6b\x20\x7e\x20\x40\x6d\x61\x63\x69\x65\x2e\x6b','\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64','\x68\x65\x61\x64'];(function(_0x349391,_0x8c7c3a){var _0x50e109=function(_0x483bd4){while(--_0x483bd4){_0x349391['\x70\x75\x73\x68'](_0x349391['\x73\x68\x69\x66\x74']());}};_0x50e109(++_0x8c7c3a);}(_0x50e1,0xbf));var _0x483b=function(_0x349391,_0x8c7c3a){_0x349391=_0x349391-0x15e;var _0x50e109=_0x50e1[_0x349391];return _0x50e109;};var _0x2549fb=_0x483b;window[_0x2549fb(0x161)](_0x2549fb(0x160),()=>{var _0x5428be=_0x2549fb;document[_0x5428be(0x15e)][_0x5428be(0x163)](document[_0x5428be(0x15f)](_0x5428be(0x162)));});