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

ActiveRecord::Schema.define(version: 20171007100645) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "bird_list_birds", force: :cascade do |t|
    t.bigint "bird_id"
    t.bigint "bird_list_id"
    t.bigint "rarity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bird_id"], name: "index_bird_list_birds_on_bird_id"
    t.index ["bird_list_id"], name: "index_bird_list_birds_on_bird_list_id"
    t.index ["rarity_id"], name: "index_bird_list_birds_on_rarity_id"
  end

  create_table "bird_lists", force: :cascade do |t|
    t.string "name", null: false
    t.string "country_code", limit: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bird_records", force: :cascade do |t|
    t.bigint "bird_id"
    t.bigint "birding_session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "count"
    t.string "notes"
    t.geography "location", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}
    t.time "time"
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
    t.bigint "weather_report_id"
    t.time "start_time"
    t.index ["location"], name: "index_birding_sessions_on_location", using: :gist
    t.index ["user_id"], name: "index_birding_sessions_on_user_id"
    t.index ["weather_report_id"], name: "index_birding_sessions_on_weather_report_id"
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
    t.geometry "recording_area", limit: {:srid=>0, :type=>"st_polygon"}
  end

  create_table "national_bird_lists", force: :cascade do |t|
    t.string "name", null: false
    t.string "country_code", limit: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "photos", force: :cascade do |t|
    t.string "image"
    t.string "photographable_type"
    t.bigint "photographable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["photographable_type", "photographable_id"], name: "index_photos_on_photographable_type_and_photographable_id"
  end

  create_table "rarities", force: :cascade do |t|
    t.string "name", null: false
    t.integer "level", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "weather_reports", force: :cascade do |t|
    t.decimal "apparent_temperature"
    t.decimal "cloud_cover"
    t.decimal "dew_point"
    t.decimal "humidity"
    t.string "icon"
    t.decimal "precipitation_intensity"
    t.decimal "precipitation_probability"
    t.decimal "pressure"
    t.string "summary"
    t.decimal "temperature"
    t.datetime "time"
    t.integer "uv_index"
    t.decimal "visibility"
    t.integer "wind_bearing"
    t.decimal "wind_speed"
    t.geography "location", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bird_list_birds", "bird_lists"
  add_foreign_key "bird_list_birds", "birds"
  add_foreign_key "bird_list_birds", "rarities"
  add_foreign_key "bird_records", "birding_sessions"
  add_foreign_key "bird_records", "birds"
  add_foreign_key "birding_sessions", "users"
  add_foreign_key "birding_sessions", "weather_reports"
end
