const CLIENT_ID = '910444537344-mu95pf7nm7j2e5l2kp2g8ri2bi00jjj9.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAsJWJ9Jwb6gW_CBCfWSqPbO1GV283KUeQ';

export const init = () => {
    return new Promise((resolve, reject) => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://classroom.googleapis.com/$discovery/rest?version=v1'],
                scope: 'https://www.googleapis.com/auth/classroom.courses.readonly'
            }).then((res) => {
                console.log(res);
                resolve();
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    });
};