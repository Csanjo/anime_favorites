import { defineData, a, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({

  Favorite: a
    .model({
      userId: a.string().required(),
      animeId: a.integer().required(),
      title: a.string(),
      imageUrl: a.string(),
    })
    .authorization((allow) => [
      allow.owner()
    ])
    .identifier(["userId", "animeId"])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema
});
