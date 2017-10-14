json.clubs do
  json.array! @clubs, partial: 'clubs/club', as: :club
end
