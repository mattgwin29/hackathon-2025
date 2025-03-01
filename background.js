// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startOAuth") {
      initiateOAuthFlow()
        .then(token => {
          sendResponse({ success: true, token });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true; // Keep the message channel open for async
    }
  });
  
  /**
   * Launch Google OAuth and return the access token.
   */
  function initiateOAuthFlow() {
    return new Promise((resolve, reject) => {
      const redirectUri = chrome.identity.getRedirectURL("oauth2");
      const clientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
      const scopes = ["profile", "email"]; 
      const authUrl = 
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" + clientId +
        "&redirect_uri=" + encodeURIComponent(redirectUri) +
        "&response_type=token" +
        "&scope=" + encodeURIComponent(scopes.join(" ")) +
        "&prompt=consent";
  
      chrome.identity.launchWebAuthFlow(
        { url: authUrl, interactive: true },
        (redirectedTo) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          if (redirectedTo) {
            // Example final redirect:
            //   https://<extension-id>.chromiumapp.org/oauth2#access_token=XYZ&token_type=Bearer&expires_in=...
            const urlFragment = redirectedTo.split('#')[1];
            if (!urlFragment) {
              reject(new Error("No URL fragment found."));
              return;
            }
            const params = new URLSearchParams(urlFragment);
            const accessToken = params.get("access_token");
            if (!accessToken) {
              reject(new Error("No access token in response."));
              return;
            }
            resolve(accessToken);
          } else {
            reject(new Error("No redirect URL returned."));
          }
        }
      );
    });
  }
  