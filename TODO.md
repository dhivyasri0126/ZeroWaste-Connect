# TODO

## Goal: Fix “failed to fetch” after login

1. Update backend CORS configuration (Spring Security) to allow the React dev origin(s).
2. Update controller-level `@CrossOrigin` where needed to match the same allowed origins.
3. (Optional) Improve frontend login error handling for better diagnostics.
4. Restart backend and re-test login + `/auth/profile` call. ✅


