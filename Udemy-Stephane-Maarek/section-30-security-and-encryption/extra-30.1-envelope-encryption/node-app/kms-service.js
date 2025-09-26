const {
  KMSClient,
  GenerateDataKeyCommand,
  DecryptCommand,
} = require("@aws-sdk/client-kms");
const crypto = require("crypto");

const kms = new KMSClient({});

// Helper to zeroize sensitive buffers
function zeroBuffer(buf) {
  if (!buf) return;
  if (Buffer.isBuffer(buf)) buf.fill(0);
  else if (buf instanceof Uint8Array) buf.fill(0);
}

/**
 * Envelope encrypt a Buffer (or string)
 * @param {Buffer|Uint8Array|string} plaintextData
 * @param {string} keyId - KMS KeyId or ARN
 * @returns {Promise<object>} - { ciphertext, encryptedDataKey, iv, authTag } (base64-encoded)
 */
async function envelopeEncrypt(plaintextData, keyId) {
  const data = Buffer.isBuffer(plaintextData)
    ? plaintextData
    : Buffer.from(String(plaintextData), "utf8");

  // 1) Ask KMS for a data key (AES-256)
  const gdCommand = new GenerateDataKeyCommand({
    KeyId: keyId,
    KeySpec: "AES_256", // returns a 256-bit plaintext key + ciphertext blob
  });
  const gdResp = await kms.send(gdCommand);

  // Plaintext key (Buffer) and encrypted (wrapped) key
  const plaintextKey = gdResp.Plaintext; // Uint8Array / Buffer
  const encryptedDataKey = Buffer.from(gdResp.CiphertextBlob); // store this safely (base64 usually)

  try {
    // 2) Encrypt data with AES-256-GCM
    const iv = crypto.randomBytes(12); // 12 bytes recommended for GCM
    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      Buffer.from(plaintextKey),
      iv
    );

    // Optional: add AAD (additional authenticated data) for integrity (e.g., object id, version)
    // cipher.setAAD(Buffer.from("my-aad"));

    const ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // 3) Zeroize plaintextKey asap
    zeroBuffer(plaintextKey);

    // return base64-encoded pieces for storage/transmission
    return {
      ciphertext: ciphertext.toString("base64"),
      encryptedDataKey: encryptedDataKey.toString("base64"),
      iv: iv.toString("base64"),
      authTag: authTag.toString("base64"),
      // optionally store metadata: algorithm, keyId (or key ARN), createdAt...
    };
  } catch (err) {
    // make sure key is zeroed on error too
    zeroBuffer(plaintextKey);
    throw err;
  }
}

/**
 * Envelope decrypt
 * @param {object} envelope - object returned from encrypt() or retrieved from store
 * @returns {Promise<Buffer>} decrypted plaintext buffer
 */
async function envelopeDecrypt(envelope) {
  const { ciphertext, encryptedDataKey, iv, authTag } = envelope;

  // decode base64
  const encryptedKeyBuf = Buffer.from(encryptedDataKey, "base64");
  const ct = Buffer.from(ciphertext, "base64");
  const ivBuf = Buffer.from(iv, "base64");
  const tagBuf = Buffer.from(authTag, "base64");

  // 1) Ask KMS to decrypt the encrypted data key
  const decCmd = new DecryptCommand({
    CiphertextBlob: encryptedKeyBuf,
    // Optionally: EncryptionContext: { ... } if used when generating data key
  });
  const decResp = await kms.send(decCmd);
  const plaintextKey = Buffer.from(decResp.Plaintext);

  try {
    // 2) Decrypt payload with AES-256-GCM
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      plaintextKey,
      ivBuf
    );
    decipher.setAuthTag(tagBuf);

    // If AAD was used, set the same AAD here
    // decipher.setAAD(Buffer.from("my-aad"));

    const plain = Buffer.concat([decipher.update(ct), decipher.final()]);

    // 3) Zeroize plaintextKey
    zeroBuffer(plaintextKey);

    return plain; // Buffer (caller can toString('utf8') if desired)
  } catch (err) {
    zeroBuffer(plaintextKey);
    throw err;
  }
}

module.exports = {
  envelopeEncrypt,
  envelopeDecrypt,
};
