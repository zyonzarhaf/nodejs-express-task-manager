export function toISOStringCustom () {
    return function (date) {
        const isDate = Object.prototype.toString.call(date) === '[object Date]';

        if (!isDate) return undefined;

        return new Date(date.getTime()).toISOString().split("T")[0];
    }
}

export function toLocaleDateStringCustom () {
    return function (date) {
        const isDate = Object.prototype.toString.call(date) === '[object Date]';

        if (!isDate) return undefined;

        return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toLocaleDateString();
    }
}

export function getElapsedTime () {
    return function (date) {
        const isDate = Object.prototype.toString.call(date) === '[object Date]';

        if (!isDate) return undefined;

        const created = date.getTime();
        const now = new Date().getTime();
        const result = now - created;
        const days = Math.floor(result / (1000 * 60 * 60 * 24));
        const hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((result % (1000 * 60)) / 1000);

        switch (true) {
            case days === 0 && hours === 0 && minutes === 0:
                return `${seconds} seconds`;
            case days === 0 && hours === 0:
                return `${minutes} minutes`;
            case days === 0:
                return `${hours} hours`;
            default:
                return `${days} days`;
        }
    }
}
