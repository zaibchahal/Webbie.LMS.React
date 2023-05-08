import { load } from 'gapi-script';

const CLIENT_ID = '328801390833-j1pum5qtuqp9h598ovn0s3u2p821ur19.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAsJWJ9Jwb6gW_CBCfWSqPbO1GV283KUeQ';

export const init = () => {
    return new Promise((resolve, reject) => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://classroom.googleapis.com/$discovery/rest?version=v1'],
                scope: 'https://www.googleapis.com/auth/classroom.courses.readonly'
            }).then(() => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    });
};