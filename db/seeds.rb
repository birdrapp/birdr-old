# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'nokogiri'

sort = 1
ioc = File.open("db/lists/master_ioc-names_xml.xml") { |f| Nokogiri::XML(f) }

def import_bird(params)
  bird = Bird.create!(params)
  puts "Imported #{bird}"
  bird.id
end

ioc.xpath("//order").each do |order_elem|
  order = order_elem.xpath('latin_name').text
  order_elem.xpath('family').each do |family_elem|
    latin_family = family_elem.xpath('latin_name').text
    english_family = family_elem.xpath('english_name').text
    family_elem.xpath('genus').each do |genus_elem|
      genus = genus_elem.xpath('latin_name').text
      genus_elem.xpath('species').each do |species_elem|
        species = species_elem.xpath('latin_name').text
        english_name = species_elem.xpath('english_name').text
        bird_params = {
          common_name: english_name,
          scientific_name: "#{genus} #{species}",
          order: order,
          scientific_family_name: latin_family,
          common_family_name: english_family,
          sort_position: sort
        }
        species_id = import_bird(bird_params)
        sort += 1
        species_elem.xpath('subspecies').each do |subspecies_elem|
          subspecies = subspecies_elem.xpath('latin_name').text
          bird_params = {
            common_name: english_name,
            scientific_name: "#{genus} #{species} #{subspecies}",
            order: order,
            scientific_family_name: latin_family,
            common_family_name: english_family,
            sort_position: sort,
            species_id: species_id
          }
          import_bird(bird_params)
          sort += 1
        end
      end
    end
  end
end
