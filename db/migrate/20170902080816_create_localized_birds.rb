class CreateLocalizedBirds < ActiveRecord::Migration[5.1]
  def change
    create_table :localized_birds do |t|
      t.string :name, null: false
      t.integer :sort_position, null: false
      t.references :rarity, foreign_key: true
      t.references :bird, foreign_key: true
      t.references :regional_bird_list, foreign_key: true

      t.timestamps
    end
  end
end
