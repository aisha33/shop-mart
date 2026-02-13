interface SuccessSignupResponse {
  message: string
  token: string
  user: {
    name: string
    email: string
    role: string
    _id: string
  }
}

interface FailedSignupResponse {
  message: string
}