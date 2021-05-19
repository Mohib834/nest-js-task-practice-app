import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  autoLoadEntities: true,
  database: 'taskmanagement',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Mohibkkh123',
  synchronize: true,
};
