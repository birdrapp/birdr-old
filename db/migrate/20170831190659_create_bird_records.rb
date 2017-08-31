class CreateBirdRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :bird_records do |t|
      t.references :bird, foreign_key: true
      t.references :trip, foreign_key: true

      t.timestamps
    end
  end
end
