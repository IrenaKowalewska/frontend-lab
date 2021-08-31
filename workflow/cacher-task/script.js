const input = document.querySelector('input');
const calcBtn = document.querySelector('button');
const resultBlock = document.querySelector('.result');

class Cacher {
    constructor() {
        this.cacheResult = Object.create(null);
        this.md5Hash = new Hashes.MD5();
    }
    withCache(fn) {
        return (...args) => {
            const hashKey = this.md5Hash.hex(args.join(''));
            if (hashKey in this.cacheResult) {
                return `${this.cacheResult[hashKey]} (from cache)`;
            } else {
                let result = fn(math.bignumber(...args));
                this.cacheResult[hashKey] = result;
                return result;
            }
        }
    }
}

const showResult = () => {
    const inputValue = input.value;
    if (!inputValue) {
        resultBlock.textContent = 'Enter number';
        return false
    }
    const resultText = cachedFactorial(inputValue);
    resultBlock.textContent = resultText;
    input.value = '';
}

const cacher = new Cacher();
const cachedFactorial = cacher.withCache(math.factorial);
calcBtn.addEventListener('click', showResult);