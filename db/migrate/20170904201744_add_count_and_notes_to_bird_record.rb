class AddCountAndNotesToBirdRecord < ActiveRecord::Migration[5.1]
  def change
    add_column :bird_records, :count, :integer
    add_column :bird_records, :notes, :string
  end
end
