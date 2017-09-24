require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#
# Canonical Bird List
#
CSV.foreach("#{Rails.root}/db/lists/ioc.csv", headers: true) do |csv|
  Bird.create! common_name: csv['common_name'],
               scientific_name: csv['scientific_name'],
               order: csv['order'],
               scientific_family_name: csv['scientific_family_name'],
               common_family_name: csv['common_family_name'],
               sort_position: csv['sort_position'],
               species_id: csv['species_id']
end

uk = BirdList.find_or_create_by! name: "The British List", country_code: "GB"
common = Rarity.find_or_create_by! name: "Common", level: 1
CSV.foreach("#{Rails.root}/db/lists/the-british-list.csv", headers: true) do |csv|
  bird = Bird
    .where(scientific_name: csv['scientific_name'])
    .or(Bird.where(scientific_name: csv['ioc_scientific_name']))
    .first

  if bird.nil?
    puts "#{csv['name']} #{csv['scientific_name']} not found"
    next
  end

  BirdListBird.create! bird_id: bird.id, rarity_id: common.id, bird_list_id: uk.id
end
