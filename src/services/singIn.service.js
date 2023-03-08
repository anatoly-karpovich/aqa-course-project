class SignInService {
    static async signIn(credentials) {
        const options = {
            method: "post",
            baseURL: BASE_URL,
            url: ENDPOINTS.Login,
            headers: { 
                Authorization: getAuthorizationCookie(),
                ["Content-Type"]: "application/json" 
            },
            data: credentials
          };
          return sendRequest(options);
    }
}