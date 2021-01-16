import { newId } from "../../src/storage/id";

test('valid length returns valid id', () => {
    const id = newId(10);
    expect(id.length).toBe(10);
});

test('invalid length throws error', () => {
    try {
        newId(-10);
        fail('should not have gotten here');
    } catch (error) {
        expect(error.message).toBe(
            `invalid "id" length "-10".`
        );
    }
});