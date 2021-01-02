import { pubSubClient } from "../../src/clients/pubsubClient";
import { proto } from "../../src/proto";

const publish = jest.fn()
const spyPubSubClient = jest
    .spyOn(pubSubClient, 'topic')
    .mockReturnValue((({ publish }) as any));

// linkPublisher import needs to come after mocks, 
// in order for linkPublisher get wired in.
const { linkPublisher } = require("../../src/events/linksPublisher");

afterEach(() => {
    jest.clearAllMocks();
});

test('successfully publishes create link event', async () => {
    publish.mockResolvedValue({});

    await linkPublisher.publishCreateEvent(
        proto.LinkCreateEvent.create({
            link: {
                id: 'test',
                link: 'http://example.com',
                createdAtMs: 12345,
            }
        })
    );

    expect(spyPubSubClient).toHaveBeenCalledWith('link_events_prod');
    expect(publish).toHaveBeenCalled();
});

test('re-throws errors on failure', async () => {
    const errorMessage = 'this is a test';
    publish.mockRejectedValue(Error(errorMessage));

    try {
        await linkPublisher.publishCreateEvent(
            proto.LinkCreateEvent.create({
                link: {
                    id: 'test',
                    link: 'http://example.com',
                    createdAtMs: 12345,
                }
            })
        );
    } catch (error) {
        expect(error.message).toBe(errorMessage);
    }

    expect(publish).toHaveBeenCalled();
});