class AddCoverImageToClubs < ActiveRecord::Migration[5.1]
  def change
    add_column :clubs, :cover_image, :string
  end
end
