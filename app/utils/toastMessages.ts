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
  inputYTURL: {
    type: "error",
    ...en.toastMessages.ytUrlNotValid,
  },
  inputTitle: {
    type: "error",
    ...en.toastMessages.invalidTitle,
  },
  inputDescription: {
    type: "error",
    ...en.toastMessages.emptyDescription,
  },
  acceptTNC: {
    type: "error",
    ...en.toastMessages.acceptTNC,
  },
  videoUploadedSuccessfully: {
    type: "error",
    ...en.toastMessages.videoUploadedSuccessfully,
  },
  selectionCondition: {
    type: "error",
    ...en.toastMessages.selectCondition,
  },
  minimumOnePhotoRequired: {
    type: "error",
    ...en.toastMessages.minimumOnePhotoRequired,
  },
  createdSuccessfully: {
    type: "success",
    ...en.toastMessages.createdSuccessfully,
  },
}
