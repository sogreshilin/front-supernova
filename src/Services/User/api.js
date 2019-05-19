import request from 'src/Utils/request';

export default {

    getUserByVkId(vkId) {
        return request.get(`/api/persons/vk/${vkId}`);
    },

    getUserById(id) {
        return request.get(`/api/persons/${id}`);
    },

    createPerson(person) {
        return request.post('/api/persons', person);
    }

};