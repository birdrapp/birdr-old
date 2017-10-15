class CreateClubMemberRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :club_member_roles do |t|
      t.references :user, foreign_key: true
      t.references :club, foreign_key: true
      t.string :role

      t.timestamps
    end
  end
end
