//export const API_BASE_URL = 'https://localhost:44302/api';
export const API_BASE_URL = 'https://stupefied-proskuriakova.69-10-42-234.plesk.page/api';

export const Auth_Urls = {
    IsTenantAvailable: API_BASE_URL + '/services/app/Account/IsTenantAvailable',
    TokenAuth_Authenticate: API_BASE_URL + '/TokenAuth/Authenticate'
}

export const Profile_Urls = {
    GetCurrentUserProfileForEdit: API_BASE_URL + '/services/app/Profile/GetCurrentUserProfileForEdit',
    GetProfilePicture: API_BASE_URL + '/services/app/Profile/GetProfilePicture'
}

export const AppConst = {
    TenantID: 'Abp.TenantId',
    TenantName: 'Abp.TenantName',
    CurrentUser: 'Abp.Current.User'
}