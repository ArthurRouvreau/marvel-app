// chart-utils.jsx

/**
 * Transforms an object of hero stats into an array of objects
 * where each object contains a name (key) and its associated value.
 * 
 * @param {Object} data - The hero's data.
 * @returns {Array} An array of objects with name-value pairs.
 */
export const prepareData = (data = {}) => {
    return Object.entries(data)
      .filter(([key, value]) => value !== undefined)  // Filter out undefined values
      .map(([key, value]) => ({
        name: capitalizeFirstLetter(key), // Capitalize the first letter of the key
        value: value
      }));
  };
  
  /**
   * Capitalizes the first letter of a string.
   * 
   * @param {string} str - The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  