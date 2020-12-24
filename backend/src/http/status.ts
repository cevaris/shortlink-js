import axios from 'axios';

interface HttpStatus {
    get(link: string): Promise<number>;
}

class AxiosHttpStatus implements HttpStatus {
    async get(link: string): Promise<number> {
        try {
            const response = await axios.get(link, { timeout: 10 * 1000 });
            return response.status;
        } catch (error) {
            // https://stackoverflow.com/questions/49967779/axios-handling-errors
            if (error.response && error.response.status) {
                // response returned failing HTTP status code
                return error.response.status as number;
            } else {
                // failed to make request
                throw error;
            }
        }
    }
}

export const httpStatus = new AxiosHttpStatus();