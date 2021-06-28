export function $(selector, parent=document, forceArray=false) {
    const nodes = parent.querySelectorAll(selector);
    const nodesArray = Array.from(nodes);

    return forceArray ? nodesArray
            : (nodesArray.length == 1 || nodesArray.length == 0) ? nodesArray[0] : nodesArray; 
}

export function isDesktop() {
    return window.innerWidth > 775;
}

export function isBoolean(val) {
    return val === "true" || val === "false";
}

export function isNumber(val) {
    return !isNaN(parseInt(val));
}

Element.prototype.animate = function(property, value, duration=400, timing='ease-in-out', callback) {
    this.classList.add('animating');
    this.style.transition = `${property} ${duration}ms ${timing}`;

    setTimeout(() => {
        this.style[property] = value;
        this.addEventListener('transitionend', () => {
            this.classList.remove('animating');
            if(typeof callback == "function") {
                callback();
            }
        });
    }, 100);
}

Element.prototype.fadeIn = function(duration=400, display=false, limit=1, callback) {
    const currentTransiton = this.style.transition;

    this.classList.add('fading');
    this.style.transition = `opacity ${duration}ms ease-in`;
    if(display) {
        this.style.display = display === true ? '' : display;
    }

    setTimeout(() => {
        this.style.opacity = limit;
    }, 100);

    setTimeout(() => {
        this.classList.remove('fading');
        this.style.transition = currentTransiton;

        if(typeof callback == 'function') {
            callback();
        }
    }, duration + 200);

};

Element.prototype.fadeOut = function(duration=400, disable=false, limit=0, callback) {
    const currentTransiton = this.style.transition;

    this.classList.add('fading');
    this.style.transition = `opacity ${duration}ms ease-out`;
    setTimeout(() => {
        this.style.opacity = limit;
    }, 100);

    setTimeout(() => {
        this.classList.remove('fading');
        this.style.transition = currentTransiton;
        if(disable) {
            this.style.display = 'none';
        }
        if(typeof callback == 'function') {
            callback();
        }
    }, duration + 200);
};

Element.prototype.data = function(key, value) {
    if(value === undefined) {
        const rawVal = this.getAttribute(`data-${key}`);
        let returnVal = rawVal;

        if(isNumber(rawVal)) returnVal = parseInt(rawVal);
        if(isBoolean(rawVal)) returnVal = (rawVal == 'true');

        return returnVal;
    } else {
        return this.setAttribute(`data-${key}`, value);
    }
}