import {$, isDesktop} from '../common.js'
import {createScreenshot, urlRegex} from '../index.js'
import {placeholder} from '../../img/*.png'
import { Themes } from './theme.js'

/*
    class for creating, displaying and managing post
*/

export class PostBuilder {

    static activeTheme = Themes.WHITE;      // set the default theme to WHITE

    constructor(tweet, user, media, theme) {
        this.tweet = tweet
        this.user = user
        this.media = media
        this.theme = theme || PostBuilder.activeTheme
    }

    /* create screenshot */
    async createPhoto() {
        const post = $('.post-container')      

        /* hide all elements that should be ignored */ 
        post.querySelectorAll('*').forEach(el => {
            if(el.classList.contains('ignore')) {
                el.fadeOut(200, true, undefined, async () => {
                    await createScreenshot(post, $('.content')) // save screenshot

                    /* restore ignored elements */
                    post.querySelectorAll('*').forEach(el => {
                        if(el.classList.contains('ignore')) {
                            el.fadeIn(300, true)
                        }
                    })
                })
            }
        })        
    }

    display() {
        this.build(false)
        // if(this.tweet.referenced_tweet !== undefined) {
        //     this.createReferencedTweet()
        //     this.build(true)
        // }
    }

    /* show post */
    build(reference=false) {
        const prefix = reference ? 'ref-' : ''
        const container = $(`.${prefix}post-container`)
        const user = reference ? this.tweet.referenced_tweet.user : this.user 
        const tweet = reference ? this.tweet.referenced_tweet.tweet : this.tweet 
        const media = reference ? this.tweet.referenced_tweet.media : this.media

        const date = tweet.date
        const likes = tweet.likes

        /* fill in all post's information */
        container.style.opacity = 1
        $('.avatar', container).src = user.profile_image_url.replace('_normal', '')
        $('.name').innerHTML = user.name
        $('.username').innerText = `@${user.username}`
        $('.text').innerHTML = this.parseText(tweet.text)
        $('.datetime-time').innerHTML = `${date.hours}:${date.minutes}`
        $('.datetime-date').innerHTML = `${date.day} ${date.month} ${date.year}`
        $('.likes-amount').innerHTML = likes >= 1000 ? `${parseFloat(likes/1000.0).toFixed(1)}k` : likes    // format likes with 'k' suffix if more than 1000

        $('.verified').style.display = (user.verified) ? 'inline-block' : 'none'

        this.applyTheme(this.theme)

        /* hide all media divs */
        $('.media').forEach(el => {
            el.classList.add('hidden')
        })

        $('.media-1 > img').src = placeholder                // reset photo url (needed when using top-arrow to re-enter post)

        /* fill in & display correct media div */
        if(media !== undefined) {
            $('.text').classList.remove('nomedia')

            const amount = media.length                    // count how many media files are in post
            const mediaContainer = $(`.media-${amount}`)        // select container based on media amount
                mediaContainer.classList.remove('hidden')       // unhide it

            /* if only one media post */
            if(amount === 1) {
                mediaContainer.querySelector('img').src = (media[0].type === 'photo') ? media[0].url : media[0].preview_image_url    // set either photo or video thumnail as post src
            } else {    // case for 2-4 media files
                let counter = 0
                /* load fetched images as background images */
                mediaContainer.querySelectorAll('.media-content').forEach(el => {
                    const image = media[counter].type === 'photo' ? media[counter].url : media[counter].preview_image_url
                    el.style.backgroundImage = `url(${image})`
                    counter++
                })
            }
        } else {
            $('.text').classList.add('nomedia')
        }
    }

    /* colorize links, #s and @s with accent color */
    parseText(text) {
        if(!text) return ''

        const newlineSplit = text.split('\n')
        let finalText = ''

        newlineSplit.forEach(line => {
            finalText += line + ' <br> '
        })

        const spaceSplit = finalText.split(' ')
        finalText = ''

        spaceSplit.forEach(word => {
            if((word.charAt(0) === '@') || (word.charAt(0) === '#') || (urlRegex.test(word))) {
                finalText += `<span class="text-accent">${word} </span>`
            } else {
                if(word.includes('#')) {
                    finalText += `<span class="text-accent">${word.substring(word.indexOf('#') + 1)} </span>`
                    return
                }
                if(word.includes('@')) {
                    finalText += `<span class="text-accent">${word.substring(word.indexOf('@') + 1)} </span>`
                    return
                }
                finalText += word + ' '
            }            
        })
        
        finalText.trim()
        return finalText
    }

    createReferencedTweet() {
        const baseContainer = $('.post-container')
        const refContainer = baseContainer.cloneNode(true);
            refContainer.className = '.ref-post-container'
            refContainer.querySelector('.bubbles-container').remove()
            
        baseContainer.appendChild(refContainer)
    }

    applyTheme(theme) {
        PostBuilder.activeTheme = theme

        $('.post-container').style.backgroundColor = theme.background
        $('.text-primary', document, true).forEach(el => el.style.color = theme.text.primary)
        $('.text-secondary', document, true).forEach(el => el.style.color = theme.text.secondary)
        $('.text-accent', document, true).forEach(el => el.style.color = theme.accent)
        $('.verified > path').style.fill = theme.text.primary
    }
}
