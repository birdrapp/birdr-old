class CreateRarities < ActiveRecord::Migration[5.1]
  def change
    create_table :rarities do |t|
      t.string :name, null: false, unique: true
      t.integer :level, null: false, unique: true

      t.timestamps
    end
  end
end
