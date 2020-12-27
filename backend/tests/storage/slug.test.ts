import { newId } from "../../src/storage/id";

test('valid length returns valid slug', () => {
    const slug = newId(10);
    expect(slug.length).toBe(10);
});

test('invalid length throws error', () => {
    try {
        newId(-10);
        fail('should not have gotten here');
    } catch (error) {
        expect(error.message).toBe(
            `invalid newSlug length "-10".`
        );
    }
});