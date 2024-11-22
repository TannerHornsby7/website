import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { socialToBlog } from '../functions/social_to_blog/resource';

const schema = a.schema({
  
  socialToBlog: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(socialToBlog))
    .authorization((allow) => [allow.guest()]),

  Post: a
    .model({
      title: a.string(),
      content: a.string(),
      images: a.json(),
      createdAt: a.date(),
    })
    .authorization(
      (allow) => [allow.guest()]
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});