// NOTE: YOU MUST USE A TRIPLE-SLASH REFERENCE IN ANY FILE THAT USES THESE TYPES, THIS WAY TSC CAN SEE THEM
// -----------------------------------
//            TYPEDEFS
// -----------------------------------

/**
 * @typedef {Object} MTGMeta
 * @property {string} type
 * @property {string[]} colors
 * @property {string} mana_cost
 * @property {number} cmc
 */

/**
 * @typedef {Object} ScryfallMeta
 * @property {string} oracle_id
 * @property {string} scryfall_uri
 */

/**
 * @typedef {Object} CardJSON
 * @property {string} title
 * @property {string|null} flavor_text
 * @property {string} image_url
 * @property {MTGMeta} mtg_meta
 * @property {ScryfallMeta} scryfall_meta
 */


/**
 * @typedef {Object} FilterOpt
 * @property {string} field
 * @property {string|number} value
 */

/**
 * @typedef {Object} SortOpt
 * @property {string} option
 */


/**
 * @typedef {Object} OrgSpec
 * @property {SortOpt} sortOpt
 * @property {FilterOpt} filterOpt
 */

// -----------------------------------
//          END TYPEDEFS
// -----------------------------------

