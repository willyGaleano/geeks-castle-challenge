const functions = require("firebase-functions");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const {
  CUSTOMER_DOCUMENT_NAME,
  USER_DOCUMENT_NAME,
  FIREBASE_PROJECT_ID,
  SALT_OR_ROUNDS_BYCRYPT_DEFAULT,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_DATABASE_URL,
} = require("./utils/constants");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: FIREBASE_DATABASE_URL,
});

exports.onUserCreate = functions.firestore
  .document(`${USER_DOCUMENT_NAME}/{userId}`)
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    logger.info("User created", { user: newValue }, { structuredData: true });

    if (!newValue.password) {
      const generatedPassword = uuidv4();
      const hashedPassword = await bcrypt.hash(
        generatedPassword,
        SALT_OR_ROUNDS_BYCRYPT_DEFAULT
      );

      await snap.ref.update({ password: hashedPassword });
      logger.info(
        `Password generated and updated for user: ${newValue.email}`,
        { structuredData: true }
      );
    }
  });

exports.onCustomerCreate = functions.firestore
  .document(`${CUSTOMER_DOCUMENT_NAME}/{customerId}`)
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    if (!newValue.birthday) {
      logger.error("Birthday is required for calculating age.");
      return;
    }

    const birthday = new Date(newValue.birthday);
    const age = new Date().getFullYear() - birthday.getFullYear();

    await snap.ref.update({ age });

    logger.info(
      "Customer created and age calculated",
      { customer: { ...newValue, age } },
      { structuredData: true }
    );
  });

exports.onCustomerUpdate = functions.firestore
  .document(`${CUSTOMER_DOCUMENT_NAME}/{customerId}`)
  .onUpdate(async (change, context) => {
    const beforeUpdate = change.before.data();
    const afterUpdate = change.after.data();

    if (beforeUpdate.birthday !== afterUpdate.birthday) {
      const birthday = new Date(afterUpdate.birthday);
      const age = new Date().getFullYear() - birthday.getFullYear();

      await change.after.ref.update({ age });

      logger.info(
        "Customer updated and age recalculated",
        { customerId: context.params.customerId, age },
        { structuredData: true }
      );
    }
  });
