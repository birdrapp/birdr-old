class CreateBirds < ActiveRecord::Migration[5.1]
  def change
    create_table :birds do |t|
      t.string :common_name
      t.string :scientific_name, unique: true
      t.string :order
      t.string :scientific_family_name
      t.string :common_family_name
      t.integer :sort_position, unique: true, index: true
      t.references :species, index: true

      t.timestamps
    end
  end
end
