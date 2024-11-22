import { defineFunction } from "@aws-amplify/backend";

export const socialToBlog = defineFunction({
  name: "helloSocialToBlog",
  entry: "./handler.ts",
});