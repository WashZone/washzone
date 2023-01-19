import en from "../i18n/en"

export const toastMessages = {
  videoSavedSuccessfully: {
    type: "success",
    ...en.toastMessages.videoSavedSuccessfully,
  },
  classifiedUnsavedSuccessfully: {
    type: "success",
    ...en.toastMessages.classifiedUnsavedSuccessfully,
  },
  classifiedSavedSuccessfully: {
    type: "success",
    ...en.toastMessages.classifiedSavedSuccessfully,
  },
  videoUnsavedSuccessfully: {
    type: "success",
    ...en.toastMessages.videoUnsavedSuccessfully,
  },
  passwordResetSuccess: {
    type: "success",
    ...en.toastMessages.passwordResetSuccess,
  },
  passwordResetFailed: {
    type: "error",
    ...en.toastMessages.somethingWentWrong,
  },
  incorrectCredentials: {
    type: "error",
    ...en.toastMessages.incorrectCredentials,
  },
  somethingWentWrong: {
    type: "error",
    ...en.toastMessages.somethingWentWrong,
  },
  emailAlreadyExists: {
    type: "error",
    ...en.toastMessages.emailAlreadyExists,
  },
}
