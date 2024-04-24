import { message } from "antd"

class UtilClass {

    isDev = () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return true
        } else {
            return false
        }
    }

    Input = (key, value, stateSetter) => {
        //const key = target.name
        // const value = target.value


        try {
            stateSetter((old) => {
                return { ...old, [key]: value }
            })
        } catch {
            if (!stateSetter) {
                console.log('need stateSetter')
            }
        }

    }

    filterNullFromArray = (array) => {
        return array.filter(x => !!x)
    }

    disableScroll = (enable = true, name = "scroll-able") => {
        if (enable) document.querySelector(`.${name}`).classList.add('disablScroll');
        if (!enable) document.querySelector(`.${name}`).classList.remove('disablScroll');
        console.log(enable)
    }

    getRandNum = (max = 99999) => { return Math.floor(Math.random() * max) + 1; }


    getRandTextNum = (size = 7) => {
        const result = Math.random().toString(36).substring(2, size < 7 ? 7 : size);
        return result;

    }


    //return a new object containing only the properties from obj for which filterFunc returns true.
    filterObject = (obj, filterFunc) => {
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

        var filtered = Object.filter(obj, filterFunc);
        return (filtered);

    }


    //turns a file into a 64bit encode that can be used as url
    getBase64OfFile = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    createArray = (length) => {
        const newArray = Array.from({ length: length }, (value, index) => index)

        return newArray
    }

    makeArrayUniq = (array) => {
        return [...new Set(array)]

    }

    formatNumber = (num) => {
        if (num < 1000) return num
        if (num >= 1000000000) return String(num / 1000000000).substring(0, 5) + 'B'
        if (num >= 1000000) return String(num / 1000000).substring(0, 5) + 'M'
        if (num >= 1000) return (String(num / 1000).substring(0, 5) + 'K')
    }

    notify = {
        error: (text) => { message.error(text) },
        success: (text) => { message.success(text) }
    }

}


export default UtilClass