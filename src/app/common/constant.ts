export const REGEX = {
    USERNAME: /^[a-zA-Z,'.\-\s]*$/,
    EMAIL: /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/,
    PASSWORD: /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    CPF: /\d{3}\.\d{3}\.\d{3}\-\d{2}/,
    YOUTUBE_LINK: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/,
    PHONE: /^[6-9]\\d{9}$/,
    DOMAIN: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    ACCOUNT_NUMBER: /^[0-9]{9,18}$/
}


export const Main_Paths =
{
    DEFAULT: '',
    AUTH: 'auth',
    MAIN: 'main',
    MATCH :'full'
}

export const Paths = {
    AUTH: {
        LOGIN: 'login',
        SIGNUP: 'sign-up',
        VERIFY_EMAIL: 'verify-email',
        FORGOT_PASSWORD: 'forgot'
    },

    MAIN:
    {
        HOME: 'home',
        CREATE: 'create_post',
        SHOWPOST : 'show-post',
        BLOCK :'block-post',
        PROFILE :'profile'
    }
};

export const STORAGE_KEYS = {
    TOKEN: 'token',
    RESET_TOKEN: 'resetToken',
    USER_DATA: 'userData'
};

export const DEFAULT =
{
    PROFILE : "https://firebasestorage.googleapis.com/v0/b/feedstoryapp-25fc5.appspot.com/o/images.png?alt=media&token=53b38a10-9c8c-466f-87c9-f694e4f1b852",
    TRUE : true,
    FALSE : false ,
    VEDIO : 2,
    IMAGE : 1
}