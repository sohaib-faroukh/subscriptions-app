// import * as admin from 'firebase-admin';
import firebase from 'firebase';
import { getEnvironment } from '../server/environments/env.util';


const settings = getEnvironment();

firebase.initializeApp( settings.firebase );

export const db = firebase.database();
export const auth = firebase.auth;
export const fbstorage = firebase.storage();
// export const bucket = fbstorage..bucket();
// export const appOptions = { credential: admin.credential.cert( settings.firebase.cred ), databaseURL: settings.firebase.databaseURL };
