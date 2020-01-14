# README

usersテーブル

|Column|Type|Options|
|------|----|-------|
|email||string|null: false|
|password|string|null: false|
|nickname|string|null: false|

   Association
  has_many :groups
  has_many :comments
  has_many :groups, through: :groups_users



groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|comment_id|integer|null: false, foreign_key: true|

   Assosiation
  has_many :users
  has_many :comments
  has_many :users, through: :groups_users


textsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|image|text|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

   Association
  belongs_to :user
  belongs_to :group

groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id||integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

   Association
- belongs_to :group
- belongs_to :user
