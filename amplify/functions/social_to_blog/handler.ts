import type { Schema } from '../../data/resource';

export const handler: Schema['socialToBlog']['functionHandler'] = async (event, context) => {
    return "Hello, World!";
};