/**
 * Wraps an async express route handler to catch errors and pass them to the global error handler.
 * @param {Function} fn - The async function to wrap
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
