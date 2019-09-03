<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190903131848 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE businesses ALTER sms_validation SET DEFAULT \'false\'');
        $this->addSql('ALTER TABLE businesses ALTER reviews_num SET DEFAULT 0');
        $this->addSql('ALTER TABLE businesses ALTER reviews_sum SET DEFAULT 0');
        $this->addSql('ALTER TABLE businesses ALTER reviews_avg SET DEFAULT 0');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE businesses ALTER sms_validation DROP DEFAULT');
        $this->addSql('ALTER TABLE businesses ALTER reviews_num DROP DEFAULT');
        $this->addSql('ALTER TABLE businesses ALTER reviews_sum DROP DEFAULT');
        $this->addSql('ALTER TABLE businesses ALTER reviews_avg DROP DEFAULT');
    }
}
