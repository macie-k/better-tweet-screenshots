import {$, isDesktop} from './common.js'
import dom2Img from 'dom-to-image'
import { PostBuilder } from './obj/PostBuilder.js'
import { Themes } from './obj/theme.js'
import { saveAs } from 'file-saver'
import optionIcons from '../img/icons/options/*.svg'

var activePost                  // storing activePost object from postBuilder
var showingPost = false
var showingSettings = false

const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB'
const themesTypes = Object.keys(Themes)     // storing available theme names from theme.Themes
const likesTypes = [                        // information about likes options  // outline & filled correspond to icons' filenames
    'disabled',
    'outline',
    'filled'
]
const dateTypes = [                         // information about date options
    'full',
    'date',
    'disabled'
]

/* set defaults */
themesTypes.active = 0
likesTypes.active = 0
dateTypes.active = 0

window.addEventListener('load', () => {
    $('.container').style.opacity = 1
    $('img').forEach(img => img.draggable = false)      // disable dragging for all images

    // todo: reading cookie for activeTheme

    console.log('%c Made by: %c https://kazmierczyk.me/', 'background: linear-gradient(to left bottom, #d16ba5, #cf6fb1, #cb73be, #c678cb, #be7ed7, #b388e2, #a692ec, #999bf4, #8ba9f8, #83b5f9, #82c0f6, #89c9f2); color: #fff;', '')
})

/* click event for "LOAD" button at the begininnig */
$('.load').addEventListener('click', async () => {
    const input = $('.tweet-input').value   // input node's value
    let id = input || undefined             // if input is empty set id to undefined otherwise to its value
    const split = input.split('/')          // check if full URL was provided, if yes extract id and set variable
    if(split.length > 1) {
        id = split[split.length-1]
    }

    $('.load').classList.add('dots')                    // start loading animation
    const results = await getTweetInformation(id)       // fetch tweet information
    const tweetData = parseTweetInformation(results)    // parse tweet information

    /* wait 0.5s and show post */
    setTimeout(() => {
        $('.load').classList.remove('dots')
        $('.input-overlay').style.top = -window.innerHeight-200
        $('.top-arrow').style.top = 10
        $('.top-arrow').classList.add('pulse')
    }, 500)    
    showTweet(tweetData)
})

/* event for top arrow to restore post input */
$('.top-arrow').addEventListener('click', () => {
    $('.input-overlay').style.top = 0
    showingPost = false
})

/* binding events to all options */
$('.option').forEach(option => {
    const type = option.id.replace('option-', '')       // extract option type from id
    option.addEventListener('click', function() {       // add event depending on type
        switch(type) {

            /* event for theme switching */
            case 'themes':
                themesTypes.active = themesTypes.active === themesTypes.length-1 ? 0 : themesTypes.active + 1   // increment or reset index
                const newTheme = themesTypes[themesTypes.active]                                                // save new theme name
                activePost.applyTheme(Themes[newTheme])                                                         // apply new theme
                $('.option-themes > img').src = optionIcons[`theme-${newTheme.toLowerCase()}`]                  // change brush icon based on selected theme
                break

            /* event for datetime style switching */
            case 'datetime':
                dateTypes.active = dateTypes.active === dateTypes.length-1 ? 0 : dateTypes.active + 1           // increment or reset index
                const dateType = dateTypes[dateTypes.active]                                                    // save datetime type

                /* if datetime should be hidden */
                if(dateType === 'disabled') {
                    $('.datetime').fadeOut(300, true)          // fadeout actual date
                    this.classList.add('option-disabled')      // set icon style to disabled
                    break
                } this.classList.remove('option-disabled')     // otherwise remove disabled style

                /* if datetime should be fully shown */
                if(dateType === 'full') {
                    /* load all parts */
                    $('.datetime').querySelectorAll('span').forEach(el => {
                        el.fadeIn(1, 'inline')
                    })
                    $('.datetime').fadeIn(300, 'block') // fade in container
                    break
                }

                /* if datetime should only show date */
                if(dateType === 'date') {
                    /* fade out all remaining elements */
                    $('.datetime').querySelectorAll('span:not(.datetime-date)').forEach(el => {
                        el.fadeOut(300, true)
                    })
                }
                break

            /* event for likes style switching */
            case 'likes':
                likesTypes.active = likesTypes.active === likesTypes.length-1 ? 0 : likesTypes.active + 1           // increment or reset index
                const newHeart = likesTypes[likesTypes.active]                                                      // save new likes style

                /* if likes hould be hidden */
                if(newHeart === 'disabled') {
                    $('.option-likes > img').src = optionIcons[`heart-outline`]     // set option icon to outline
                    this.classList.add('option-disabled')                           // set icon style to disabled
                    $('.likes').fadeOut(300, true)                                  // fade out actual likes amount
                    break
                }

                /* check if likes are hidden & fade them back */
                if(this.classList.contains('option-disabled')) {
                    this.classList.remove('option-disabled')
                    $('.likes').fadeIn(300, 'flex')
                }
                /* set icons' style according to selected type */
                $('.likes > img').src = optionIcons[`heart-${newHeart}`]
                $('.option-likes > img').src = optionIcons[`heart-${newHeart}`]
                break
        }        
    })
})

