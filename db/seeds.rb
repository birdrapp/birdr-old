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
connection = ActiveRecord::Base.connection()
ioc_path = "#{Rails.root}/db/lists/ioc.csv"
connection.execute("COPY birds(\"common_name\", \"scientific_name\", \"order\", scientific_family_name, common_family_name, sort_position, species_id, created_at, updated_at) FROM '#{ioc_path}' CSV HEADER")

#
# Rarities
#
unknown = Rarity.find_or_create_by! name: 'Unknown'
common = Rarity.find_or_create_by! name: 'Common'

#
# Regional Bird Lists
#
the_british_list = RegionalBirdList.find_or_create_by! name: 'The British List'

sort_position = 0
CSV.foreach("#{Rails.root}/db/lists/the-british-list.csv", headers: true) do |csv|
  sort_position += 1
  bird = Bird
    .where(scientific_name: csv['scientific_name'])
    .or(Bird.where(scientific_name: csv['ioc_scientific_name']))
    .first
  if bird.nil?
    puts "#{csv['name']} #{csv['scientific_name']} not found"
    next
  end
  LocalizedBird.find_or_create_by! name: csv['name'], bird: bird, regional_bird_list: the_british_list, rarity: unknown, sort_position: sort_position
end
