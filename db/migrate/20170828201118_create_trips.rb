class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.date :date
      t.st_point :location, geographic: true

      t.timestamps

      t.index :location, using: :gist
    end
  end
end
