'use strict';

const path = require('path');
const google = require('@googleapis/forms');
const {
    authenticate,
} = require('@google-cloud/local-auth');

// const formID = '1m1FMrF8iPz-XJU9v8yMjrc4Zq5XnwwLYjqZJOxnc0c4';

const getResFromApiService = async (formID) => {
    console.log("inside getResFromApi")
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, '../credentials.json'),
        scopes: 'https://www.googleapis.com/auth/forms.responses.readonly',
    });
    const forms = google.forms({
        version: 'v1',
        auth: auth,
    });
    const res = await forms.forms.responses.list({
        formId: formID,
    });
    return res.data;
}

if (module === require.main) {
    getResFromApiService(formID).catch(console.error);
}
module.exports = {getResFromApiService}
