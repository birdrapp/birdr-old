class CreateBirdLists < ActiveRecord::Migration[5.1]
  def change
    create_table :bird_lists do |t|
      t.string :name, null: false, unique: true
      t.string :country_code, limit: 2, null: false

      t.timestamps
    end
  end
end
