import * as firebase from "@firebase/testing";
import { jest, test } from '@jest/globals';
import { AppOptions } from "firebase-admin";
import { LinkFirestore, SideEffect } from '../../src/storage/linkDb';
import { Link } from '../types';


firebase.firestore.setLogLevel('debug');
const options: AppOptions = {
    databaseURL: 'localhost:9000',
    projectId: 'shortlink-project-id',
};
const db = firebase.initializeTestApp(options).firestore();
const testLinkDb = new LinkFirestore(db as any);

// https://claritydev.net/blog/testing-firestore-locally-with-firebase-emulators/
beforeAll(async () => {
    // const emulator = await syncExec('firebase emulators:start');
    // console.log(emulator);
    // factory.set(firebase.initializeTestApp({}).firestore())
});

test('insert link successfully', async () => {
    const link = 'http://example.com';

    const sideEffect: SideEffect<Link> = jest.fn();

    const result = await testLinkDb.create(link, sideEffect);

    console.log(result);

});


// https://itnext.io/firebase-firestore-unit-testing-with-jest-and-kind-of-typescript-e26874196b1e

// test('insert link successfully', async () => {
//     const link = 'http://example.com';

//     // const create = jest.fn();
//     const doc = jest.fn(); //jest.fn(() => ({ create }));
//     const collection = jest
//         .spyOn(firebaseDb, 'collection')
//         .mockReturnValue((({ doc }) as any));
//     // create.mockReturnValue({});


//     const create = jest.fn();
//     const transaction = jest.fn((callback: Function) => {
//         console.log('callbak');
//         callback();
//         return { create };
//     });
//     const fbTrans = jest
//         .spyOn(firebaseDb, 'runTransaction')
//         .mockReturnValue((({ transaction }) as any));
//     create.mockReturnValue({});

//     const sideEffect: SideEffect<Link> = jest.fn();

//     const result = await linkDb.create(link, sideEffect);

//     expect(collection).toHaveBeenCalledWith('links');
//     expect(doc).toHaveBeenCalled();
//     expect(create).toHaveBeenCalled();
//     expect(result.link).toBe(link);
// });

// test('insert link to throw error on duplicate document', async () => {
//     const link = 'http://example.com';

//     const create = jest.fn();
//     const doc = jest.fn(() => ({ create }));
//     const collection = jest
//         .spyOn(firebaseDb, 'collection')
//         .mockReturnValue((({ doc }) as any));
//     // mocks 2 duplicate code failures, then succeed
//     create.mockRejectedValueOnce({ code: 6 });
//     create.mockRejectedValueOnce({ code: 6 });
//     create.mockReturnValue({});

//     const result = await linkDb.create(link);

//     expect(collection).toHaveBeenCalledWith('links');
//     expect(doc).toHaveBeenCalled();
//     expect(create).toHaveBeenCalled();
//     expect(result.link).toBe(link);
// });

// test('insert link to throw error', async () => {
//     const link = 'http://example.com';
//     const message = 'test error.';

//     const create = jest.fn();
//     const doc = jest.fn(() => ({ create }));
//     const collection = jest
//         .spyOn(firebaseDb, 'collection')
//         .mockReturnValue((({ doc }) as any));
//     create.mockRejectedValue(new Error(message));

//     try {
//         await linkDb.create(link);
//         fail('call should have thrown');
//     } catch (error) {
//         expect(error.message).toBe(message);
//     }

//     expect(collection).toHaveBeenCalledWith('links');
//     expect(create).toHaveBeenCalled();
//     expect(doc).toHaveBeenCalled();
// });