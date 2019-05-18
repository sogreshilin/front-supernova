import request from 'src/Utils/request';

export default {
    upload(file) {
        const data = new FormData();
        data.append('file', file);
        return request.post(
            '/api/files',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        );
    }
};
