json.rarity do
  json.id bird.rarity.id
  json.name bird.rarity.name
  json.level bird.rarity.level
end

json.bird do
  json.partial! 'birds/bird', bird: bird.bird
end
