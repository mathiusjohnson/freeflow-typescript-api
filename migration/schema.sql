DROP TABLE users IF EXISTS CASCADE;
DROP TABLE postings IF EXISTS CASCADE;
DROP TABLE comments IF EXISTS CASCADE;
DROP TABLE messages_Stretch IF EXISTS CASCADE;
DROP TABLE karmas IF EXISTS CASCADE;
DROP TABLE likes IF EXISTS CASCADE;



CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "password" varchar,
  "avatar" varchar,
  "location" varchar,
  "description" text,
  "active" boolean,
  "created_at" timestamp
);

CREATE TABLE "postings" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" int,
  "title" varchar,
  "content" text,
  "is_request" boolean,
  "created_at" timestamp
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "commenter_id" int,
  "posting_id" int,
  "content" text,
  "created_at" timestamp
);

CREATE TABLE "messages_Stretch" (
  "id" SERIAL PRIMARY KEY,
  "sender_id" int,
  "receiver_id" int,
  "is_read" boolean,
  "content" text,
  "created_at" timestamp
);

CREATE TABLE "karmas" (
  "id" SERIAL PRIMARY KEY,
  "giver_id" int,
  "comment_id" int
);

CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY,
  "liker_id" int,
  "posting_id" int
);

ALTER TABLE "postings" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("commenter_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("posting_id") REFERENCES "postings" ("id");

ALTER TABLE "messages_Stretch" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "messages_Stretch" ADD FOREIGN KEY ("receiver_id") REFERENCES "users" ("id");

ALTER TABLE "likes" ADD FOREIGN KEY ("liker_id") REFERENCES "users" ("id");

ALTER TABLE "likes" ADD FOREIGN KEY ("posting_id") REFERENCES "postings" ("id");

ALTER TABLE "karmas" ADD FOREIGN KEY ("giver_id") REFERENCES "users" ("id");

ALTER TABLE "karmas" ADD FOREIGN KEY ("comment_id") REFERENCES "comments" ("id");
