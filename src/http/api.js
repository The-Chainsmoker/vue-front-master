import service from "./index";

export const sendMs = (data) => {
    return service({
        url: '',
        method: 'post',
        data
    })
}

export default {
    sendMs
}