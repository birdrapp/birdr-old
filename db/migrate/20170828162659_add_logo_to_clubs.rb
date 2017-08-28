class AddLogoToClubs < ActiveRecord::Migration[5.1]
  def change
    add_column :clubs, :logo, :string
  end
end
