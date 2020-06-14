mysql -uroot -pabc123

create database employee_employer_network;

use employee_employer_network;

CREATE TABLE `login` (
	`email` VARCHAR(50) NOT NULL,
	`password` VARCHAR(30) NOT NULL,
	`id` INT(10) NOT NULL,
	PRIMARY KEY (`id`)
);


CREATE TABLE `user` (
	`name` VARCHAR(50) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	`gender` VARCHAR(1),
	`dob` DATE,
	`contact` VARCHAR(15),
	PRIMARY KEY (`id`)
);

CREATE TABLE `company` (
	`name` VARCHAR(50) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	`address` VARCHAR(100),
	`contact` VARCHAR(15),
	`email` VARCHAR(50) UNIQUE NOT NULL,
	PRIMARY KEY (`id`)
);


CREATE TABLE `company_admin` (
	`company_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`company_id`)
);


CREATE TABLE `relationship` (
	`first_party` INT NOT NULL,
	`second_party` INT NOT NULL,
	`status` VARCHAR(10) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);


CREATE TABLE `user_company` (
	`user_id` INT NOT NULL,
	`company_id` INT NOT NULL,
	`status` VARCHAR(10),
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);


ALTER TABLE login ADD CONSTRAINT fk_id_user_id FOREIGN KEY (id) REFERENCES user(id);

ALTER TABLE company_admin ADD CONSTRAINT fk_user_id_user_id FOREIGN KEY (user_id) REFERENCES user(id);

ALTER TABLE company_admin ADD CONSTRAINT fk_company_id_company_id FOREIGN KEY (company_id) REFERENCES company(id);

 ALTER TABLE relationship ADD CONSTRAINT fk_second_party_company_id FOREIGN KEY (second_party) REFERENCES company(id);

ALTER TABLE relationship ADD CONSTRAINT fk_first_party_company_id FOREIGN KEY (first_party) REFERENCES company(id);

ALTER TABLE user_company ADD CONSTRAINT fk_user_id_user_id_user_company FOREIGN KEY (user_id) REFERENCES user(id);

ALTER TABLE user_company ADD CONSTRAINT fk_company_id_company_id_user_company FOREIGN KEY (company_id) REFERENCES company(id);

ALTER TABLE relationship ADD UNIQUE INDEX( first_party, second_party);

ALTER TABLE user_company ADD UNIQUE INDEX( user_id, company_id);

