import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1728957684792 implements MigrationInterface {
    name = 'CreateUserTable1728957684792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`paymentInfo\` varchar(255) NULL, \`role\` enum ('user', 'hotel', 'admin', 'shipper', 'guest') NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
