#!/bin/bash 

scryfall_base_url="api.scryfall.com"

fetch_raw_scryfall_data() {
  local search="$1"
  local scryfall_search_base="(game:paper) banned:commander" # Printed cards that are banned in commander, limit 30

  if [ -z "$scryfall_search_param" ]; then
    echo "Search syntax unspecified, using default search "+ "${scryfall_search_base}"
    search=scryfall_search_base
  fi 

  echo "${scryfall_base_url}/cards/search q==${search} pretty==true > ./raw_output.json"
}


# Function to fetch MTG card data from scryfall api, accepts a specified search string in scryfall syntax
populate_cards_data() {
  local scryfall_search_param="$1"
  
  # Check connection to scryfall api 
  if ! ping -q -c 3 "${scryfall_base_url}"; then # If return code of the ping is a non-zero value
    echo "Could not form connection to Scryfall - please check network settings"
    return 1
  fi

  # Fetch raw data and capture it to a json file
  fetch_raw_scryfall_data "$scryfall_search_param"

  if ! [ -f "./raw_output.json" ]; then 
    echo "Raw data from scryfall not found - please refer to to httpie errors or check file structure; are you in project root?"
    return 1
  fi

  cat ./raw_output.json | jq -f scryfall_filter.jq > ./static/cards.json
}

populate_cards_data "$1"
