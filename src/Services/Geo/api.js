import request from 'src/Utils/request';

export default {
    suggestions(query) {
        return request.post(
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            {'query': query},
            {
                headers: {
                    'Authorization': 'Token 52f363c633e8c727ab3363f5d6a964a9a7bee0c6'
                }
            }
        );
    }
};
