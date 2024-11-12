import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const FULL_PATH_TO_SERVICE_ACCOUNT_FILE =
  // "/Users/6ones/Projects/vidiyo-ai/snippets/studioai-dev-firebase-adminsdk-yn8xo-6a0f3d67ba.json";
  "/Users/6ones/Projects/vidiyo-ai/snippets/vidiyo-ai-prod-firebase-adminsdk-v14ee-b7626b2fb1.json";
const userUID = "0pHkkUwZtwhFLDK6yz4UTG7bZOb2";

async function makeUserAdmin() {
  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(FULL_PATH_TO_SERVICE_ACCOUNT_FILE)
      });
  const auth = getAuth(app);
  await auth.setCustomUserClaims(userUID, { admin: true });
}

makeUserAdmin()
  .then(() => {
    console.info("done");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
