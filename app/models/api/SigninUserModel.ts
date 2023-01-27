import { Instance } from "mobx-state-tree"
import { SigninUserModelBase } from "./SigninUserModel.base"

/* The TypeScript type of an instance of SigninUserModel */
export interface SigninUserModelType extends Instance<typeof SigninUserModel.Type> {}

/* A graphql query fragment builders for SigninUserModel */
export { selectFromSigninUser, signinUserModelPrimitives, SigninUserModelSelector } from "./SigninUserModel.base"

/**
 * SigninUserModel
 */
export const SigninUserModel = SigninUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
