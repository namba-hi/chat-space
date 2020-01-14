# README

usersテーブル

|Column|Type|Options|
|------|----|-------|
|email||string|null: false|
|password|string|null: false|
|nickname|string|null: false, index: true|

   Association
  has_many :groups_users
  has_many :comments
  has_many :groups, through: :groups_users



groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

   Assosiation
  has_many :groups_users
  has_many :comments
  has_many :users, through: :groups_users


textsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|
|image|text|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

   Association
  belongs_to :user
  belongs_to :group

groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user||references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

   Association
- belongs_to :group
- belongs_to :user
