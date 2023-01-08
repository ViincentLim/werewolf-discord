declare global {
    interface Array<T> {
        shuffle(): Array<T>
        random(): T
    }
}

Array.prototype.shuffle = function () {
    const array = [...this]
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random()*this.length)]
}

export {}