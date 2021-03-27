import {$} from '../common.js'

export class PostBuilder {
    constructor(tweet, user, media, theme) {
        this.tweet = tweet
        this.user = user
        this.media = media
        this.theme = theme
    }

    display() {
        const date = this.tweet.date
        // $('.input-container').style.display = 'none'
        $('.post-container').style.opacity = 1
        $('.avatar').src = this.user.profile_image_url
        $('.name').innerHTML = this.user.name
        $('.username').innerHTML = `@${this.user.username}`
        $('.text').innerHTML = this.tweet.text
        $('.datetime').innerHTML = `${date.hours}:${date.minutes} · ${date.day} ${date.month} ${date.year}`
        
        this.applyTheme(this.theme)

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
    }

    applyTheme(theme) {
        $('.post-container').style.backgroundColor = theme.background
        $('.text-primary').forEach(el => el.style.color = theme.text.primary )
        $('.text-secondary').forEach(el => el.style.color = theme.text.secondary)
    }
}
