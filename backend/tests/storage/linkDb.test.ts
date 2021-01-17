import { firebaseDb } from '../../src/clients/firebaseClient';
import { linkDb, LinkFirestore, SideEffect } from '../../src/storage/linkDb';
import { Link } from '../types';


// https://itnext.io/firebase-firestore-unit-testing-with-jest-and-kind-of-typescript-e26874196b1e

test('insert link successfully', async () => {
    const link = 'http://example.com';

    const doc = jest.fn();
    const collection = jest
        .spyOn(firebaseDb, 'collection')
        .mockReturnValue((({ doc }) as any));

    // const runTransaction = jest.fn()
    //     .mockImplementation((transaction: FirebaseFirestore.Transaction): Promise<Link>) => {
    //         // console.log('sideEffect');
    //         // sideEffect({} as Link);
    //         // return { create };
    //         return {transaction}
    //     }));

    const create = jest.fn();
    const transaction = jest.fn(() => ({ create }));
    const runTransaction = jest.fn()
        .mockImplementation(
            (callback: (t: any) => Promise<Link>) => {
                console.log('callback');
                return callback(transaction);
            });
    // const runTransaction = jest.fn();
    const runTransactionSpy = jest
        .spyOn(firebaseDb, 'runTransaction')
        .mockImplementation(runTransaction);
    // runTransaction.mockResolvedValue({ link: link });
    runTransaction.mockImplementation(
        (callback: (t: any) => Promise<Link>) => {
            console.log('callback');
            return callback(transaction);
        });
    // create.mockReturnValue({ link: link });

    const sideEffect: SideEffect<Link> = jest.fn();
    const result = await linkDb.create(link, sideEffect);

    console.log(result)

    expect(runTransactionSpy).toHaveBeenCalled();
    expect(runTransaction).toHaveBeenCalled();

    // expect(collection).toHaveBeenCalledWith('links');
    // expect(doc).toHaveBeenCalled();
    // expect(create).toHaveBeenCalled();
    // expect(sideEffect).toHaveBeenCalled();
    // expect(result.link).toBe(link);
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