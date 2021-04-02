import {$} from '../common.js'
import {createScreenshot, positionSettings} from '../index.js'

export class PostBuilder {
    constructor(tweet, user, media, theme) {
        this.tweet = tweet
        this.user = user
        this.media = media
        this.theme = theme
    }

    async createPhoto() {
        const post = $('.post-container')
        const tmp = post.cloneNode(true)
        
        post.querySelectorAll('.media').forEach(el => {
            if(el.classList.contains('hidden')) {
                el.remove()
            }
        })

        await createScreenshot(post, $('.content'), true)
        $('.content').replaceChild(tmp, post)
    }

    display() {
        const date = this.tweet.date
        $('.post-container').style.opacity = 1
        $('.avatar').src = this.user.profile_image_url.replace('_normal', '')
        $('.name').innerHTML = this.user.name
        $('.username').innerHTML = `@${this.user.username}`
        $('.text').innerHTML = this.tweet.text
        $('.datetime').innerHTML = `${date.hours}:${date.minutes} · ${date.day} ${date.month} ${date.year}`
        
        this.applyTheme(this.theme)

        $('.media').forEach(el => {
            el.classList.add('hidden')
        })

        if(this.media !== undefined) {
            $('.text').classList.remove('nomedia')

            const amount = this.media.length
            const nr = amount <= 4 ? amount : 'multi'
            const mediaContainer = $(`.media-${nr}`)
                mediaContainer.classList.remove('hidden')

            if(amount === 1) {
                mediaContainer.querySelector('img').src = this.media[0].url
            } else {
                let counter = 0
                mediaContainer.querySelectorAll('.media-content').forEach(el => {
                    el.style.backgroundImage = `url(${this.media[counter++].url})`
                })
            }
        } else {
            $('.text').classList.add('nomedia')
        }

        $('.settings-container').style.opacity = 1
        positionSettings()
    }

    applyTheme(theme) {
        $('.post-container').style.backgroundColor = theme.background
        $('.text-primary').forEach(el => el.style.color = theme.text.primary)
        $('.text-secondary').forEach(el => el.style.color = theme.text.secondary)
    }
}
