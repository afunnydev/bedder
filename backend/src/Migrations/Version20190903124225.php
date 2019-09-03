<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190903124225 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE business_units ALTER max_persons TYPE SMALLINT USING max_persons::smallint');
        $this->addSql('ALTER TABLE business_units ALTER max_persons DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER num_units TYPE SMALLINT USING num_units::smallint');
        $this->addSql('ALTER TABLE business_units ALTER num_units DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_king DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_king TYPE SMALLINT USING beds_king::smallint');
        $this->addSql('ALTER TABLE business_units ALTER beds_king SET NOT NULL');
        $this->addSql('ALTER TABLE business_units ALTER beds_king TYPE SMALLINT');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen TYPE SMALLINT USING beds_queen::smallint');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen SET NOT NULL');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen TYPE SMALLINT');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple TYPE SMALLINT USING beds_simple::smallint');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple SET NOT NULL');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple TYPE SMALLINT');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE business_units ALTER max_persons TYPE INT');
        $this->addSql('ALTER TABLE business_units ALTER max_persons DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER num_units TYPE INT');
        $this->addSql('ALTER TABLE business_units ALTER num_units DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_king TYPE VARCHAR(64)');
        $this->addSql('ALTER TABLE business_units ALTER beds_king DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_king DROP NOT NULL');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen TYPE VARCHAR(64)');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_queen DROP NOT NULL');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple TYPE VARCHAR(64)');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple DROP DEFAULT');
        $this->addSql('ALTER TABLE business_units ALTER beds_simple DROP NOT NULL');
    }
}
