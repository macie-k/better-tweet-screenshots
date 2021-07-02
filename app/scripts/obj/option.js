import { $ } from '../common.js'
import { activePost } from '../index.js'
import { Themes } from './theme.js'
import optionIcons from '../../img/icons/options/*.svg'

export class Option {
    constructor(type, styles, action, callback){
        this.current = 0
        this.type = type
        this.styles = styles
        this.element = $(`.option-${type}`)
        this.icon = $('img', this.element)
        this.element.addEventListener('click', () => {
            action(this.getNext(), this.setIcon.bind(this), this.element)
        })

        if(typeof x === 'function') {
            callback()
        }
    }

    getNext() {
        this.current = this.current === this.styles.length-1 ? 0 : this.current+1
        return this.styles[this.current]
    }

    setIcon(value) {
        this.icon.src = optionIcons[`${this.type}-${value ? value : this.styles[this.current]}`]
    }
}

export function loadOptions() {
    return [
        new Option('theme', Object.keys(Themes), (next, setIcon) => {
            activePost.applyTheme(Themes[next])
            setIcon(next.toLowerCase())
        }),

        new Option('datetime', ['full', 'date', 'disabled'], (next, setIcon, element) => {
            const tweetDate = $('.datetime')
            element.classList.remove('option-disabled')   

            switch(next) {
                case 'full':
                    tweetDate.querySelectorAll('span').forEach(el => {
                        el.style.opacity = 1
                        el.style.display = 'inline'
                    })
                    tweetDate.fadeIn(300, 'block')
                break

                case 'date':
                    tweetDate.querySelectorAll('span:not(.datetime-date)').forEach(el => {
                        el.fadeOut(300, true)
                    })
                break

                case 'disabled':
                    tweetDate.fadeOut(300, true)
                    element.classList.add('option-disabled')   
                break            
            }
        }),
        
        new Option('radius', [true, false], (next, setIcon) => {
            setIcon()
            
            const container = $('.post-container')
            if(next){
                container.classList.remove('border-off')
            } else {
                container.classList.add('border-off')
            }
        }),

        new Option('likes', ['disabled', 'outline', 'filled'], (next, setIcon, element) => {
            const tweetLikes = $('.likes') 
            if(next === 'disabled'){
                setIcon('outline')
                element.classList.add('option-disabled')
                tweetLikes.fadeOut(300, true)                                  // fade out actual likes amount
            } else {
                setIcon()
                element.classList.remove('option-disabled')
                tweetLikes.fadeIn(300, 'flex')
                $('img', tweetLikes).src = optionIcons[`likes-${next}`]
            }    
        })
    ]

}