# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170905195213) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "bird_records", force: :cascade do |t|
    t.bigint "bird_id"
    t.bigint "birding_session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "count"
    t.string "notes"
    t.index ["bird_id"], name: "index_bird_records_on_bird_id"
    t.index ["birding_session_id"], name: "index_bird_records_on_birding_session_id"
  end

  create_table "birding_sessions", force: :cascade do |t|
    t.date "date"
    t.geography "location", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "location_name", null: false
    t.string "location_address"
    t.index ["location"], name: "index_birding_sessions_on_location", using: :gist
    t.index ["user_id"], name: "index_birding_sessions_on_user_id"
  end

  create_table "birds", force: :cascade do |t|
    t.string "common_name"
    t.string "scientific_name"
    t.string "order"
    t.string "scientific_family_name"
    t.string "common_family_name"
    t.integer "sort_position"
    t.bigint "species_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sort_position"], name: "index_birds_on_sort_position"
    t.index ["species_id"], name: "index_birds_on_species_id"
  end

  create_table "club_memberships", force: :cascade do |t|
    t.integer "user_id"
    t.integer "club_id"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clubs", force: :cascade do |t|
    t.string "name"
    t.string "short_name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cover_image"
    t.string "logo"
  end

  create_table "localized_birds", force: :cascade do |t|
    t.string "common_name", null: false
    t.string "locale", limit: 2, null: false
    t.integer "sort_position", null: false
    t.bigint "bird_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bird_id"], name: "index_localized_birds_on_bird_id"
    t.index ["locale", "bird_id"], name: "index_localized_birds_on_locale_and_bird_id", unique: true
    t.index ["locale", "common_name"], name: "index_localized_birds_on_locale_and_common_name", unique: true
    t.index ["locale", "sort_position"], name: "index_localized_birds_on_locale_and_sort_position", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.boolean "admin", default: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "bird_records", "birding_sessions"
  add_foreign_key "bird_records", "birds"
  add_foreign_key "birding_sessions", "users"
  add_foreign_key "localized_birds", "birds"
end
