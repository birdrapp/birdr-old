class CreateClubBirdRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :club_bird_records do |t|
      t.references :club, foreign_key: true
      t.references :bird_record, foreign_key: true

      t.timestamps
    end
  end
end
