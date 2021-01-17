import { CollectionReference, DocumentData, Transaction } from "@google-cloud/firestore";
import { firebaseDb } from '../../src/clients/firebaseClient';
import { linkDb, SideEffect } from '../../src/storage/linkDb';
import { Link } from '../types';

beforeAll(() => {
    jest.clearAllMocks();
});

process.on('unhandledRejection', console.warn)

// https://itnext.io/firebase-firestore-unit-testing-with-jest-and-kind-of-typescript-e26874196b1e
test('insert link successfully', async () => {
    const doc = jest.fn();
    const collectionSpy = jest
        .spyOn(firebaseDb, 'collection')
        .mockReturnValue(({ doc }) as unknown as CollectionReference<DocumentData>);

    const create = jest.fn();
    const transaction = { create } as unknown as Transaction;
    const runTransactionSpy = jest
        .spyOn(firebaseDb, 'runTransaction')
        .mockImplementation((updateFunction: Function) => {
            return updateFunction(transaction);
        });

    const link = 'http://example.com';
    const sideEffect: SideEffect<Link> = jest.fn();
    const result = await linkDb.create(link, sideEffect);

    expect(runTransactionSpy).toHaveBeenCalled();
    expect(collectionSpy).toHaveBeenCalledWith('links');
    expect(doc).toHaveBeenCalled();
    expect(create).toHaveBeenCalled();
    expect(sideEffect).toHaveBeenCalled();
    expect(result.link).toBe(link);
});

test('insert link to throw error on duplicate document', async () => {
    const doc = jest.fn();
    const collectionSpy = jest
        .spyOn(firebaseDb, 'collection')
        .mockReturnValue(({ doc }) as unknown as CollectionReference<DocumentData>);

    const create = jest.fn();
    const transaction = { create } as unknown as Transaction;
    const runTransactionSpy = jest
        .spyOn(firebaseDb, 'runTransaction')
        .mockImplementation((updateFunction: Function) => {
            return updateFunction(transaction);
        });

    // transaction fails twice due to duplicate document, then succeeds
    create.mockImplementationOnce(() => { throw { code: 6 } });
    create.mockImplementationOnce(() => { throw { code: 6 } });
    create.mockReturnValue({});

    const sideEffect: SideEffect<Link> = jest.fn();

    const link = 'http://example.com';
    const result = await linkDb.create(link, sideEffect);
    
    expect(runTransactionSpy).toHaveBeenCalledTimes(3);
    expect(collectionSpy).toHaveBeenCalledWith('links');
    expect(doc).toHaveBeenCalledTimes(3);
    expect(create).toHaveBeenCalledTimes(3)
    expect(sideEffect).toHaveBeenCalledTimes(1);
    expect(result.link).toBe(link);
});

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


//test('transaction to revert if sideeffect throws', async () => {
// });