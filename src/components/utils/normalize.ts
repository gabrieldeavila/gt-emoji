/**
 *  @description normalize string
 *  @param {string} str
 * @returns {string}
 *
 * @example
 * normalize('Hello World') // hello world
 * normalize('Hello_World') // hello world
 * normalize('Hello-World') // hello world
 * normalize('Hello World!') // hello world!
 * normalize('Hello   World  ') // hello world
 */
export const normalize = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, " ");
};
