/**
 * Server-side input validation helpers.
 *
 * NEVER trust input from the browser – validate EVERYTHING here,
 * regardless of what the frontend already checked.
 */

const ALLOWED_ROLES = new Set(['user', 'assistant', 'system']);
const MAX_MESSAGES   = 50;    // Conversation history cap
const MAX_MSG_LENGTH = 8000;  // Characters per individual message
const MODEL_ID_RE    = /^[a-zA-Z0-9_.:\-/]{1,120}$/; // strict model ID format

/**
 * Validate & sanitize the `messages` array coming from the client.
 * Returns a cleaned array or throws a descriptive Error.
 *
 * @param {unknown} messages
 * @returns {{ role: string, content: string }[]}
 */
export function validateMessages(messages) {
  if (!Array.isArray(messages)) {
    throw Object.assign(new Error('messages must be an array'), { status: 400 });
  }
  if (messages.length === 0) {
    throw Object.assign(new Error('messages array is empty'), { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    throw Object.assign(
      new Error(`messages array exceeds the maximum of ${MAX_MESSAGES} entries`),
      { status: 400 }
    );
  }

  return messages.map((msg, i) => {
    if (typeof msg !== 'object' || msg === null) {
      throw Object.assign(new Error(`messages[${i}] is not an object`), { status: 400 });
    }

    const role = msg.role;
    if (typeof role !== 'string' || !ALLOWED_ROLES.has(role)) {
      throw Object.assign(
        new Error(`messages[${i}].role must be one of: ${[...ALLOWED_ROLES].join(', ')}`),
        { status: 400 }
      );
    }

    const content = msg.content;
    if (typeof content !== 'string') {
      throw Object.assign(new Error(`messages[${i}].content must be a string`), { status: 400 });
    }
    if (content.length > MAX_MSG_LENGTH) {
      throw Object.assign(
        new Error(`messages[${i}].content exceeds maximum length of ${MAX_MSG_LENGTH} characters`),
        { status: 400 }
      );
    }

    // Return only the two fields we actually need – drop any extra properties
    return { role, content: content.trim() };
  });
}

/**
 * Validate a model ID string.
 *
 * @param {unknown} modelId
 * @returns {string}
 */
export function validateModelId(modelId) {
  if (typeof modelId !== 'string' || !MODEL_ID_RE.test(modelId)) {
    throw Object.assign(
      new Error('Invalid modelId. Use alphanumeric characters, dots, colons, hyphens, underscores, or slashes only.'),
      { status: 400 }
    );
  }
  return modelId;
}

/**
 * Validate that a required environment variable is set.
 * Call this early in each route so the error is obvious.
 *
 * @param {string} name  – environment variable name
 * @returns {string}     – the value
 */
export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    // 503 = service unavailable (key not configured)
    throw Object.assign(new Error(`Server configuration error: ${name} is not set`), { status: 503 });
  }
  return value;
}
