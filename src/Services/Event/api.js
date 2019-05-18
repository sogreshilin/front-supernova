import request from 'src/Utils/request';

export default {
    createEvent(event) {
        return request.post(
            '/api/events',
            event
        );
    }
}

