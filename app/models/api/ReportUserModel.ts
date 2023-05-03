import { Instance } from "mobx-state-tree"
import { ReportUserModelBase } from "./ReportUserModel.base"

/* The TypeScript type of an instance of ReportUserModel */
export interface ReportUserModelType extends Instance<typeof ReportUserModel.Type> {}

/* A graphql query fragment builders for ReportUserModel */
export { selectFromReportUser, reportUserModelPrimitives, ReportUserModelSelector } from "./ReportUserModel.base"

/**
 * ReportUserModel
 */
export const ReportUserModel = ReportUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
