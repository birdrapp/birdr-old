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

# sort_position = 0
# CSV.foreach("#{Rails.root}/db/lists/the-british-list.csv", headers: true) do |csv|
#   sort_position += 1
#   bird = Bird
#     .where(scientific_name: csv['scientific_name'])
#     .or(Bird.where(scientific_name: csv['ioc_scientific_name']))
#     .first
#   if bird.nil?
#     puts "#{csv['name']} #{csv['scientific_name']} not found"
#     next
#   end
#   LocalizedBird.find_or_create_by! common_name: csv['name'], locale: 'en', bird: bird, sort_position: sort_position
# end
