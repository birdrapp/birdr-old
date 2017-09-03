class CreateLocalizedBirds < ActiveRecord::Migration[5.1]
  def change
    create_table :localized_birds do |t|
      t.string :common_name, null: false
      t.column :locale, 'char(2)', null: false
      t.integer :sort_position, null: false
      t.references :bird, foreign_key: true

      t.timestamps
    end

    add_index :localized_birds, [:locale, :common_name], unique: true
    add_index :localized_birds, [:locale, :bird_id], unique: true
    add_index :localized_birds, [:locale, :sort_position], unique: true
  end
end
