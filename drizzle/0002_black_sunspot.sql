CREATE SCHEMA "paulo";
--> statement-breakpoint
CREATE TABLE "paulo"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_deleted" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "paulo"."countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country_code" varchar NOT NULL,
	"country_name" varchar NOT NULL,
	"is_deleted" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "countries_country_code_unique" UNIQUE("country_code")
);
--> statement-breakpoint
CREATE TABLE "paulo"."provinces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provinces_code" varchar NOT NULL,
	"provinces_name" varchar NOT NULL,
	"country_id" uuid,
	"is_deleted" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "provinces_provinces_code_unique" UNIQUE("provinces_code")
);
--> statement-breakpoint
CREATE TABLE "paulo"."cities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city_code" varchar NOT NULL,
	"city_name" varchar NOT NULL,
	"province_id" uuid,
	"is_deleted" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cities_city_code_unique" UNIQUE("city_code")
);
--> statement-breakpoint
ALTER TABLE "paulo"."provinces" ADD CONSTRAINT "provinces_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "paulo"."countries"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "paulo"."cities" ADD CONSTRAINT "cities_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "paulo"."provinces"("id") ON DELETE set null ON UPDATE cascade;