/* show or hide settings on click */
$('.settings').addEventListener('click', () => {
    if(showingSettings) {
        hideSettings()
    } else {
        showSettings()
    }
})

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
    activePost = new PostBuilder(data.tweet, data.user, data.media, Themes[themesTypes[themesTypes.active]])   // create new post
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
    const tweet = {
        id: tweet_data.id,
        likes: tweet_data.public_metrics.like_count,
        date: tweetDate,
        text: tweet_data.text.split(' ').filter(el => !el.includes('t.co')).join(' ')   // remove t.co/id link from tweet text
    }
    const user = data.includes.users[0]     // save user information
    const media = data.includes.media       // save media information

    return {tweet: tweet, user: user, media:media}
}

async function getTweetInformation(id = '1343331784621256709') {
    /* if ID is empty // currently overriden */
    if(id === undefined) {
        return undefined
    }

    const endpointURL = 'https://api.twitter.com/2/tweets/'     // api endpoint
    const prefix = 'https://cors.bridged.cc/'                   // CORS proxy server
    const params = {
        "tweet.fields": "created_at,author_id,public_metrics",                  // tweet parameters
        "expansions": "author_id,attachments.media_keys",                       // additional fields
        "user.fields": "created_at,profile_image_url,username,verified,name",   // user parameters
        "media.fields": "url,preview_image_url,height,width"                    // media parameters
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
    })

    return res
}

/* function for creating style divs // currently not used */
// function loadThemes() {
//     const themeContainer = $('.theme-container')
//     for(let [name, theme] of Object.entries(Themes)) {
//         const div = document.createElement('div')
//             div.classList.add('theme')
//             div.classList.add(name)
//             div.dataset.color = theme.background
//             div.style.backgroundColor = theme.background
//             div.addEventListener('click', function() {
//                 activePost.applyTheme(theme)
//             })
//         themeContainer.appendChild(div)
//     }
// }

/* temporary option to actually save screenshot */
$('.avatar').addEventListener('click', () => {
    activePost.createPhoto()
})

export async function createScreenshot(sourceNode, targetNode, download=true) {
    if(download) {
        await dom2Img.toBlob(sourceNode, {
            /* temporary override style to avoid weird cropping */
            style: {
                marginTop: 0,
                top: 0,
                position: 'unset',                
            }
        }).then(function (blob) {
            window.saveAs(blob, 'my-node.png'); // probably "author_name + date" in the future
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

window.addEventListener('resize', () => {
    if(showingPost) {
        $('.input-overlay').style.top = -window.innerHeight-200     // in case of vertical resize keep overlay above
        
        /* position post container */
        $('.post-container').style[isDesktop() ? 'top' : 'marginTop'] = activePost.getPostTop()
        $('.post-container').style[!isDesktop() ? 'top' : 'marginTop'] = ''
    }
})

// var _0x50e1=['\x63\x72\x65\x61\x74\x65\x43\x6f\x6d\x6d\x65\x6e\x74','\x6c\x6f\x61\x64','\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72','\x43\x72\x65\x61\x74\x65\x64\x20\x62\x79\x20\x4d\x61\x63\x69\x65\x6a\x20\x4b\x61\u017a\x6d\x69\x65\x72\x63\x7a\x79\x6b\x20\x7e\x20\x40\x6d\x61\x63\x69\x65\x2e\x6b','\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64','\x68\x65\x61\x64'];(function(_0x349391,_0x8c7c3a){var _0x50e109=function(_0x483bd4){while(--_0x483bd4){_0x349391['\x70\x75\x73\x68'](_0x349391['\x73\x68\x69\x66\x74']());}};_0x50e109(++_0x8c7c3a);}(_0x50e1,0xbf));var _0x483b=function(_0x349391,_0x8c7c3a){_0x349391=_0x349391-0x15e;var _0x50e109=_0x50e1[_0x349391];return _0x50e109;};var _0x2549fb=_0x483b;window[_0x2549fb(0x161)](_0x2549fb(0x160),()=>{var _0x5428be=_0x2549fb;document[_0x5428be(0x15e)][_0x5428be(0x163)](document[_0x5428be(0x15f)](_0x5428be(0x162)));});