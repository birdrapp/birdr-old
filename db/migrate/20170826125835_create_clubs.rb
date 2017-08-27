class CreateClubs < ActiveRecord::Migration[5.1]
  def change
    create_table :clubs do |t|
      t.string :name
      t.string :short_name
      t.text :description

      t.timestamps
    end
  end
end
