/**
 * Merge two HTML strings. It assumes the emptiness of <body> element in the 
 * second string (the target).
 * 
 * @param {string} source - The first html string to be merged
 * @param {string} target - The second html string to be merged
 */
export const merge = (source: string, target: string): string => {
  // TODO: use a more advance HTML parser (i.e. parse5) to merge HTML strings
  return target.replace(/<body>(\n| )*<\/body>/, `<body>${source}</body>`)
}
