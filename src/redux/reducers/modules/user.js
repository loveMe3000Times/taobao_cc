import { USER_UPDATE } from '../../action-types';

// 用户信息
export default function user(state = {}, action) {
    switch (action.type) {
        case USER_UPDATE: { return action.data; }
        default: { return state; }
    }
}