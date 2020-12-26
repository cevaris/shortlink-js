import { newSlug } from "../../src/storage/slug";

test('valid length returns valid slug', () => {
    const slug = newSlug(10);
    expect(slug.length).toBe(10);
});

test('invalid length throws error', () => {
    try {
        newSlug(-10);
        fail('should not have gotten here');
    } catch (error) {
        expect(error.message).toBe(
            `invalid newSlug length "-10".`
        );
    }
});