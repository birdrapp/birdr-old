class CreateClubMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :club_memberships do |t|
      t.integer :user_id
      t.integer :club_id
      t.string :status

      t.timestamps
    end
  end
end
