json.bird_list do
  json.partial! 'bird_lists/bird_list', bird_list: @bird_list
end

json.birds do
  json.array! @birds, partial: 'bird_lists/bird', as: :bird
end
