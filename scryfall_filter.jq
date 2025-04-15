{
  card_data: [
    .data.[] | {
      name,
      flavor_text,
      image_url: .image_uris.border_crop,
      mtg_meta: {
        colors,
        mana_cost,
        cmc,
        type: .type_line
      },
      scryfall_meta: {
        oracle_id,
        scryfall_uri
      } 
    }
  ]
}
