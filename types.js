// Custom Typedefs

/**
 * @typedef {Object} MTGMeta
 * @property {!string} type
 * @property {?Array<string>} colors
 * @property {?string} mana_cost
 * @property {!number} cmc
 */

/**
 * @typedef {Object} ScryfallMeta
 * @property {!string} oracle_id
 * @property {!string} scryfall_uri
 */

/**
 * @typedef {Object} CardJSON
 * @property {!string} title
 * @property {?string} flavor_text
 * @property {!string} image_url
 * @property {!MTGMeta} mtg_meta
 * @property {!ScryfallMeta} scryfall_meta
 */

/** 
 * @typedef {Array<Card>} CardCollection
 */
