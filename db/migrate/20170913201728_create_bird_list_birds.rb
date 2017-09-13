class CreateBirdListBirds < ActiveRecord::Migration[5.1]
  def change
    create_table :bird_list_birds do |t|
      t.references :bird, foreign_key: true
      t.references :bird_list, foreign_key: true
      t.references :rarity, foreign_key: true

      t.timestamps
    end
  end
end
