import {$, isDesktop} from '../common.js'
import {createScreenshot} from '../index.js'

/*
    class for creating, displaying and managing post
*/


export class PostBuilder {

    constructor(tweet, user, media, theme) {
        this.tweet = tweet
        this.user = user
        this.media = media
        this.theme = theme
        this.top    // storing later calculated post top/margin-top value
    }

    /* create screenshot */
    async createPhoto() {
        const post = $('.post-container')      

        /* hide all elements that should be ignored */ 
        post.querySelectorAll('*').forEach(el => {
            if(el.classList.contains('ignore')) {
                el.style.display = 'none'
            }
        })
    
        await createScreenshot(post, $('.content'))     // save screenshot

        /* restore ignored elements */
        post.querySelectorAll('*').forEach(el => {
            if(el.classList.contains('ignore')) {
                el.style.display = ''
            }
        })
    }

    /* show post */
    display() {
        const date = this.tweet.date
        const likes = this.tweet.likes

        const croppedMaxHeight = 0.55 * window.innerHeight      // media-1 cropped photo height limit (55vh)
        const postPadding = 20                                  // default post padding (20px)

        /* fill in all post's information */
        $('.post-container').style.opacity = 1
        $('.avatar').src = this.user.profile_image_url.replace('_normal', '')
        $('.name').innerHTML = this.user.name
        $('.username').innerHTML = `@${this.user.username}`
        $('.text').innerHTML = this.tweet.text
        $('.datetime-time').innerHTML = `${date.hours}:${date.minutes}`
        $('.datetime-date').innerHTML = `${date.day} ${date.month} ${date.year}`
        $('.likes-amount').innerHTML = likes >= 1000 ? `${parseFloat(likes/1000.0).toFixed(1)}k` : likes    // format likes with 'k' suffix if more than 1000

        this.applyTheme(this.theme)

        /* hide all media divs */
        $('.media').forEach(el => {
            el.classList.add('hidden')
        })

        var actualHeight = 0                                 // variable to store pre-calculated post height (before the photos are downloaded, based on api dimensions information)
        /* fill in & display correct media div */
        if(this.media !== undefined) {
            $('.text').classList.remove('nomedia')

            const amount = this.media.length                    // count how many media files are in post
            const mediaContainer = $(`.media-${amount}`)        // select container based on media amount
                mediaContainer.classList.remove('hidden')       // unhide it

            /* if only one media post */
            if(amount === 1) {
                const whRatio = this.media[0].width / this.media[0].height                  // calculate width to height ratio based on API information
                const postInnerWidth = $('.post-container').offsetWidth - postPadding*2     // get post-container media space width

                actualHeight = postInnerWidth / whRatio     // calculate predicted photo height from post width and w/h ratio
                if($('.media-1 > img').classList.contains('cropped') && actualHeight > croppedMaxHeight) {      // if "cropped" option is selected re-calculate height if needed
                    actualHeight = croppedMaxHeight
                }

                actualHeight += $('.post-container').offsetHeight
                mediaContainer.querySelector('img').src = ''    // reset photo url (needed when using top-arrow to re-enter post)
                mediaContainer.querySelector('img').src = (this.media[0].type === 'photo') ? this.media[0].url : this.media[0].preview_image_url    // set either photo or video thumnail as post src
            } else {    // case for 2-4 media files
                let counter = 0
                /* load fetched images as background images */
                mediaContainer.querySelectorAll('.media-content').forEach(el => {
                    const image = this.media[counter].type === 'photo' ? this.media[counter].url : this.media[counter].preview_image_url
                    el.style.backgroundImage = `url(${image})`
                    counter++
                })
                actualHeight = $('.post-container').offsetHeight
            }
        } else {
            actualHeight += $('.post-container').offsetHeight
            $('.text').classList.add('nomedia')
        }
        
        this.top = (window.innerHeight - actualHeight) / 2     // calculate center for post

        $('.post-container').style[isDesktop() ? 'top' : 'marginTop'] = this.top   // set post position
        $('.settings-container').style.opacity = 1      // fade in settings container
    }

    applyTheme(theme) {
        $('.post-container').style.backgroundColor = theme.background
        $('.text-primary').forEach(el => el.style.color = theme.text.primary)
        $('.text-secondary').forEach(el => el.style.color = theme.text.secondary)
    }

    getPostTop() {
        return this.top
    }
}
