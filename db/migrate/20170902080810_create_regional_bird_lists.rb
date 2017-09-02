class CreateRegionalBirdLists < ActiveRecord::Migration[5.1]
  def change
    create_table :regional_bird_lists do |t|
      t.string :name

      t.timestamps
    end
  end
end
